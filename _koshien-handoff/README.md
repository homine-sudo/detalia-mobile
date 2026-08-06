# 甲子園アプリ（pb-koshien）の修正 ── 受け渡し用

> **このフォルダは HariTerrace / LIME のサイトとは無関係です。**
> 中身は別リポジトリ `homine-sudo/pb-koshien` に当てるパッチの置き場所。
> 当て終わったらフォルダごと消してかまいません。

## なぜここに置いてあるか

修正は `pb-koshien` に push するつもりだったが、
**このセッションの GitHub App に `pb-koshien` が入っていない**ため書き込みが 403 で通らなかった。
（読み取りが通っていたのはリポジトリが public だから。権限があったわけではない）

作業していたコンテナは時間が経つと消えるので、成果物が失われないようここに置いた。

## 当て方

```bash
git clone https://github.com/homine-sudo/pb-koshien
cd pb-koshien
git checkout -b claude/koshien-app-results-tournament-6bxzes
git am /path/to/pb-koshien-fix.patch
git push -u origin claude/koshien-app-results-tournament-6bxzes
```

`main` にマージして push すれば GitHub Pages に1〜2分で反映される。
当てたあとに `node _test_tally.js` `_test_autoimport.js` `_test_fetch.js` `_test_bracket.js`
を通すこと（4本で107件。まっさらな clone に当てて全部通ることは確認ずみ）。

## 入っているもの（5コミット）

1. **試合結果が消える不具合の修正**（いちばん大事）
   スポーツナビは試合中・試合直後だけ `<li>` に要素を足す。最初の `</li>` で切っていたので
   校名が読めず、その試合を黙って捨てていた。毎回ゼロから書き直す作りだったので、
   **一度取れた結果まで消えていた**。8/6 は第1試合と第2試合が交互に消え、
   佐野日大 vs 聖隷クリストファーが丸ごと落ちて 48試合 → 47試合になっていた。
   → 前回ぶんと id で合体（空で上書きしない）／閉じタグで切らない／試合数を毎回検算。
2. **8/6 第2試合の結果を反映**（聖隷クリストファー 0-1 佐野日大）
   これで順位が動く：むら 1位（119P）、大良は 1位 → 6位（108P）。
3. **対戦表を日付順に**。試合番号だけで並べていたので日付がばらばらだった。
4. **予想表の「うすい」表示を修正**。差が小さい校を校名ごと薄くしていたため、
   勝ち残りの横浜（差5）・神村学園（差6）が敗退校と同じ見た目になっていた。
5. **トーナメント表を枝分かれ図にした**（Yahoo と同じ形）。
   抽選で決まった1〜3回戦の枝を `data/bracket.json` に起こした。
   出どころは阪神甲子園球場の公式表
   <https://koshien.hanshin.co.jp/highschool/summer2026/tournament.html>
   （スポーツナビの `tournament/detail` は JS で描いていて HTML からは読めない）。

## この置き場所を消すには

`pb-koshien` に当てて push したあと：

```bash
git rm -r _koshien-handoff && git commit -m "受け渡し用フォルダを削除" && git push
```
