---
description: Kororo Forecast app architecture
---
# ココロ予報 Webアプリ設計メモ

## 技術スタック
- 純粋な HTML + CSS + Vanilla JavaScript
- Chart.js (CDN) を利用して月次グラフを描画
- LocalStorage に日次データと診断結果を保存

## 主要セクション
1. **ヒーロー / ナビゲーション** — アプリ名、コンセプト、日次入力ボタン
2. **診断 (Feature ①)**
   - Step1: A〜F の嗜好スライダー
   - Step2: 10問 (A〜E の詳細) スライダー
   - Step3: 10問 (G/H) スライダー
   - 「ストレス対処タイプを診断」ボタンで各カテゴリスコアを集計し、優先タイプと詳細説明を表示
3. **タイプ別リファレンス (Feature ②)**
   - 各タイプ (①運動〜⑧没頭) の推奨アクションリスト
   - 診断結果に応じてハイライト
4. **日次記録 (Feature ③)**
   - 身体データ (脈拍・血圧・睡眠・運動・症状)
   - 食事データ (健康度・味・お酒/カフェイン)
   - 感情/ストレス (複数スライダー)
   - スイッチ実践 (8カテゴリの強度 + 効果スライダー)
   - 日記入力
   - 保存で LocalStorage に格納 & リスト表示
5. **月次グラフ / ランキング (Feature ④)**
   - 月を選択して Chart.js で Mood/Stress/HeartRate の折れ線
   - ランキング: 期間内のスイッチ効果トップ3
6. **疲れの正体 & ストレス対処提案 (Feature ⑦)**
   - 日次データに基づき 24種の疲労タイプ判定
   - 追加の 20+ ケース別メッセージ (効果実感〜完璧なエンディング) の自動提案

## データ構造
```ts
interface PreferenceAnswer {
  id: string;
  label: string;
  category: 'A'|'B'|'C'|'D'|'E'|'F'|'G'|'H';
  value: number; // -10 〜 +10
}

interface DailyEntry {
  id: string; // ISO 日付 + 時刻
  date: string; // yyyy-mm-dd
  body: {
    heartRate: number;
    bloodPressure: string; // systolic/diastolic
    sleepMinutes: number;
    exerciseMinutes: number;
    symptoms: string[];
  };
  diet: {
    healthScore: number; // -10〜+10
    flavors: string[];
    alcohol: boolean;
    caffeine: boolean;
  };
  mind: {
    mood: number;
    irritation: number;
    sadness: number;
    anxiety: number;
    excitement: number;
    calm: number;
    relationshipLoad: number;
    environmentStress: number;
    sunlight: number;
  };
  switches: {
    [key in SwitchKey]: {
      intensity: number; // -10〜+10
      relief: number; // -10〜+10
    };
  };
  diary: string;
  timestamp: number;
}
```

## ロジック概要
- **診断**: カテゴリごとの合計値でタイプ決定。スコア差が小さい場合は複数タイプを表示。
- **疲れの正体**: 条件表をコード化 (例: 睡眠<360, スイッチ intensity>0 等)。複数該当時は最大優先度を採用。
- **提案フロー**:
  1. 疲れの正体 (24種) から鉄板/意外/体調を提示
  2. 行動履歴のパターン (12種) をチェックし追加メッセージを付与
- **グラフ**: 月選択で該当日の mood / relationshipLoad / heartRate を描画。10日刻みの目盛り線。

## UI / UX
- テーマ: 朝焼け〜夕暮れのグラデーション、柔らかなフォント ("Zen Maru Gothic" + "Playfair Display")
- カードレイアウト + sticky セクション。モバイル向け縦スクロール最適化。
- 各 major ブロックに CTA ボタン。

## 今後のタスク
1. ベース HTML / CSS / JS の骨組み作成
2. 詳細データ (質問文、疲労リスト、提案メッセージ) を `data.js` に切り出し
3. UI コンポーネント構築
4. LocalStorage 連携 & Chart.js 実装
5. 動作確認と仕上げ
