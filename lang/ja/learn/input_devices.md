# 0-0

## 入力デバイス

p5play で利用可能な入力デバイスは次のとおりです:

- `kb`または`keyboard`はキーボード
- `mouse`はマウス
- `contro`または`controllers`はゲームコントローラー

これらの入力デバイスはすべて、入力の状態を取得するためのシンプルな関数、`presses`、`pressing`、`released`を使用します。

また、彼らの全ての入力の状態をプロパティとして保存します。例えば、`kb.space`はユーザーがスペースキーを押し続けているフレーム数を保存します。ユーザーが入力を解放するとリセットされます。

# 0-1

p5play は、[ブール論理](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR)を使用して、異なる入力デバイスを介して同じアクションをトリガーすることを容易にします。

ミニ例では、スプライトはスペースキーを押すかマウスをクリックすると赤くなります。

# 1-0

## キーボード

`kb` は、'enter'、'backspace'、'control' を含む、キーボードのほぼすべてのキーを追跡します。

大文字と小文字の文字入力は区別しません。ユーザーがシフトキーを押しているかどうかを確認するには、`kb.pressing('shift')` を使用してください。

WASD キーはプレイヤーキャラクターの移動を制御するためによく使用されるため、WASD および矢印キーの押下を検出するために 'up'、'down'、'left'、'right' の方向名を使用できます。

矢印キーは、'arrowUp'、'arrowDown'、'arrowLeft'、'arrowRight' を使用して個別に検出することもできます。

ローカルの二人用ゲームでは、第二のプレイヤーが移動に IJKL キーを使用することが一般的です。これらのキーは 'up2'、'down2'、'left2'、'right2' を使用して参照できます。

[QWERTY 以外のキーボードを使用していますか？](https://github.com/quinton-ashley/p5play/wiki/FAQ#is-p5plays-kb-input-system-compatible-with-non-qwerty-keyboards)

# 2-0

## マウス

デフォルトのマウス入力は「left」ボタンで、トラックパッドでの単一指のクリックです。また、'right'（二本指クリック）と 'center' も使用できます。

`mouse.x` と `mouse.y` はマウスのキャンバス上の位置を格納します。

`mouse.visible` は、マウスが表示されるかどうかを決定するブール値です。

`mouse.cursor` は [カーソルスタイル](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) に設定できます。デフォルトは 'default' で、他のオプションには 'grab'、'move'、'pointer'、'wait' などがあります。

# 3-0

## スプライトマウス

物理的なコライダーを持つスプライトは、スプライト上のマウス入力を検出するための自身のマウスオブジェクトを持っています。
`sprite.mouse`オブジェクトは、`mouse`入力オブジェクトと同様ですが、追加の機能があります。

`hovers`と`hovering`は、ユーザーがマウスをスプライト上に移動したときに検出します。

`dragging`は、ユーザーがマウスボタンをクリックし続けてマウスを移動するときに検出します。
`mouse.x`はキャンバス上のマウスの x 位置であり、`sprite.mouse.x`はスプライトに対するマウスの x 位置です。

# 4-0

## ゲームコントローラー

`contro`または`controllers`オブジェクトは、ゲームコントローラーのボタンの入力状態を提供します：

"a", "b", "x", "y", "l" (左バンパー), "r" (右バンパー), "lt" (左トリガー), "rt" (右トリガー), "up", "down", "left", "right" (dpad), "start", "select"

また、アナログスティックの`x`および`y`軸の位置も提供します：`leftStick`および`rightStick`。軸の値は-1 から 1 の範囲で、0 は中央です。

`contro`オブジェクトはまた、Web ブラウザによって検出されたすべての接続されたゲームコントローラーを含む配列でもあります。接続されたコントローラーはインデックスでアクセスします。例えば、`contro[0]`と`contro[1]`は最初と 2 番目のコントローラーです。デフォルトでは`contro`は`contro[0]`を参照します。

試してみてください！接続されたゲームコントローラーの任意のボタンを押すと、p5play によって検出されます。

# 5-0

## タッチ

例は近日公開予定です！
