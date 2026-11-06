# 🌊 Yoshika Fukuyama - Portfolio Website

青緑（ティール・エメラルド・シアン）を基調とした、爽やかで透明感のあるモダンなポートフォリオサイトです。  
旅で感じる心地よさや開放感をデザインに取り入れ、グラスモーフィズムとスムーズなアニメーションを施しています。

---

## ✨ 特徴
- **爽やかな青緑デザイン**: 清涼感のあるミントグリーン・ティール・エメラルドのカラーパレット。
- **ダークモード / ライトモード対応**: 深海のようなオーシャングリーンと清涼感あるライトモードをワンクリックで切り替え可能（設定は自動保存）。
- **完全レスポンシブ**: スマートフォン、タブレット、PCのすべての画面サイズに最適化。
- **軽量・高速**: 外部ライブラリを最小限にし、バニラJavaScript・CSSで軽快に動作。
- **GitHub Pages 完全対応**: 静的ファイル（HTML / CSS / JS）のみで構成されているため、GitHubにプッシュするだけで即座に公開できます。

---

## 🚀 GitHub Pages への公開手順

以下の手順に沿って操作するだけで、無料で全世界にポートフォリオを公開できます。

### ステップ 1: GitHubで新しいリポジトリを作成
1. [GitHub](https://github.com) にログインします。
2. 画面右上の「**+**」アイコンから「**New repository**」をクリックします。
3. リポジトリ名を入力します（例: `portfolio`、または `<あなたのGitHubユーザー名>.github.io`）。
4. **Public**（公開）を選択します。
5. 「Initialize this repository with...」のチェックはすべて**外した状態**で「**Create repository**」ボタンを押します。

---

### ステップ 2: ローカルからコードをプッシュ

ターミナル（PowerShell または コマンドプロンプト）を開き、このフォルダで以下のコマンドを順番に実行します。

```powershell
# 1. Gitの初期化
git init

# 2. すべてのファイルをステージング
git add .

# 3. コミットを作成
git commit -m "feat: 初回ポートフォリオ作成（爽やかな青緑デザイン・旅行テーマ）"

# 4. ブランチ名を main に設定
git branch -M main

# 5. GitHubリポジトリと紐付け（※URLはご自身のリポジトリURLに置き換えてください）
git remote add origin https://github.com/<あなたのユーザー名>/portfolio.git

# 6. GitHubにプッシュ
git push -u origin main
```

---

### ステップ 3: GitHub Pages の有効化

1. GitHubのリポジトリページを開きます。
2. 上部メニューの **「Settings（設定）」** をクリックします。
3. 左サイドバーから **「Pages」** を選択します。
4. **「Build and deployment」** の下の **Source** が `Deploy from a branch` になっていることを確認します。
5. **Branch** で `main` ブランチを選択し、フォルダは `/ (root)` のまま **「Save」** をクリックします。
6. 数分待つと、上部に以下のような公開URLが表示されます：
   ```
   https://<あなたのユーザー名>.github.io/portfolio/
   ```
   （リポジトリ名を `<ユーザー名>.github.io` にした場合は `https://<ユーザー名>.github.io/` になります）

---

## 🛠️ カスタマイズガイド

- **プロフィールの変更**:
  - `index.html` 内のお名前、所属、自己紹介文を編集してください。
- **作品・制作物の追加・変更**:
  - `index.html` の `<section id="works">` 内にある各カードを編集してください。
  - GitHubリンクやデモURLを自身のリンクに差し替えてください。
- **SNSリンクの変更**:
  - X（旧Twitter）やGitHub、Qiitaのリンクをお手持ちのアカウントURLに変更してください。

---

## 📁 ディレクトリ構成

```
.
├── index.html        # ポートフォリオのメインHTML
├── style.css         # 青緑テーマ＆レスポンシブデザインのCSS
├── script.js         # アニメーション、テーマ切替、フィルタ等のJS
├── .nojekyll         # GitHub Pages用のJekyllバイパス設定
├── .gitignore        # Git除外設定
└── README.md         # 説明書（本ファイル）
```
