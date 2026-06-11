# HANDOFF — HariTerrace コーポレートサイト制作

> 別セッション引き継ぎ用ドキュメント（最終更新: 2026-06-11）
> このファイルを最初に読めば、続きから作業できます。

---

## 0. 一言サマリー
沖縄の **株式会社HariTerrace** の前衛的コーポレートサイト（`hari-terrace.html`）を制作中。
コンセプトは **「量子観測 × 社名の由来」**。GitHub Pages で公開済み。
あわせて系列の **LIME DETAILING** 集客LP（`lp.html`）も制作済み。
既存のモバイル業務アプリ `index.html` は **絶対に触らない**。

---

## 1. リポジトリ / ブランチ / デプロイ

| 項目 | 値 |
|---|---|
| リポジトリ | `homine-sudo/detalia-mobile`（public, GitHub MCPでアクセス可） |
| 作業ブランチ | `claude/original-homepage-design-5ncyft` |
| デフォルト | `main` |
| 公開 | GitHub Pages（`main` から自動デプロイ、ワークフロー名 "pages build and deployment"） |
| Pages ベースURL | https://homine-sudo.github.io/detalia-mobile/ |

### デプロイ手順（毎回これ）
1. 作業ブランチで編集・コミット・push
2. `git checkout main && git merge --no-edit <branch>`
3. `git push origin main` → Pages が自動デプロイ（約1〜2分）
4. ブランチへ戻る

### ⚠️ 既知のハマりどころ
- **push が HTTP 503 で落ちる**ことがある → 指数バックオフでリトライ（2,4,8,16s）。`Everything up-to-date` と出ても実際は失敗していることがあるので最後の成功ログを確認。
- **deploy-pages が 401 "Requires authentication" で失敗**することがある（`event: dynamic` の run）。その場合は **空コミットで再トリガー**：`git commit --allow-empty -m "Retrigger Pages deployment" && git push origin main`。
- 反映確認は `mcp__github__actions_list`（list_workflow_runs）で `conclusion: success` を確認。出力が巨大なのでファイル保存→python/jqで `status|conclusion|head_sha|updated_at` だけ抽出する。
- ブラウザキャッシュ対策に URL 末尾へ `?v=N` を付けて案内するとよい。
- スマホのファイルプレビューだとJSが動かない。**必ず公開URLで確認**してもらう。

---

## 2. ファイル構成

| ファイル | 内容 | 触ってよいか |
|---|---|---|
| `index.html` | 既存のモバイル業務アプリ（LIME DETALIA / 6105行のPWA, Dropbox/Canva連携） | **触らない** |
| `hari-terrace.html` | **メイン成果物**。HariTerrace コーポレートサイト | 編集対象 |
| `lp.html` | LIME DETAILING 集客LP（黒×金×ライム） | 編集可 |
| `manifest.json`, `sw.js`, `logo.png`, `lime_logo_dark.png` | 既存アプリ用資産 | 基本触らない |
| `HANDOFF.md` | このファイル | — |

---

## 3. 会社情報（Googleドライブで裏どり済み・サイトに反映済み）

> 出典: Drive `経営分析_引継ぎ_2026-05-21.md`、`財務分析レポート_A4_2026-05-22.pdf`、
> `ライム×スカイ リスト`、IPA「SECURITY ACTION」公表PDF。

| 項目 | 内容 |
|---|---|
| 商号 | 株式会社HariTerrace（ハリテラス） |
| 代表者 | 代表取締役 大嶺 尚士（おおみね ひさし）※補助金申請控えのフリガナ「オオミネ ヒサシ」で確定 |
| 設立 | **2017年（平成29年）9月1日**（履歴事項全部証明書=謄本.pdf で確定・3月決算） |
| 資本金 | 1,000,000円（発行済100株） |
| 本社 | 〒901-0513 沖縄県島尻郡八重瀬町玻名城105番地（社長1名＝事務） |
| 豊見城営業所 | 沖縄県豊見城市字与根326-6（LIME DETAILING STUDIO、現場3名：川武・末吉・金城） |
| 従業員 | 4名 |
| 連絡先 | 098-901-3817（LIME DETAILING STUDIO）※旧記載「098-0901-3817」は誤記（補助金申請控えで確認） |
| 認定 | IPA「SECURITY ACTION ★★ 二つ星」宣言事業者 |

