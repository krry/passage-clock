import Data from './Data';
const GLYPHS = Data.get('glyphs');

function numbToGlyph(numb, mode) {
  if (mode === "planer") {
    return planeSwitch(numb);
  } else if (mode === "zodiac") {
    return zodiacSwitch(numb);
  } else if (mode === "none") {
    return numb;
  } else if (mode === "games") {
    return gameSwitch(numb);
  } else if (mode === "holy") {
    return holySwitch(numb);
  } else if (mode === "rando") {
    return randoMash(numb);
  } else if (mode === "cards") {
    return cardSwitch(numb);
  } else if (mode === "domino") {
    return dominoSwitch(numb);
  } else {
    return numb;
  }
}

function randoMash(numb) {
  let chars = "";
  // append three random chars from the pot
  for (let i = 0; i < numb.length; i++) {
    let x = Math.floor(Math.random() * GLYPHS.length);
    chars += GLYPHS[x].unicode;
  }
  return chars;
}

function cardSwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u1f0df"; // 🃟
        break;
      case "1":
        chars += "\u1f0a1"; // 🂡
        break;
      case "2":
        chars += "\u1f0c9"; // 🃉
        break;
      case "3":
        chars += "\u1f0ba"; // 🂺
        break;
      case "4":
        chars += "\u1f0ab"; // 🂫
        break;
      case "5":
        chars += "\u1f0bd"; // 🂽
        break;
      case "6":
        chars += "\u1f0de"; // 🃞
        break;
      case "7":
        chars += "\u1f0c7"; // 🃇
        break;
      case "8":
        chars += "\u1f0d8"; // 🃘
        break;
      case "9":
        chars += "\u1f0b6"; // 🂶
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

function dominoSwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u1f063"; // 🁣
        break;
      case "1":
        chars += "\u1f06b"; // 🁫
        break;
      case "2":
        chars += "\u1f06c"; // 🁬
        break;
      case "3":
        chars += "\u1f07a"; // 🁺
        break;
      case "4":
        chars += "\u1f081"; // 🂁
        break;
      case "5":
        chars += "\u1f089"; // 🂉
        break;
      case "6":
        chars += "\u1f093"; // 🂓
        break;
      case "7":
        chars += "\u1f07c"; // 🁼
        break;
      case "8":
        chars += "\u1f083"; // 🂃
        break;
      case "9":
        chars += "\u1f07e"; // 🁾
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

function holySwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u2720"; // ✠
        break;
      case "1":
        chars += "\u2625"; // ☥
        break;
      case "2":
        chars += "\u271f"; // ✟
        break;
      case "3":
        chars += "\u2695"; // ⚕︎
        break;
      case "4":
        chars += "\u269a"; // ⚚
        break;
      case "5":
        chars += "\u262f"; // ☯︎
        break;
      case "6":
        chars += "\u2624"; // ☤
        break;
      case "7":
        chars += "\u262d"; // ☭
        // chars += "\u2626"; // ☦︎
        break;
      case "8":
        chars += "\u262c"; // ☬
        break;
      case "9":
        chars += "\u2627"; // ☧
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

function gameSwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u2664"; // ♤
        break;
      case "1":
        chars += "\u2667"; // ♧
        break;
      case "2":
        chars += "\u2661"; // ♡
        break;
      case "3":
        chars += "\u2662"; // ♢
        break;
      case "4":
        chars += "\u2654"; // ♔
        break;
      case "5":
        chars += "\u2655"; // ♕
        break;
      case "6":
        chars += "\u2656"; // ♖
        break;
      case "7":
        chars += "\u2657"; // ♗
        break;
      case "8":
        chars += "\u2658"; // ♘
        break;
      case "9":
        chars += "\u2659"; // ♙
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

function zodiacSwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u2648"; // ♈︎
        break;
      case "1":
        chars += "\u2649"; // ♉︎
        break;
      case "2":
        chars += "\u264a"; // ♊︎
        break;
      case "3":
        chars += "\u264b"; // ♋︎
        break;
      case "4":
        chars += "\u264c"; // ♌︎
        break;
      case "5":
        chars += "\u2652"; // ♒︎
        break;
      case "6":
        chars += "\u264e"; // ♎︎
        break;
      case "7":
        chars += "\u264f"; // ♏︎
        break;
      case "8":
        chars += "\u2653"; // ♓︎
        break;
      case "9":
        chars += "\u2651"; // ♑︎
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

function planeSwitch(numb) {
  let chars = "";
  for (let char of numb.split("")) {
    switch (char) {
      case "0":
        chars += "\u2609"; // ☉
        break;
      case "1":
        chars += "\u263f"; // ☿
        break;
      case "2":
        chars += "\u2640"; // ♀︎
        break;
      case "3":
        chars += "\u2641"; // ♁
        break;
      case "4":
        chars += "\u2642"; // ♂︎
        break;
      case "5":
        chars += "\u2643"; // ♃
        break;
      case "6":
        chars += "\u2644"; // ♄
        break;
      case "7":
        chars += "\u2645"; // ♅
        break;
      case "8":
        chars += "\u2646"; // ♆
        break;
      case "9":
        chars += "\u2647"; // ♇
        break;
      default:
        chars += char;
    }
  }
  return chars;
}

export default {
  numbTo: numbToGlyph
};
