const data = {
    debug: true,
    abbrs: {
        "tick": "t",
        "second": "s",
        "minute": "m",
        "hour": "h",
        "date": "D",
        "week": "W",
        "month": "M",
        "year": "Y"
    },
    slices: [
        "tick",
        "second",
        "minute",
        "hour",
        "date",
        "week",
        "month",
        "year"
    ],
    monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
  glyphs: [
    // { name: "joker", unicode: "\u1f0df" },
    // { name: "ace_of_spades", unicode: "\u1f0a1" },
    // { name: "nine_of_diamonds", unicode: "\u1f0c9" },
    // { name: "ten_of_hearts", unicode: "\u1f0ba" },
    // { name: "jack_of_spades", unicode: "\u1f0ab" },
    // { name: "queen_of_hearts", unicode: "\u1f0bd" },
    // { name: "king_of_clubs", unicode: "\u1f0de" },
    // { name: "seven_of_diamonds", unicode: "\u1f0c7" },
    // { name: "eight_of_clubs", unicode: "\u1f0d8" },
    // { name: "six_of_hearts", unicode: "\u1f0b6" },
    // { name: "domino_zero_zero", unicode: "\u1f063" },
    // { name: "domino_one_one", unicode: "\u1f06b" },
    // { name: "domino_one_two", unicode: "\u1f06c" },
    // { name: "domino_three_two", unicode: "\u1f07a" },
    // { name: "domino_four_two", unicode: "\u1f081" },
    // { name: "domino_five_three", unicode: "\u1f089" },
    // { name: "domino_six_six", unicode: "\u1f093" },
    // { name: "domino_three_four", unicode: "\u1f07c" },
    // { name: "domino_four_four", unicode: "\u1f083" },
    // { name: "domino_three_six", unicode: "\u1f07e" },
    { name: "cross_maltese", unicode: "\u2720" },
    { name: "ankh", unicode: "\u2625" },
    { name: "cross_latin", unicode: "\u271f" },
    { name: "staff_of_aesculapius", unicode: "\u2695" },
    { name: "staff_of_hermes", unicode: "\u269a" },
    { name: "yin_yang", unicode: "\u262f" },
    { name: "caduceus", unicode: "\u2624" },
    { name: "hammer_sickle", unicode: "\u262d" },
    { name: "trinder", unicode: "\u26a7" },
    { name: "adi_shakti", unicode: "\u262c" },
    { name: "spade_open", unicode: "\u2664" },
    { name: "club_open", unicode: "\u2667" },
    { name: "heart_open", unicode: "\u2661" },
    { name: "diamond_open", unicode: "\u2662" },
    { name: "chess_king_open", unicode: "\u2654" },
    { name: "chess_queen_open", unicode: "\u2655" },
    { name: "chess_rook_open", unicode: "\u2656" },
    { name: "chess_bishop_open", unicode: "\u2657" },
    { name: "chess_knight_open", unicode: "\u2658" },
    { name: "chess_pawn_open", unicode: "\u2659" },
    // { name: "aries", unicode: "\u2648" },
    // { name: "taurus", unicode: "\u2649" },
    // { name: "gemini", unicode: "\u264a" },
    // { name: "cancer", unicode: "\u264b" },
    // { name: "leo", unicode: "\u264c" },
    // { name: "aquarius", unicode: "\u2652" },
    // { name: "libra", unicode: "\u264e" },
    // { name: "scorpio", unicode: "\u264f" },
    // { name: "pisces", unicode: "\u2653" },
    // { name: "capricorn", unicode: "\u2651" },
    { name: "one", unicode: "\u0031" },
    { name: "two", unicode: "\u0032" },
    { name: "three", unicode: "\u0033" },
    { name: "four", unicode: "\u0034" },
    { name: "five", unicode: "\u0035" },
    { name: "six", unicode: "\u0036" },
    { name: "seven", unicode: "\u0037" },
    { name: "eight", unicode: "\u0038" },
    { name: "nine", unicode: "\u0039" },
    { name: "zero", unicode: "\u0030" },
    { name: "sun", unicode: "\u2609" },
    { name: "mercury", unicode: "\u263f" },
    { name: "venus", unicode: "\u2640" },
    { name: "earth", unicode: "\u2641" },
    { name: "mars", unicode: "\u2642" },
    { name: "jupiter", unicode: "\u2643" },
    { name: "saturn", unicode: "\u2644" },
    { name: "uranus", unicode: "\u2645" },
    { name: "neptune", unicode: "\u2646" },
    { name: "pluto", unicode: "\u2647" },
  ]
};

function get(req) {
    if (data[req] !== null) return data[req];
}

function set(key, value) {
    if (data[key] === null) data[key] = value
    else data[key] = value
}

export default {
    get: get,
    set: set
}
