import { DIMENSION_ORDER, type DimensionKey, type Level } from '@/data/dimensions';
import { QUESTIONS } from '@/data/questions';
import { OUTCOMES, byCode, type Outcome } from '@/data/outcomes';

export interface ScoredOutcome extends Outcome {
  dist: number;
  exact: number;
  similarity: number;
}

export interface QuizResult {
  mode: 'normal' | 'catnip' | 'fallback';
  result: Outcome | ScoredOutcome;
  best: ScoredOutcome;
  top5: ScoredOutcome[];
  levels: Record<DimensionKey, Level>;
  dimScores: Record<DimensionKey, number>;
  patternStr: string;
}

const levelVal: Record<Level, number> = { L: 1, M: 2, H: 3 };

export function computeResult(answers: Record<string, number>): QuizResult {
  // 1. Score dimensions
  const dimScores = {} as Record<DimensionKey, number>;
  DIMENSION_ORDER.forEach(d => { dimScores[d] = 0; });

  QUESTIONS.forEach(q => {
    if (q.dim && answers[q.id] !== undefined) {
      dimScores[q.dim as DimensionKey] += answers[q.id];
    }
  });

  // 2. L/M/H levels
  const levels = {} as Record<DimensionKey, Level>;
  DIMENSION_ORDER.forEach(d => {
    const s = dimScores[d];
    levels[d] = s <= 3 ? 'L' : s === 4 ? 'M' : 'H';
  });

  // 3. Pattern string
  const patternStr = [
    [levels.P1, levels.P2, levels.P3].join(''),
    [levels.S1, levels.S2, levels.S3].join(''),
    [levels.E1, levels.E2, levels.E3].join(''),
    [levels.I1, levels.I2, levels.I3].join(''),
    [levels.C1, levels.C2, levels.C3].join(''),
  ].join('-');

  // 4. Check special: CATNIP
  const isDrunk = answers['gate_q2'] === 2;

  // 5. Match against normal types
  const normalTypes = OUTCOMES.filter(o => !o.isSpecial);

  const results: ScoredOutcome[] = normalTypes.map(t => {
    const parts = t.pattern!.split('-').join('');
    let dist = 0;
    let exact = 0;
    DIMENSION_ORDER.forEach((d, i) => {
      const userLvl = levelVal[levels[d]];
      const typeLvl = levelVal[parts[i] as Level];
      dist += Math.abs(userLvl - typeLvl);
      if (levels[d] === parts[i]) exact++;
    });
    const similarity = Math.max(0, Math.round((1 - dist / 30) * 100));
    return { ...t, dist, exact, similarity };
  });

  results.sort((a, b) => a.dist - b.dist || b.exact - a.exact);

  const best = results[0];

  // 6. Determine final result
  let finalResult: Outcome | ScoredOutcome;
  let mode: 'normal' | 'catnip' | 'fallback';

  if (isDrunk) {
    mode = 'catnip';
    finalResult = byCode['CATNIP'];
  } else if (best.similarity < 60) {
    mode = 'fallback';
    finalResult = byCode['POOP'];
  } else {
    mode = 'normal';
    finalResult = best;
  }

  return { mode, result: finalResult, best, top5: results.slice(0, 5), levels, dimScores, patternStr };
}
