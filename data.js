// 質問データ -----------------------------------------------------------------
const STEP1_QUESTIONS = [
  { id: 'A1', category: 'A', label: '外を歩いたり、体を動かしたりするのが好き' },
  { id: 'A2', category: 'A', label: 'ストレッチや軽い体操で体をほぐすのが好き' },
  { id: 'A3', category: 'A', label: '深呼吸や「呼吸の感覚」を意識するのが好き' },
  { id: 'A4', category: 'A', label: '筋トレやランニングなど、息が上がる活動が好き' },
  { id: 'A5', category: 'A', label: 'ヨガやピラティスのように体と向き合うのが好き' },

  { id: 'B1', category: 'B', label: '空や景色をぼーっと眺めるのが好き' },
  { id: 'B2', category: 'B', label: 'かわいい動物の写真や動画を見るのが好き' },
  { id: 'B3', category: 'B', label: '音楽や映画でリラックスするのが好き' },
  { id: 'B4', category: 'B', label: '良い香りやアロマを楽しむのが好き' },
  { id: 'B5', category: 'B', label: '美味しいものをじっくり味わうのが好き' },

  { id: 'C1', category: 'C', label: '難しい問題を解いたり、論理的に考えるのが好き' },
  { id: 'C2', category: 'C', label: 'クイズ・パズル・脱出ゲームをするのが好き' },
  { id: 'C3', category: 'C', label: 'ボードゲームなど戦略を練る遊びが好き' },
  { id: 'C4', category: 'C', label: '読書や調べごとで新しい知識を得るのが好き' },
  { id: 'C5', category: 'C', label: '計画やToDoリストを整理するのが好き' },

  { id: 'D1', category: 'D', label: '人に今の気持ちを話すと心が整いやすい' },
  { id: 'D2', category: 'D', label: '誰かと一緒に作業したり、同じ空間にいるのが好き' },
  { id: 'D3', category: 'D', label: '自分の考えをSNSや会話で共有するのが好き' },
  { id: 'D4', category: 'D', label: '誰かの相談に乗ると喜びを感じる' },
  { id: 'D5', category: 'D', label: '賑やかな場所やイベントでエネルギーをもらう' },

  { id: 'E1', category: 'E', label: '絵や手芸など、ものづくりが好き' },
  { id: 'E2', category: 'E', label: '楽器演奏や歌など表現するのが好き' },
  { id: 'E3', category: 'E', label: '料理やお菓子作りに没頭するのが好き' },
  { id: 'E4', category: 'E', label: '感情を紙に書き出したり日記をつけるのが好き' },
  { id: 'E5', category: 'E', label: '写真を撮ったり動画を編集したりするのが好き' },

  { id: 'F1', category: 'F', label: '部屋の掃除や断捨離で空間を整えるのが好き' },
  { id: 'F2', category: 'F', label: '誰にも邪魔されない一人の時間が必要' },
  { id: 'F3', category: 'F', label: '推し活やお気に入りキャラを追うのが好き' },
  { id: 'F4', category: 'F', label: 'ルーティンをこなすと安心する' },
  { id: 'F5', category: 'F', label: 'お風呂やサウナでリラックスするのが好き' }
];

const STEP2_QUESTIONS = [
  { id: 'A6', category: 'A', label: 'ダンスやスポーツなど、リズムに合わせて動くのが好き' },
  { id: 'A7', category: 'A', label: '試合や競争など、勝敗があるスポーツが好き' },
  { id: 'B6', category: 'B', label: 'ぬいぐるみや肌触りの良いものに触れるのが好き' },
  { id: 'B7', category: 'B', label: 'お風呂の温度差やマッサージなど肌への刺激が好き' },
  { id: 'C6', category: 'C', label: '語学学習や資格勉強などスキルアップが好き' },
  { id: 'C7', category: 'C', label: '将棋やチェス、プログラミングなど緻密な思考が好き' },
  { id: 'D6', category: 'D', label: '家族や友人と食事しながらお喋りするのが好き' },
  { id: 'D7', category: 'D', label: 'ボランティアやコミュニティ活動が好き' },
  { id: 'E6', category: 'E', label: 'ガーデニングや家庭菜園で育てるのが好き' },
  { id: 'E7', category: 'E', label: 'DIYや家具の組み立てなど実用的な制作が好き' }
];

