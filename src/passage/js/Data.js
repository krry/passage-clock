const data = {
    debug: true,
    abbrs: {
        "tick": "t",
        "second": "s",
        "minute": "m",
        "hour": "h",
        "day": "D",
        "week": "W",
        "month": "M",
        "year": "Y"
    },
    slices: [
        "tick",
        "second",
        "minute",
        "hour",
        "day",
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
