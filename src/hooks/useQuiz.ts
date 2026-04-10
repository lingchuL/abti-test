'use client';

import { useState, useCallback, useRef } from 'react';
import { QUESTIONS, GATE_Q, HIDDEN_Q, type Question } from '@/data/questions';
import { shuffle } from '@/lib/shuffle';
import { computeResult, type QuizResult } from '@/lib/scoring';

export function useQuiz() {
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const hiddenInsertedRef = useRef(false);

  const initQuiz = useCallback(() => {
    setAnswers({});
    hiddenInsertedRef.current = false;

    const shuffled = shuffle(QUESTIONS);
    const gatePos = Math.floor(Math.random() * (shuffled.length + 1));
    shuffled.splice(gatePos, 0, GATE_Q);
    setQuizQuestions(shuffled);
  }, []);

  const selectAnswer = useCallback((qid: string, value: number) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));

    if (qid === 'gate_q1' && value === 3 && !hiddenInsertedRef.current) {
      hiddenInsertedRef.current = true;
      setQuizQuestions(prev => {
        const gateIdx = prev.findIndex(q => q.id === 'gate_q1');
        const next = [...prev];
        next.splice(gateIdx + 1, 0, HIDDEN_Q);
        return next;
      });
    } else if (qid === 'gate_q1' && value !== 3 && hiddenInsertedRef.current) {
      hiddenInsertedRef.current = false;
      setAnswers(prev => {
        const { gate_q2: _, ...rest } = prev;
        return rest;
      });
      setQuizQuestions(prev => prev.filter(q => q.id !== 'gate_q2'));
    }
  }, []);

  const total = quizQuestions.length;
  const answered = quizQuestions.filter(q => answers[q.id] !== undefined).length;
  const allAnswered = total > 0 && answered === total;
  const progress = total > 0 ? (answered / total) * 100 : 0;

  const submitQuiz = useCallback((): QuizResult => {
    return computeResult(answers);
  }, [answers]);

  return {
    quizQuestions,
    answers,
    initQuiz,
    selectAnswer,
    total,
    answered,
    allAnswered,
    progress,
    submitQuiz,
  };
}