const STEP3_QUESTIONS = [
  { id: 'G1', category: 'G', label: '瞑想やマインドフルネスで今に集中するのが好き' },
  { id: 'G2', category: 'G', label: '過去の経験を振り返り意味を考えるのが好き' },
  { id: 'G3', category: 'G', label: '哲学的な問いや宇宙・人生について考えるのが好き' },
  { id: 'G4', category: 'G', label: '神社仏閣やパワースポットなど静かな場所に行くのが好き' },
  { id: 'G5', category: 'G', label: '自分へのご褒美を計画して自分を労うのが好き' },
  { id: 'H1', category: 'H', label: 'ゲームの世界に没入して現実を忘れる時間が好き' },
  { id: 'H2', category: 'H', label: '好きな配信者のライブや動画を流し見するのが好き' },
  { id: 'H3', category: 'H', label: 'ASMRや環境音を聴いて癒やされるのが好き' },
  { id: 'H4', category: 'H', label: 'あえて「何もしない時間」を作りデジタルから離れるのが好き' },
  { id: 'H5', category: 'H', label: '部屋の模様替えやインテリア配置を考えるのが好き' }
];

// タイプ・スイッチ -----------------------------------------------------------------
const TYPE_LIBRARY = [
  {
    key: 'movement',
    title: '① 運動（体を動かしてスッキリ！）',
    description: '血流を回し、心と体を一緒に整えるアクティブな回復法。',
    actions: [
      '近所を10分だけ散歩する',
      'ラジオ体操をする',
      'お気に入りの曲で全力で踊る',
      'エスカレーターではなく階段を使う',
      '座ったまま足首を回す・ふくらはぎを揉む',
      'バッティングセンターや打ちっぱなしに行く',
      '大きな伸びをして背中を丸める',
      'サイクリングやジョギング'
    ]
  },
  {
    key: 'reward',
    title: '② ご褒美（好きなものを味わう）',
    description: '感覚を喜ばせて、脳に安心と快楽を届けるご自愛メニュー。',
    actions: [
      'ちょっと高いスイーツや果物を買う',
      'お気に入りの入浴剤でお風呂に入る',
      'ハンドクリームを塗って香りに癒やされる',
      'カフェでゆっくりコーヒーを飲む',
      '好きなアーティストのライブ映像を観る',
      'ふわふわの毛布やクッションに包まれる',
      '季節の花を飾る',
      '美味しいお取り寄せグルメを楽しむ'
    ]
  },
  {
    key: 'planning',
    title: '③ 計画（頭を使って整える）',
    description: '思考を整理し、未来を描くことで安心感を取り戻す。',
    actions: [
      '明日着る服をコーディネートしておく',
      '行きたい旅行先のルートを調べる',
      'やりたいこと100リストを書く',
      '家計簿やポイ活の整理をする',
      '宝くじが当たったらの使い道を考える',
      'パズルゲームやナンプレに集中する',
      'カレンダーに楽しい予定を書き込む',
      '冷蔵庫の余り物で作れるレシピを検索する'
    ]
  },
  {
    key: 'talk',
    title: '④ おしゃべり（誰かと関わってホッとする）',
    description: '言葉を交わして、感情を循環させるケア。',
    actions: [
      '友達に「元気？」とスタンプを送る',
      '家族と今日あったことを話す',
      'ペットに話しかけたり遊んだりする',
      'SNSで好きな話題に「いいね」やリプライ',
      'コンビニの店員さんに「ありがとう」と言う',
      'オンラインゲームでチャットを楽しむ',
      '美容院や整体で世間話をする',
      '懐かしい知人に連絡してみる'
    ]
  },
  {
    key: 'create',
    title: '⑤ つくる（何かを生み出してワクワク）',
    description: 'アウトプットで感情を形にして循環させる。',
    actions: [
      '凝った料理や常備菜を作る',
      '今日の出来事を日記やブログに書く',
      'スマホ写真を加工・整理する',
      '塗り絵やプラモデル、DIYに没頭する',
      '鼻歌を歌ったり、楽器を触ったりする',
      '植物を植え替える・育てる',
      'SNS のアイコンやヘッダーを自作する',
      '折り紙や編み物などの手作業をする'
    ]
  },
  {
    key: 'clean',
    title: '⑥ おそうじ（場をきれいにしてサッパリ！）',
    description: '環境を整えることで心のスペースも広げる。',
    actions: [
      'デスクのホコリを払う',
      '財布のレシートを捨てる',
      'スマホの不要な写真やアプリを消す',
      '靴を磨いたり玄関を掃いたりする',
      'シーツを洗って太陽に当てる',
      '洗面所の鏡をピカピカに拭く',
      'お皿洗いやシンク掃除をやりきる',
      '1日1捨てで不要なものを処分する'
    ]
  },
  {
    key: 'solo',
    title: '⑦ ひとり時間（ぼーっと静かに休む）',
    description: '沈黙と静けさで神経を休ませるケア。',
    actions: [
      'スマホの電源を切って5分目を閉じる',
      '温かい飲み物をゆっくり飲む',
      '静かな公園のベンチで座る',
      'キャンドルの火を眺める',
      '波の音や雨の音など環境音を聴く',
      '図書館や本屋の静かな空間に行く',
      'お寺や神社にお参りに行く',
      '何も考えずに空の雲を眺める'
    ]
  },
  {
    key: 'immersion',
    title: '⑧ 没頭（別の世界に浸って夢中！）',
    description: '物語や推しの世界に飛び込んで意識を切り替える。',
    actions: [
      '映画館や自宅で映画を一本観る',
      'マンガを一気に全巻読む',
      '推しの動画や写真を眺める',
      'ゲームに没頭する',
      '小説を読んで物語の世界に入る',
      'アニメやドラマを一気見する',
      '好きな芸能人のインタビュー記事を読む',
      'VR体験やメタバースで遊ぶ'
    ]
  }
];