### 3事業
1. **レンタカー**（主力・売上の約79%。損保案件の代車運用中心。スカイレンタリースと協定取引）→ サイト `https://lime-oki.net/`
2. **ディテーリング＆コーティング**（LIME DETAILING STUDIO、社長が最も伸ばしたい注力事業）→ `lp.html` へリンク
3. **中古車販売**（拡大フェーズ）

### ⚠️ 非掲載（社外秘）
売上・利益率などの内部財務（参考: 第8期売上60,479千円→第9期96,204千円、営業利益率7.2% 等）は**公開サイトに載せない**。

### 確定済み（2026-06-11 ローカルPCの公的書類で裏どり）
- 代表者の読み: **おおみね ひさし** ✓
- 設立: **2017年9月1日** ✓
- メール `h.omine@h-terrace.net`: 補助金の公式申請でも担当者メールとして使用実績あり（公開用として妥当）
- 出典: `Dropbox/ライム共有DB/システム一時保管/補助金/謄本.pdf`（履歴事項全部証明書・令和8年6月3日発行）/ `申請完了.pdf`（LoGoフォーム申請控え）
- 注: 登記上の商号は「株式会社Hari Terrace」（スペースあり）。サイト表記はユーザー指示によりブランド統一の **HariTerrace**（一語）のまま

---

## 4. デザインコンセプト（hari-terrace.html）

### 核：量子観測 × 社名の由来
- 社名の由来は諺 **「瑠璃も玻璃も照らせば光る」**（玻璃=ハリ=水晶、照らす=テラス）。
- **ただし諺の全文は露骨に表示しない**（ユーザー指示）。由来は「**玻璃を、照らす。**」という言葉遊びと水晶の情景描写でそれとなく示す。
- これを **量子力学の観測（照らす＝観測 → 光る＝波束の収縮）** と重ねている。
- 全インタラクションがこの一つの物理「観測されるまで確定しない」で貫かれている。

### 表記ルール
- ブランド名は **HariTerrace**（一語）で統一。巨大ヒーロータイポのみ design として `HARI` / `TERRACE` に分割表示。

### 配色：IWC ポルトギーゼ（白文字盤×コバルト針×ネイビー）
```
--paper:#F0EFE8   (シルバーホワイト文字盤＝地色)
--paper2:#E5E3D9
--ink:#14203B     (ディープネイビー＝テキスト/構造)
--verm:#1A4FA0    (コバルトブルー＝アクセント ※変数名はvermだが赤ではない)
--blue:#3570D8    (明るいブルー)
--steel:#A7ACB4   (スチールシルバー)
```
※ on-dark のハイライトは `#7FB2F0` / `#6E9BD6` などの明るいコバルトを直書きしている箇所あり。

### フォント（Google Fonts）
Anton（ディスプレイ）/ Archivo / Shippori Mincho（明朝）/ Zen Kaku Gothic New。

---

## 5. 実装済みの仕掛け（hari-terrace.html, 全て1ファイル・外部JS依存なし）

