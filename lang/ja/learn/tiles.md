# 0-0

## タイル

初代『スーパーマリオブラザーズ』のディレクター宮本茂と、同作でステージ設計を手掛けた手塚卓志は、[方眼紙に手書きでステージをレイアウトし](https://www.youtube.com/watch?v=Ie_qqu07iMk&t=169s)、それをプログラマーチームに渡して、ゲーム内のすべてのスプライトの座標を手打ち入力してもらっていたそうです。途方もない苦労をしていたんですね！

幸いなことに、 p5play では `Tiles` のコンストラクタによって、文字列中のタイル文字の位置に応じて、スプライトを生成することができます！

第 1 引数は、改行のある文字列、または文字列の配列です。文字の改行、または配列の各要素によって、タイルの行を表現します。

第 2 、第 3 引数は、左上（ 1 枚目）のタイルの x, y 座標の指定です。第 4 、第 5 引数は、各タイル間の横方向とと縦方向の間隔の指定です。

このコンストラクタが返すのは、生成したすべてのスプライトを含む `Group` です。ステージのリセットや、次のステージをロードする前に、いちどスプライトをすべて破棄するには、 `group.removeAll()` を使います。

## やってみよう！

"P5" ブロックのレイアウトを編集してみてください。

スペース " " またはピリオド "." は、タイルグリッド上の対応する位置にはスプライトを作成しないことに注意してください。このコードサンプルでは、 "=" 文字は `bricks` に使用されます。