const SWITCH_KEYS = TYPE_LIBRARY.map(({ key, title }) => ({ key, label: title.replace(/^\d+\s*/, '') }));

// 心の指標 -----------------------------------------------------------------------
const MIND_METRICS = [
  { key: 'mood', label: '気分 (最悪 → 最高)' },
  { key: 'irritation', label: 'イライラ' },
  { key: 'sadness', label: '悲しい' },
  { key: 'anxiety', label: '不安' },
  { key: 'excitement', label: 'ワクワク' },
  { key: 'calm', label: '穏やか' },
  { key: 'relationshipLoad', label: '人間関係の負荷' },
  { key: 'environmentStress', label: '環境ストレス（騒音など）' },
  { key: 'sunlight', label: '太陽光を浴びたか' }
];

// 疲労タイプ（Feature 07 用） ------------------------------------------------------
const FATIGUE_LIBRARY = [
  {
    key: 'brainOverheat',
    no: 1,
    title: '脳のオーバーヒート（思考疲れ）',
    diagnosisType: 'A (身体活性)',
    pillars: { iron: '無心でスクワット', surprise: 'H (ASMR) を聴く', body: '脈拍を下げる深呼吸' },
    advice: '今夜のあなたの脳は熱を持ったパソコンのような状態。考えるのをやめて脳をクールダウンさせましょう。'
  },
  {
    key: 'empathyDrain',
    no: 2,
    title: '対人・共感疲労',
    diagnosisType: 'B (感覚・リラックス)',
    pillars: { iron: '好きな香りを嗅ぐ', surprise: 'E (土いじり)', body: 'アイマスクで視覚遮断' },
    advice: '周囲を優先した優しい一日。いまは殻に閉じこもっても大丈夫、自分の領域を守りましょう。'
  },
  {
    key: 'pressureDrop',
    no: 3,
    title: '低気圧・環境疲れ',
    diagnosisType: 'C (思考・戦略)',
    pillars: { iron: '明日の計画を練る', surprise: 'F (一人の時間)', body: '体調を数値化して客観視' },
    advice: '見えない環境変化と戦って自律神経がヘトヘト。自分を責めず、重力に身を委ねて。'
  },
  {
    key: 'digestiveLoad',
    no: 4,
    title: '内臓・食事疲れ',
    diagnosisType: 'D (交流・共感)',
    pillars: { iron: '誰かと軽い世間話', surprise: 'G (瞑想)', body: '白湯をゆっくり飲む' },
    advice: '消化にエネルギーを奪われた状態。心の問題ではなく内臓からの「休ませて」サインです。'
  },
  {
    key: 'digitalOverload',
    no: 5,
    title: '刺激過多疲れ（デジタル疲れ）',
    diagnosisType: 'E (表現・創造)',
    pillars: { iron: '紙に殴り書きする', surprise: 'A (リズム運動)', body: 'スマホを隠して5分閉眼' },
    advice: '情報の嵐で脳が消化不良。画面を閉じて静寂をプレゼントしましょう。'
  },
  {
    key: 'energyStagnation',
    no: 6,
    title: 'エネルギー停滞疲れ（運動不足）',
    diagnosisType: 'F (環境・整頓)',
    pillars: { iron: '1分だけ片付け', surprise: 'D (SNSで一言共有)', body: '窓を開けて空を見る' },
    advice: '頭だけ動いて体が止まっている澱み。肩を回すだけでも心が軽くなります。'
  },
  {
    key: 'decisionFatigue',
    no: 7,
    title: '決断疲れ',
    diagnosisType: 'G (精神的・内省)',
    pillars: { iron: '自分へのご褒美計画', surprise: 'B (動物動画)', body: '選択肢を減らして早寝' },
    advice: '今日は判断を繰り返し脳がバッテリー切れ。何も決めず流れに身を任せて。'
  },
  {
    key: 'sensoryOverload',
    no: 8,
    title: '感覚過敏疲れ（ノイズ・ストレス）',
    diagnosisType: 'H (デジタル・回避)',
    pillars: { iron: '何もしない時間を作る', surprise: 'F (ルーティン作業)', body: '耳栓で遮音する' },
    advice: '五感が刺激を拾いすぎています。暗く静かな場所で神経を包みましょう。'
  },
  {
    key: 'peoplePleaser',
    no: 9,
    title: '「いい人」疲れ',
    diagnosisType: 'E (表現・創造)',
    pillars: { iron: '楽器や歌で発散', surprise: 'C (パズルに没頭)', body: '鏡に向かって本音を言う' },
    advice: '感情労働でエネルギー消費。ため息を全部吐き出し、自分を解放して。'
  },
  {
    key: 'routineStagnation',
    no: 10,
    title: 'マンネリ停滞疲れ',
    diagnosisType: 'A (身体活性)',
    pillars: { iron: '普段と違う道を歩く', surprise: 'G (哲学的な読書)', body: '太陽光を10分浴びる' },
    advice: '変化のなさで心が澱み中。いつもと違う選択で風を通して。'
  },
  {
    key: 'sunsetBlue',
    no: 11,
    title: 'サンセット不安',
    diagnosisType: 'B (感覚・リラックス)',
    pillars: { iron: '暖色系のライトを点ける', surprise: 'D (推し活に励む)', body: '温かいスープを飲む' },
    advice: '夕方のホルモン変化で不安が出現。温かい光と飲み物で安心モードに。'
  },
  {
    key: 'boundaryBlur',
    no: 12,
    title: '境界線消失疲れ（デジタル・ドメイン）',
    diagnosisType: 'F (環境・整頓)',
    pillars: { iron: 'デジタルデトックス', surprise: 'A (ヨガ)', body: '物理的に一人の空間を確保' },
    advice: 'スマホ越しに境界が溶けています。画面を隠して領域を取り戻して。'
  },
  {
    key: 'freezeEmotion',
    no: 13,
    title: '感情のフリーズ',
    diagnosisType: 'G (精神的・内省)',
    pillars: { iron: '静かなお寺の動画を見る', surprise: 'B (肌触りの良い服)', body: '足湯で下半身を温める' },
    advice: 'ショックにより心が凍結中。解かそうとせず、体を温め安全を伝えて。'
  },
  {
    key: 'multitaskAfterimage',
    no: 14,
    title: 'マルチタスク残像',
    diagnosisType: 'C (思考・戦略)',
    pillars: { iron: 'ToDoを全部書き出す', surprise: 'A (ダンス)', body: '一度に一つの音だけ聴く' },
    advice: '頭のブラウザを開きっぱなし。単純な感覚に集中して散らばった意識を回収しましょう。'
  },
  {
    key: 'serotoninLow',
    no: 15,
    title: 'セロトニン枯渇',
    diagnosisType: 'A (身体活性)',
    pillars: { iron: '朝の光の中で背伸び', surprise: 'E (料理に没頭)', body: 'トリプトファンを意識した食事' },
    advice: '光と動きが不足。朝日とリズム運動で心のエンジンを再起動。'
  },
  {
    key: 'rewardTolerance',
    no: 16,
    title: 'ご褒美耐性疲れ',
    diagnosisType: 'H (デジタル・回避)',
    pillars: { iron: 'デジタルから離れる', surprise: 'F (断捨離)', body: '五感を休ませる静寂' },
    advice: '刺激を重ねすぎて感覚が麻痺。あえて空白を作り、潤いをリセット。'
  },
  {
    key: 'habitatStress',
    no: 17,
    title: 'ハビタットストレス',
    diagnosisType: 'F (環境・整頓)',
    pillars: { iron: '部屋の模様替えを妄想', surprise: 'B (良い香りのスプレー)', body: '換気をして酸素を回す' },
    advice: '散らかった視界やノイズがダメージに。視界の一箇所を整えるだけでOK。'
  },
  {
    key: 'muscleFreeze',
    no: 18,
    title: '筋肉のフリーズ',
    diagnosisType: 'A (身体活性)',
    pillars: { iron: 'お風呂上がりのストレッチ', surprise: 'C (難しい本を読む)', body: '肩甲骨を大きく回す' },
    advice: '同じ姿勢で血流が止まり心も固まった状態。大きく伸びて循環を戻そう。'
  },
  {
    key: 'resonanceFatigue',
    no: 19,
    title: '共鳴疲れ（ネガティブ・シンクロ）',
    diagnosisType: 'D (交流・共感)',
    pillars: { iron: '親しい友人とだけ話す', surprise: 'H (ASMR)', body: '境界線を引くイメージ瞑想' },
    advice: '他人の感情を吸い込んで疲弊。通知を切り、自分だけの領域を温めて。'
  },
  {
    key: 'waitingFatigue',
    no: 20,
    title: '待ち疲れ（待機ストレス）',
    diagnosisType: 'C (思考・戦略)',
    pillars: { iron: '別の小さな計画を完了', surprise: 'B (景色を眺める)', body: '深い呼吸で副交感神経を刺激' },
    advice: '意識が常に未来にいてアイドリング疲れ。今日は営業終了を宣言して。'
  },
  {
    key: 'inventoryFatigue',
    no: 21,
    title: '感情の在庫疲れ',
    diagnosisType: 'E (表現・創造)',
    pillars: { iron: '感情を絵や文にする', surprise: 'A (ミット打ち/筋トレ)', body: 'ため息を限界まで吐き出す' },
    advice: '飲み込んだ言葉が渋滞中。紙に書き出して出口を作りましょう。'
  },
  {
    key: 'sunlightLag',
    no: 22,
    title: 'サンライト・ラグ',
    diagnosisType: 'G (精神・内省)',
    pillars: { iron: '自分への労い日記', surprise: 'D (ボランティア・徳積み)', body: '明日の朝の光を予約する' },
    advice: '体内時計の時差ボケ。朝の光でリズムを再調整しましょう。'
  },
  {
    key: 'knowledgeHeat',
    no: 23,
    title: 'インプット知恵熱',
    diagnosisType: 'H (デジタル・回避)',
    pillars: { iron: 'ぼーっと何もしない', surprise: 'F (単純作業の掃除)', body: '脳を冷やす（保冷剤等）' },
    advice: '良質な情報でも詰め込みすぎれば脳が熱暴走。空白の時間を与えて。'
  },
  {
    key: 'rhythmCrash',
    no: 24,
    title: 'リズム・クラッシュ（生活の乱れ）',
    diagnosisType: 'F (環境・整頓)',
    pillars: { iron: 'いつもの手順でお茶を淹れる', surprise: 'C (語学・スキルアップ)', body: '同じ時間に布団に入る' },
    advice: '生活リズムの乱れで本能が警戒。小さな習慣を一つ戻してあげましょう。'
  }
];