- **イントロ**: ホワイトノイズcanvas → スキャンライン（観測の走査）で実体化、`000→100`カウンター、タイトルがψ等の確率記号から収束。
- **量子確率場** `#qfield`（2D canvas）: 粒子が重ね合わせ（ぼやけた2重像）で漂い、カーソル/タッチ＝観測者が近づくと収束・発光・もつれ線で連結。無操作時はリサージュ軌道で自動巡回＋観測リング。
- **光反応3D水晶** `#crystal`（CSS 3D, 六角柱＋上下尖端）: カーソル/端末ジャイロ＝光源。照らした面だけがコバルトに輝く（`照らせば光る`の体現）。
- **測定面 `.mplane`**: 画面中央の計測ライン。`.reveal` 要素はブラー状態で漂い、測定面を横切ると収束（blur→sharp）、ラインが脈動。
- **観測ログHUD `.hud`**（左下）: OBS累計・COHERENCE%・観測者座標・崩壊イベントログをリアルタイム表示。
- **タップ＝崩壊** `.burst`: リング崩壊アニメ＋HUDにイベント記録。
- **タイトル量子スワップ**: HARI⇄玻璃 / TERRACE⇄照らす が確率的に入れ替わる（由来の言葉遊びを暗示）。
- **不確定性カーソル**: 速く動かすほど位置が滲んで拡大、止まると確定（PC）。
- **慣性スムーススクロール**（Lenis風, `#warp` を fixed + translate3d lerp, デスクトップのみ）＋速度スキュー。`reveal` 判定は rect ベースのチェッカーで両立。
- **マグネティックボタン**、**3Dチルト**（事業カード/CTAタイポ, 角度強め）、**bcardゴースト番号**。
- **モバイル**: バーガー → フルスクリーンメニュー（幕開き＋段差アニメ＋和英デュアルラベル）。
- **沖縄ライブクロック**（フッター）、カスタムスクロールバー、`<noscript>` フォールバック、`prefers-reduced-motion` 対応。

### セクション構成
`00 イントロ` → `Hero（水晶＋量子場）` → `marquee` → `01 About/理念` → `01.5 The Name/由来` → `02 Business/3事業` → `03 Company/会社概要` → `04 Contact/CTA` → `footer`

### 構造メモ
- `#warp` が全コンテンツのラッパ（スムーススクロールで transform される）。`<header>`, `#intro`, `.mplane`, `.hud`, カーソル, grain などは warp の外。
- `.reveal` に `data-scramble` を付けるとテキストスクランブル発火。
- JSはすべて末尾 `<script>` 内のIIFE群。編集後は `node -e "...new Function(script)..."` で構文チェックする習慣。

---

## 6. lp.html（LIME DETAILING 集客LP）概要
- 配色: 黒 `#0A0A0F` × ゴールド `#C9A84C` × ライム `#B8E986`（既存アプリ準拠）。
- 仕掛け: **磨いて入場**（くすみ膜をこすると本編が出る polish-to-enter）、巨大キネティックタイポ、追従カスタムカーソル、ドラッグ式Before/Afterスライダー、3D円筒フォトギャラリー、数字カウントアップ、視差オーブ、マグネティックCTA。
- 仮画像はUnsplash、仮動画はMixkit（差し替え前提）。
- hari-terrace の Business 02 からリンクされている。

---

## 7. 接続リソース（このプロジェクトで使えるMCP）
- **Googleドライブ**（owner: `h.omine@h-terrace.net`）… 会社情報の出典。**今も読める**。
- Gmail / Googleカレンダー / Figma / Canva / Exa(web_search/fetch) / GitHub。
- **Dropbox は接続されていない**。PC・Dropboxローカルのファイルには直接アクセス不可。
  → 必要資料は Googleドライブに置いてもらうか、内容を貼ってもらう運用。
  → ※ローカルPC（Claude Code）セッションならこの制約なし。Dropbox 内の謄本・申請書類等を直接読める（§10参照）。

### 主要DriveファイルID（参考）
- 経営分析引継ぎ(md): `1LrV9WhMPr0Um-OxUVjUK_YNwyDiu4xpC`（要 download_file_content、巨大なのでpython slice）
- 財務分析レポート(pdf): `1QKjnYTsSWC7ECocWOWB_s2U8Od8B59SF`（read_file_content可）
- Googleサイト「株式会社Hari Terrace」: `1IfMoymIkqvK8JJIUHnnCwnmgC52tg2wm`（mime=site, 本文読めず）
- 代車利用案内.xlsx / メンバー情報 … 沿革・スタッフ反映の素材候補（未読）

