# Coffee Drip Recipe App

Capacitor 5 とバニラ JavaScript で作成した、コーヒードリップ用レシピ計算アプリです。
iOS と Android OS に Deploy できるスマホアプリです。

## 概要

このアプリは、カップ数やドリップタイプに応じて、以下を計算して表示します。

- 豆の量
- 抽出用のお湯の量
- 抽出時間
- お湯を注ぐステップ
- ホット時のカップ温め用のお湯
- アイス時の氷量

レシピ生成前に、豆:お湯の比率を 1:x 形式で指定できます。
初期値は 1:17.2 です。

## 技術スタック

- Capacitor 5
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- npm

## ディレクトリ構成

    example004/
    ├── android/
    ├── docs/
    ├── www/
    │   ├── index.html
    │   ├── css/style.css
    │   └── js/app.js
    ├── capacitor.config.json
    ├── package.json
    └── README.md

## 前提条件

- Node.js 18 以上を推奨
- npm
- Android ビルドを行う場合:
  - Android Studio
  - Android SDK
  - Java 17 系
- iOS ビルドを行う場合:
    - macOS
    - Xcode
    - CocoaPods

## セットアップ

1. 依存パッケージをインストール

    npm install

2. ローカルサーバーを起動

    npm run start

3. ブラウザで確認

    http://localhost:8080

## 主な npm スクリプト

- start: http-server で 8080 ポート起動
- build: ダミーのビルド完了メッセージを出力

## Android 連携

Web 側の変更を Android プロジェクトへ反映する手順です。

1. Android プロジェクトへ同期

    npx cap sync android

2. Android Studio で開く

    npx cap open android

3. Android Studio からビルド・実行

必要に応じて adb で APK をインストールして確認してください。

## iOS 連携

Web 側の変更を iOS プロジェクトへ反映する手順です。

1. （初回のみ）iOS プラットフォームを追加

    npx cap add ios

2. iOS プロジェクトへ同期

    npx cap sync ios

3. Xcode で開く

    npx cap open ios

4. Xcode からビルド・実行

iPhone シミュレータ、または実機を選択して実行してください。

## 設定ファイル

- Capacitor 設定: capacitor.config.json
  - appId: com.example.coffeedriprecipe
  - appName: Coffee Drip Recipe
  - webDir: www

## ライセンス

MIT

## ローカル画像（images/ フォルダ）

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; margin: 1.5em 0;">
    <img src="images/スクリーンショット 2026-03-23 11.48.11.png" alt="スクリーンショット 2026-03-23 11.48.11" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
    <img src="images/スクリーンショット 2026-03-23 11.48.27.png" alt="スクリーンショット 2026-03-23 11.48.27" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
    <img src="images/スクリーンショット 2026-03-23 11.48.40.png" alt="スクリーンショット 2026-03-23 11.48.40" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
    <img src="images/スクリーンショット 2026-03-23 11.48.59.png" alt="スクリーンショット 2026-03-23 11.48.59" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
    <img src="images/スクリーンショット 2026-03-23 11.49.17.png" alt="スクリーンショット 2026-03-23 11.49.17" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
    <img src="images/スクリーンショット 2026-03-23 11.49.47.png" alt="スクリーンショット 2026-03-23 11.49.47" style="width:25%; height:auto; border-radius:8px; box-shadow:0 4px 12px rgba(48, 40, 40, 0.15);">
</div>
