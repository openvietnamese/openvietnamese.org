// UC San Diego Heritage Vietnamese courses — one folder each under src/ucsd/<code>/.
const courses = [
  { code: "114", name: "LIHL 114", level: "Beginning",    levelVi: "Sơ cấp" },
  { code: "124", name: "LIHL 124", level: "Intermediate", levelVi: "Trung cấp" },
  { code: "134", name: "LIHL 134", level: "Advanced",     levelVi: "Cao cấp" },
];
module.exports = { courses, byCode: Object.fromEntries(courses.map(c => [c.code, c])) };