---

## 8. ユーザーの要望・好み（重要）
- 方向性: **前衛的・実験的**、**3Dを強く**、**量子的**、**Awwwards掲載レベル**を目指す。
- **ことわざは露骨に出さない**（全文表示NG。意味は匂わせる程度）。
- 表記は **HariTerrace**。
- スマホで確認することが多い → 公開URL＋`?v=N`で案内。短い日本語の指示が多く、実装→デプロイまで一気にやって結果URLを返す流れを好む。

---

## 9. 残タスク / 次の一手の候補
- [x] **代表者の読み・設立年月日・公開用メール** → 2026-06-11 ローカルPCの謄本・補助金申請控えで確定し hari-terrace.html に反映済み（電話番号誤記 098-0901→098-901 も修正）
- [x] **文言の全面磨き込み**（2026-06-11・ユーザー「文言がいまいち」を受けDropbox内経営資料を精査して書き直し）→ コピーの軸=**「走らせ、磨き、手渡す——一台の車の生涯に伴走する会社」**（レンタカー→ディテーリング→中古車販売が1台の循環で繋がる実業の構造を物語化）。事業説明は実態ベース（損保代車=非常時の足／中古車=自社運用1オーナー・記録完備）。The Name に「本社地名・玻名城にも玻の字」の事実を一行添えた。今後文言を触る時もこの軸と「盛りすぎない・短い断言・情景で語る」トーンを維持すること
- [x] **ユーザー指定の確定コピー反映**（2026-06-11 同日・ユーザー支給文言）→ ヒーロー=**「すべての車に、光を。すべての人に、価値を。」**／サブ=**「私たちは、車を磨く会社ではありません。人と車の可能性に光を当てる会社です。」**（この2つはユーザー確定文言・勝手に変えない）。**事業は4本**=レンタカー／ディテーリング／**電装品取付**(新規追加・法人中心)／中古車販売（.bizグリッド3列→2列の2×2）。**資本金は非表示**（会社概要から行削除・ユーザー指示）。サイト全体は**「細部に神は宿る」を体現**する方針（Statementに明記・フッターの GOD IS IN THE DETAILS と対）
- [ ] **独自ドメイン** `h-terrace.net` を GitHub Pages に向ける（CNAMEファイル＋DNS）。手順案内するとよい
- [ ] **OGP画像**（1200×630）を作って `og:image` 設定（SNSシェア用サムネ）
- [ ] **沿革 / メンバー / お客様の声 / アクセスマップ** セクション追加 → Drive `メンバー情報`・`代車利用案内` を読んで素材化
- [ ] lp.html / hari-terrace の **実写真・実動画** 差し替え
- [ ] パフォーマンス確認（量子場の粒子数・モバイル発熱）

---

## 10. クイックスタート（次セッションの最初の一歩）

### ローカルPC（Claude Code / Windows）で作業する場合 ← 2026-06-11 から推奨
リポジトリは Dropbox 配下に clone 済み:
```
C:\Users\homin\Dropbox\ライム共有DB\システム一時保管\detalia-mobile\
```
- main ブランチ直接編集 → commit → `git push origin main` → Pages 自動デプロイ
- このPCは Dropbox ローカルファイル（謄本・補助金申請書類・経営分析等）に直接アクセス可能
- GitHub push 認証はこのPCに保存済み（lime-mobile と同一アカウント）

### クラウドセッション（GitHub MCP）で作業する場合
```bash
cd /home/user/detalia-mobile
git checkout claude/original-homepage-design-5ncyft
git pull origin claude/original-homepage-design-5ncyft
# 公開中: https://homine-sudo.github.io/detalia-mobile/hari-terrace.html
```
編集 → コミット → main へマージ → push → Pages デプロイ確認、の順。
⚠️ ローカルとクラウドの並行作業は衝突注意。どちらかで作業したら必ず push し、もう一方は pull してから。
