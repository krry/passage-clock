function numbToGlyph(numb) {
  let glyph = "";
  for (let char of numb.split('')) {
    switch(char) {
      case "0":
        glyph += "\u2609";
        break;
      case "1":
        glyph += "\u263f";
        break;
      case "2":
        glyph += "\u2640";
        break;
      case "3":
        glyph += "\u2641";
        break;
      case "4":
        glyph += "\u2642";
        break;
      case "5":
        glyph += "\u2643";
        break;
      case "6":
        glyph += "\u2644";
        break;
      case "7":
        glyph += "\u2645";
        break;
      case "8":
        glyph += "\u2646";
        break;
      case "9":
        glyph += "\u2647";
        break;
      default:
        glyph += char;
    }
  }
  return glyph;
}

export default {
  numbTo: numbToGlyph
}
