function initCachers(emt) {
  emt.on("filter", save);
  emt.on("arrow", save);
  emt.on("flux", save);
  emt.on("slices", save);
  emt.on("ctrls", save);
}

function save(prop, val) {
  localStorage.setItem(prop, val);
}

function load(prop) {
  return localStorage.getItem(prop) || "";
}

export default {
  load,
  save,
  init: initCachers
}
