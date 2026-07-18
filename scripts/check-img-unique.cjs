const fs = require("fs");
const s = fs.readFileSync("src/data/products.ts", "utf8");
const imgs = [];
const re = /id: "(p\d+)"[\s\S]*?image: img\((\d+)\)/g;
let m;
while ((m = re.exec(s))) imgs.push({ id: m[1], img: m[2] });
const byImg = {};
for (const x of imgs) {
  (byImg[x.img] = byImg[x.img] || []).push(x.id);
}
const dups = Object.entries(byImg).filter(([, v]) => v.length > 1);
console.log("count", imgs.length);
console.log("dups", JSON.stringify(dups));
console.log(imgs.map((x) => x.id + ":" + x.img).join(" "));
