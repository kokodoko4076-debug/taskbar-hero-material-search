let materials = [];

fetch("materials.json")
.then(response => response.json())
.then(data => {
    materials = data;

    alert("件数：" + materials.length);

    render();
});

let currentType = "weapon";

const searchInput = document.getElementById("searchInput");
let selectedEffect = "";

const effectButtons =
document.querySelectorAll(".effect-btn");
const results = document.getElementById("results");
const tabs = document.querySelectorAll(".tab");

const ornamentCheck =
document.getElementById("ornamentCheck");

const engravingCheck =
document.getElementById("engravingCheck");

function render() {

console.log(
  "ornament:", ornamentCheck.checked,
  "engraving:", engravingCheck.checked
);

const keyword = searchInput.value.toLowerCase();
const effect = selectedEffect;

const filtered = materials.filter(item => {


const matchName =
  item.name.toLowerCase().includes(keyword);

const value =
  item[currentType] || "";

const matchEffect =
  effect === "" ||
  value.includes(effect);

  const matchType =
(
  ornamentCheck.checked &&
  item.type === "ornament"
)
||
(
  engravingCheck.checked &&
  item.type === "engraving"
);

console.log(
  item.name,
  item.type,
  matchType
);

return matchName &&
       matchEffect &&
       matchType;

});

results.innerHTML = "";

filtered.forEach(item => {

const row = document.createElement("tr");

row.innerHTML =

"<td>" +
"<img class='table-icon' src='" +
item.icon +
"'>" +
item.name +
"</td>" +

"<td class='" +
item.rarityClass +
"'>" +
item.rarity +
"</td>" +

"<td>" +
(item.type === "engraving"
? "刻印"
: "装飾") +
"</td>" +

"<td>" +
(
currentType === "weapon"
? "武器"
: currentType === "armor"
? "防具"
: "アクセ"
) +
"</td>" +

"<td>" +
(item[currentType] || "") +
"</td>";

results.appendChild(row);

});

document.getElementById("matchCount")
.textContent =
filtered.length + " MATCHES";

}

tabs.forEach(tab => {

tab.addEventListener("click", () => {


tabs.forEach(t =>
  t.classList.remove("active")
);

tab.classList.add("active");

currentType = tab.dataset.type;

render();


});

});

searchInput.addEventListener("input", render);
effectButtons.forEach(btn => {

btn.addEventListener("click", () => {

effectButtons.forEach(b =>
b.classList.remove("active")
);

btn.classList.add("active");

selectedEffect =
btn.dataset.effect;


render();

});

});

ornamentCheck.addEventListener(
  "change",
  render
);

engravingCheck.addEventListener(
  "change",
  render
);