// 提案パターン -------------------------------------------------------------------
const PATTERN_LIBRARY = [
  {
    key: 'effectBoost',
    title: '【効果実感・ブースト型】',
    criteriaText: 'ストレス対処にチェックあり & スッキリ度 8 以上',
    message: '今日の「{switch}」は驚くほどフィット。お気に入り登録して質を高めましょう。',
    followUp: '次回は香りを足す、音楽を変えるなどで深さをプラス。'
  },
  {
    key: 'emptySwing',
    title: '【空振り・リカバリー型】',
    criteriaText: 'ストレス対処あり & スッキリ度 3 以下 & 気分が低い',
    message: '「{switch}」では届かなかったみたい。明日は逆タイプのスイッチを試してみませんか？',
    followUp: '能動→受動、受動→能動など真逆の行動が心の別の筋肉を伸ばします。'
  },
  {
    key: 'habitBias',
    title: '【偏り・バランス調整型】',
    criteriaText: '直近3日同じスイッチ',
    message: '最近「{switch}」が連続中。安心と同時にマンネリの澱も。未使用の「{altSwitch}」に挑戦を。',
    followUp: '普段使わない行動で心に新しい風を入れましょう。'
  },
  {
    key: 'outputLacking',
    title: '【アウトプット不足型】',
    criteriaText: '受動スイッチのみ & 不安・モヤモヤ',
    message: '内側に溜まった思いが出口待ち。明日は「つくる」や「運動」で外に出そう。',
    followUp: '数分のアウトプットで、新しい元気のスペースが生まれます。'
  },
  {
    key: 'overdoing',
    title: '【やりすぎ・バーンアウト型】',
    criteriaText: '活動的スイッチ多数 & 脈拍高め & スッキリ中程度',
    message: '回復そのものがタスク化しているかも。明日は「ひとり時間」で動かない勇気を。',
    followUp: '静寂が最大の特効薬になるタイミングです。'
  },
  {
    key: 'lonely',
    title: '【孤独感フォロー型】',
    criteriaText: '個人活動のみ & 寂しさ',
    message: '一人時間はたっぷり。次は誰かと関わる「おしゃべり」を一匙どうぞ。',
    followUp: '挨拶やスタンプ一つでも心の温度が上がります。'
  },
  {
    key: 'switchMismatch',
    title: '【スイッチ・ミス型】',
    criteriaText: '思考疲れなのに思考スイッチを使用',
    message: '頭が疲れているのに「{switch}」でさらに酷使。明日は五感スイッチに切り替えましょう。',
    followUp: '考える→感じるへシフトが必要です。'
  },
  {
    key: 'passiveDrain',
    title: '【受動疲れ型】',
    criteriaText: 'どっぷり長時間 & スッキリ低 & 目の疲れ',
    message: '情報の海で泳ぎすぎ。5分の「おそうじ」で自分のペースを取り戻して。',
    followUp: '手を動かすことで自己効力感が戻ります。'
  },
  {
    key: 'rewardCover',
    title: '【「ご褒美」のごまかし型】',
    criteriaText: '人間関係負荷高 & ご褒美偏重 & 感情未解決',
    message: '甘いもので蓋をしたモヤモヤを「つくる（日記）」で外へ。',
    followUp: '書き出すことでご褒美の栄養が深く届きます。'
  },
  {
    key: 'quietCraving',
    title: '【静寂への渇望】',
    criteriaText: 'おしゃべり後に脈拍高 & スッキリ低',
    message: '本当は一人になりたかったのかも。明日は完全な「ひとり時間」を。',
    followUp: '沈黙の中で電池をチャージしましょう。'
  },
  {
    key: 'unfinished',
    title: '【未完了のフラストレーション】',
    criteriaText: 'つくる/おそうじに着手→日記で未完了',
    message: '目標が高すぎたかも。明日は絶対成功する超小さな計画を立てて。',
    followUp: '「ゴミを1つ捨てる」でも立派な完了です。'
  },
  {
    key: 'detoxSuccess',
    title: '【デトックス成功・維持型】',
    criteriaText: '身体データ良好 & 苦手スイッチでスッキリ9+',
    message: '新しい処方箋を発見！このパターンをメモして次回も再現しましょう。',
    followUp: 'カレンダーに記録して成功体験をストック。'
  },
  {
    key: 'sunkCost',
    title: '【サンクコスト型】',
    criteriaText: 'どっぷり/つくる長時間 & スッキリ低',
    message: '途中でやめる勇気を。パッと切り上げて「おそうじ」で空気入れ替えを。',
    followUp: '余白を作ると再開時に新鮮さが戻ります。'
  },
  {
    key: 'falseRest',
    title: '【偽りの休息（SNS依存）】',
    criteriaText: 'ひとり時間 + SNS おしゃべり & 気分低',
    message: 'ひとりのようでひとりではない時間でした。完全オフラインの静寂を5分だけ。',
    followUp: '誰の物語も見ない時間で主役を取り戻そう。'
  },
  {
    key: 'mindOnly',
    title: '【身体不在（マインド過多）】',
    criteriaText: '計画・どっぷり高 & 運動/おそうじ 0',
    message: '思考だけで解決しようとすると負荷大。明日は階段を上るなど原始的な「運動」を最優先に。',
    followUp: '体が動けば頭の霧も晴れます。'
  },
  {
    key: 'selfNeglect',
    title: '【セルフ・ネグレクト型】',
    criteriaText: 'おそうじ・計画のみでご褒美ゼロ',
    message: '心に潤い不足。罪悪感を捨てて役に立たない「ご褒美」を。',
    followUp: '正しさより楽しさを優先してOK。'
  },
  {
    key: 'catharsis',
    title: '【アウトプット・カタルシス型】',
    criteriaText: 'つくる実施で気分大幅改善',
    message: '「つくる」が完璧に機能！溜まる前に数行メモで放流する習慣を。',
    followUp: '小出しのデトックスで渋滞を防ぎましょう. '
  },
  {
    key: 'sunlightMiss',
    title: '【太陽光ミス】',
    criteriaText: '室内対処のみ & 太陽光なし & 睡眠不足',
    message: '室内整えは◎でも光が眠ったまま。明日は窓際で「運動」数分を。',
    followUp: '光×動きで効果が数倍にアップ。'
  },
  {
    key: 'highFreqLowEffect',
    title: '【高頻度・低効果型】',
    criteriaText: '7日以上同じスイッチ & スッキリ低下',
    message: '「{switch}」が義務化中。明日はオフ日にして「ひとり時間」で余白を。',
    followUp: '距離を置くと次の感動が戻ってきます。'
  },
  {
    key: 'selfCritic',
    title: '【「つくる」による自己批判】',
    criteriaText: 'つくる後に悲しい感情 & 反省文',
    message: '今日は自分に厳しすぎたかも。他人の世界に逃避する「どっぷり」を。',
    followUp: '客観視はエネルギー充填後でOK。'
  },
  {
    key: 'weekendPressure',
    title: '【週末・プレッシャー型】',
    criteriaText: '休日に4+スイッチ & スッキリ低',
    message: '休みを詰め込みすぎ。明日はやることを1つに絞る計画を。',
    followUp: '「何もしない」を成果にしてみましょう。'
  },
  {
    key: 'silentEndurance',
    title: '【沈黙の忍耐型】',
    criteriaText: '負荷5 & スイッチ未実施',
    message: 'スイッチを入れる気力も奪われた日。極小の「ご褒美」で自分を温めて。',
    followUp: '耐え抜いた自分に物理的な優しさを。'
  },
  {
    key: 'expectationGap',
    title: '【期待値ズレ】',
    criteriaText: 'おしゃべり実施 & スッキリ3以下',
    message: '相手との波長がズレた日。明日は自分だけで完結する「つくる／おそうじ」を。',
    followUp: '自分の機嫌を自分で取る練習を。'
  },
  {
    key: 'perfectEnding',
    title: '【完璧なエンディング型】',
    criteriaText: '対処あり & スッキリ10 & 日記ポジティブ',
    message: '最高の締めくくり！明日の朝一番の楽しいことを一つ計画して眠りましょう。',
    followUp: '良い波を未来の自分にバトン。'
  }
];

