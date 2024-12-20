# 二次退避くん

![サムネイル　二次退避くん](https://github.com/user-attachments/assets/f1c4a854-9aa4-45c4-9a90-995322b59f4d)

## 🔗 スライドURL
[Canva](https://www.canva.com/design/DAGUe39bp6I/9KdaRKhLURWXL_Cwt-S-SQ/view?utm_content=DAGUe39bp6I&utm_campaign=designshare&utm_medium=link&utm_source=editor)

## 🎥　製品動画
- 家を貸す人

https://github.com/user-attachments/assets/466e8867-f9d6-4c0b-9174-58162f3dc830


- 家を借りる人

https://github.com/user-attachments/assets/f607152b-cc2c-4666-86b4-e9e6755c8ddc


- リクエストを承認（マッチング）

https://github.com/user-attachments/assets/f9da2071-669d-461f-b4b5-a09315663b71



## 📦 製品概要

### 背景(製品開発のきっかけ、課題等）

能登半島地震に関する動画を通じて、持病を抱える方の避難の難しさを知り、持病のある方や高齢者、障がいのある方、ペットを飼っている方など、一般的な避難所での生活が難しい方々の助けになりたいと考えるようになりました。

### 製品説明（具体的な製品の説明）

『避難場所を貸してくれる人と借りたい人をマッチングするサービス』です。バリアフリー対応やペット同伴可能など、さまざまなニーズに対応した避難場所を提供できるユーザーが、サイトに住居を登録します。被災者は自身の状況に合った避難場所を簡単に探し、スムーズにマッチングすることができます。

### 特長

#### 1. 避難場所を貸してくれる人と借りたい人をマッチング

#### 2. 現在地と提供されている住居の安全度を表示

### 解決出来ること

このプロダクトは、持病のある方や高齢者、障がいのある方、ペット同伴の方など一般的な避難所で生活が難しい方々が、バリアフリー対応やペット同伴可能などの多様なニーズに対応した避難場所を迅速に見つけ、安全で安心な避難生活を確保できる仕組みを提供します。

また、既存の避難場所が満員であったり、現在の避難場所が新たな災害の危険にさらされてしまった場合でも、さらなる避難場所の確保に活用いただけます。

### 今後の展望

- 本人確認
- AIを用いてホストとゲスト間のコミュニケーションの障壁を低くする
- 部屋画像から３Dモデルを作成し、部屋のイメージをより高める

### 注力したこと（こだわり等）

- シンプルでわかりやすいUI/UXの実装

## 🚀 開発技術

### 活用した技術

#### API・データ

- Supabase Auth
- Supabase Storage
- Google OAuth
- Google Map API
- Geolocation (ブラウザ)

#### フレームワーク・ライブラリ・モジュール

![見出しを追加 (1)](https://github.com/user-attachments/assets/b1d55ca4-32b0-4255-bd92-b7a4925c0f1b)



#### デバイス

- PC（Web）

### 独自技術

#### ハッカソンで開発した独自機能・技術

- 型安全に開発を進めるため、独自のバリデーションユーティリティやTanstack Queryのラッパーなどを実装しました。
  - https://github.com/jphacks/tk_2403/blob/main/app/utils/client.ts
  - https://github.com/jphacks/tk_2403/blob/main/app/utils/server.ts
- Google Map APIを利用して住所を正規化して記録することで、エリアごとの安全度の設定、エリアや安全度などでの検索を実現しました。
  - https://github.com/jphacks/tk_2403/blob/main/app/repos/geocoding.ts
  - https://github.com/jphacks/tk_2403/blob/main/app/server/evacuationPlace.ts
- ブラウザのGeolocation APIとGoogle Map APIを組み合わせ、現在位置の安全度を確認できる機能を実装しました。
  - https://github.com/jphacks/tk_2403/pull/79
