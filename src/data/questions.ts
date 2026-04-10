export interface QuizOption {
  label: string;
  value: number;
}

export interface Question {
  id: string;
  dim?: string;
  type?: 'gate' | 'hidden';
  text: string;
  options: QuizOption[];
}

export const QUESTIONS: Question[] = [
  { id: 'q1', dim: 'P1', text: '你的宠物一天中最活跃的时间是？', options: [
    { label: '凌晨三点开始跑酷，天亮了才消停', value: 3 },
    { label: '白天偶尔抽风一下，证明自己还活着', value: 2 },
    { label: '什么时候都在睡觉，活着靠惯性', value: 1 },
  ]},
  { id: 'q2', dim: 'P1', text: '带宠物出门散步/遛弯时，画面是：', options: [
    { label: '它拖着我狂奔，路人以为我在被绑架', value: 3 },
    { label: '正常遛弯，节奏和谐', value: 2 },
    { label: '走两步就瘫在地上要抱/直接拒绝出门', value: 1 },
  ]},
  { id: 'q3', dim: 'P2', text: '家里来了个快递盒，你的宠物会：', options: [
    { label: '第一时间冲上去闻、咬、钻进去探索', value: 3 },
    { label: '远远看看，确认没有威胁再靠近', value: 2 },
    { label: '完全无视，在它眼里那就是空气', value: 1 },
  ]},
  { id: 'q4', dim: 'P2', text: '你在厨房做饭的时候，宠物在干嘛？', options: [
    { label: '趴在旁边盯着你的每个动作，仿佛在学厨', value: 3 },
    { label: '偶尔过来看两眼，闻到香味才积极', value: 2 },
    { label: '该干嘛干嘛，你做饭跟它有什么关系', value: 1 },
  ]},
  { id: 'q5', dim: 'P3', text: '你拿出玩具逗它，它的反应是：', options: [
    { label: '眼睛发光，冲上来玩到你手酸为止', value: 3 },
    { label: '看心情，有时候配合有时候躺平', value: 2 },
    { label: '看了一眼玩具，又看了一眼你，转身走了', value: 1 },
  ]},
  { id: 'q6', dim: 'P3', text: '你买的宠物玩具现在怎样了？', options: [
    { label: '全被它玩烂/咬碎了，尸横遍野', value: 3 },
    { label: '有几个常玩的，其他吃灰', value: 2 },
    { label: '跟买来时一模一样，连位置都没变', value: 1 },
  ]},
  { id: 'q7', dim: 'S1', text: '你去上厕所的时候，宠物会：', options: [
    { label: '跟到厕所门口死等/试图闯入', value: 3 },
    { label: '在客厅淡定等着', value: 2 },
    { label: '根本没发现你离开了', value: 1 },
  ]},
  { id: 'q8', dim: 'S1', text: '你下班回家推开门的瞬间：', options: [
    { label: '它已经在门口疯狂迎接，像中了五百万', value: 3 },
    { label: '慢悠悠走过来看看你', value: 2 },
    { label: '头都不抬，仿佛你是空气', value: 1 },
  ]},
  { id: 'q9', dim: 'S2', text: '朋友第一次来家里做客，宠物的反应：', options: [
    { label: '直接躲到床底下/柜子里，拒绝一切社交', value: 1 },
    { label: '远远观察，保持安全距离', value: 2 },
    { label: '冲上去蹭来蹭去求摸摸，比你还热情', value: 3 },
  ]},
  { id: 'q10', dim: 'S2', text: '带宠物去宠物医院候诊，遇到陌生人：', options: [
    { label: '瑟瑟发抖/对着人叫', value: 1 },
    { label: '紧张但还算镇定', value: 2 },
    { label: '试图和所有人交朋友，搞得像它来社交的', value: 3 },
  ]},
  { id: 'q11', dim: 'S3', text: '在小区/公园遇到别的宠物：', options: [
    { label: '吓得往后缩或者直接呲牙：别过来', value: 1 },
    { label: '互相闻闻，相安无事', value: 2 },
    { label: '开心地冲上去要一起玩，像见到了老朋友', value: 3 },
  ]},
  { id: 'q12', dim: 'S3', text: '如果家里再来一只新宠物，你觉得它会：', options: [
    { label: '打架/冷战/一直排斥，"这是我的家！"', value: 1 },
    { label: '先观察一阵子，慢慢接受', value: 2 },
    { label: '很快就玩到一起去了，仿佛等这一天很久了', value: 3 },
  ]},
  { id: 'q13', dim: 'E1', text: '打雷下雨的时候，宠物会：', options: [
    { label: '浑身发抖躲进角落/钻你怀里', value: 1 },
    { label: '有点紧张但还好', value: 2 },
    { label: '啥也听不见，照样打呼噜', value: 3 },
  ]},
  { id: 'q14', dim: 'E1', text: '你突然把东西掉在地上发出巨响：', options: [
    { label: '吓得弹射起步，三秒到达天花板', value: 1 },
    { label: '抬头看看发生了什么', value: 2 },
    { label: '眼皮都不抬，该干嘛干嘛', value: 3 },
  ]},
  { id: 'q15', dim: 'E2', text: '你的宠物表达"我喜欢你"的方式是：', options: [
    { label: '疯狂舔你/蹭你/往你身上扑/咕噜咕噜', value: 3 },
    { label: '默默待在你旁边，安静陪伴', value: 2 },
    { label: '据说它也喜欢我，但我看不出任何证据', value: 1 },
  ]},
  { id: 'q16', dim: 'E2', text: '你出差几天回来，宠物的反应是：', options: [
    { label: '激动得快炸了，整只扑上来又蹭又舔', value: 3 },
    { label: '高兴地叫两声/蹭蹭', value: 2 },
    { label: '看了我一眼就走了，好像我没离开过', value: 1 },
  ]},
  { id: 'q17', dim: 'E3', text: '你心情不好的时候，宠物会：', options: [
    { label: '似乎能感受到，安安静静待在你身边', value: 3 },
    { label: '没什么特别反应', value: 2 },
    { label: '它比你更神经大条，自顾自玩', value: 1 },
  ]},
  { id: 'q18', dim: 'E3', text: '家里换了新的沐浴露/空气清新剂：', options: [
    { label: '宠物明显不适应，到处闻/打喷嚏/躲开', value: 3 },
    { label: '闻了闻就习惯了', value: 2 },
    { label: '完全无感，它的鼻子可能是摆设', value: 1 },
  ]},
  { id: 'q19', dim: 'I1', text: '零食被放在了它够不到的地方：', options: [
    { label: '想尽各种办法去够——跳、推、拉、搬凳子', value: 3 },
    { label: '对着你叫，意思是"你来帮我"', value: 2 },
    { label: '看了一眼就放弃了，继续躺着', value: 1 },
  ]},
  { id: 'q20', dim: 'I1', text: '你买了一个宠物益智玩具给它：', options: [
    { label: '研究一会儿居然真的打开了！你怀疑它偷看了说明书', value: 3 },
    { label: '随便扒拉几下，偶尔成功', value: 2 },
    { label: '完全不知道怎么玩，直接坐在上面当床用', value: 1 },
  ]},
  { id: 'q21', dim: 'I2', text: '教它"坐下""握手"之类的指令：', options: [
    { label: '教了一百遍还是对牛弹琴', value: 1 },
    { label: '有零食的话配合一下，没零食当没听见', value: 2 },
    { label: '一学就会，简直宠物界清华苗子', value: 3 },
  ]},
  { id: 'q22', dim: 'I2', text: '你叫它的名字，它会：', options: [
    { label: '充耳不闻，它可能忘了自己叫什么', value: 1 },
    { label: '耳朵动了一下但身子不动', value: 2 },
    { label: '立马看过来/跑过来，叫啥应啥', value: 3 },
  ]},
  { id: 'q23', dim: 'I3', text: '到了平时该吃饭的时间：', options: [
    { label: '它已经在饭碗旁等着了/来催你了', value: 3 },
    { label: '你放了它才去吃', value: 2 },
    { label: '什么时候吃都行，完全没有时间概念', value: 1 },
  ]},
  { id: 'q24', dim: 'I3', text: '关于它睡觉的位置和时间：', options: [
    { label: '固定位置固定时间，比你还守时', value: 3 },
    { label: '大概有个习惯，但不严格', value: 2 },
    { label: '哪里都能睡，什么时候都能睡，随缘', value: 1 },
  ]},
  { id: 'q25', dim: 'C1', text: '你出门上班后回来，家里的情况是：', options: [
    { label: '跟你离开时一模一样，岁月静好', value: 1 },
    { label: '有点小混乱——一只拖鞋被叼走了', value: 2 },
    { label: '看起来像被入室抢劫了', value: 3 },
  ]},
  { id: 'q26', dim: 'C1', text: '关于你的拖鞋/数据线/纸巾的命运：', options: [
    { label: '完好无损，它从来不碰', value: 1 },
    { label: '偶尔被啃两口，但总体可控', value: 2 },
    { label: '已经买了无数条替换了，它是消耗品的终结者', value: 3 },
  ]},
  { id: 'q27', dim: 'C2', text: '你在吃东西的时候，宠物会：', options: [
    { label: '用无辜的大眼睛盯着你，仿佛饿了三天', value: 3 },
    { label: '凑过来闻闻但不强求', value: 2 },
    { label: '对你的食物完全没兴趣', value: 1 },
  ]},
  { id: 'q28', dim: 'C2', text: '宠物对自己碗里食物的态度：', options: [
    { label: '三秒吃完还要舔碗，碗都能被舔到反光', value: 3 },
    { label: '正常进食，不急不慢', value: 2 },
    { label: '挑三拣四，这不吃那不吃，比美食家还难伺候', value: 1 },
  ]},
  { id: 'q29', dim: 'C3', text: '你给宠物剪指甲/洗澡时：', options: [
    { label: '像什么事都没有，淡定配合', value: 1 },
    { label: '有点抗拒但还是配合了', value: 2 },
    { label: '叫得像被虐待了，整栋楼都能听到，邻居差点报警', value: 3 },
  ]},
  { id: 'q30', dim: 'C3', text: '你的宠物有没有"演戏"的行为？', options: [
    { label: '经常——装跛脚/装可怜/假哭，戏多得能出专辑', value: 3 },
    { label: '偶尔有那么一点，但不严重', value: 2 },
    { label: '很真实，从不演戏，是什么样就什么样', value: 1 },
  ]},
];

export const GATE_Q: Question = {
  id: 'gate_q1', type: 'gate', text: '你的宠物对什么东西有最强烈的反应？', options: [
    { label: '激光笔/红点，一照就疯追', value: 1 },
    { label: '某种特定声音（开罐头/零食袋）', value: 2 },
    { label: '猫薄荷/某种奇怪的植物，闻到就原地发疯', value: 3 },
    { label: '没啥特别的，它对什么都差不多', value: 4 },
  ]
};

export const HIDDEN_Q: Question = {
  id: 'gate_q2', type: 'hidden', text: '它接触猫薄荷/那种植物后的反应是？', options: [
    { label: '稍微闻闻，反应不大', value: 1 },
    { label: '直接原地发疯——瞳孔放大、在地上打滚、精神恍惚、整只失控', value: 2 },
  ]
};