const PASSIVE_SWITCHES = ['reward', 'solo', 'immersion'];
const ACTIVE_SWITCHES = ['movement', 'planning', 'talk', 'create', 'clean'];

const CATEGORY_LIBRARY = {
  A: {
    title: 'A｜身体活性・運動系',
    description: '体を動かすことでストレスを循環させるタイプ。リズム運動や呼吸でリセットしやすい傾向。'
  },
  B: {
    title: 'B｜感覚・リラックス系',
    description: '視覚・嗅覚・触覚など五感を満たして安心するタイプ。穏やかな刺激が栄養に。'
  },
  C: {
    title: 'C｜思考・戦略・集中系',
    description: '考えを整理したり、問題解決で落ち着くタイプ。計画や学びが回復スイッチ。'
  },
  D: {
    title: 'D｜交流・共感・共有系',
    description: '人との会話や共感で心を整えるタイプ。対話・共有・共創でエネルギー補給。'
  },
  E: {
    title: 'E｜表現・創造・没頭系',
    description: 'ものづくりや表現で感情を昇華するタイプ。クリエイティブな没頭が特効薬。'
  },
  F: {
    title: 'F｜環境調整・整頓系',
    description: '空間や習慣を整えることで心も整うタイプ。片付けやルーティンが落ち着きをくれる。'
  },
  G: {
    title: 'G｜精神的・内省系',
    description: '内観や哲学、マインドフルネスで整うタイプ。静かな思索が心のデトックスに。'
  },
  H: {
    title: 'H｜デジタル・没入・回避系',
    description: 'デジタル世界や没頭体験で現実と距離を置くタイプ。適度な遮断と没入がカギ。'
  }
};
