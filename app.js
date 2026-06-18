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

const div = document.createElement("div");

div.className =
  "card " +
  item.rarityClass;

div.innerHTML =
  "<div class='item-header'>" +

    "<img class='item-icon' src='" +
    item.icon +
    "'>" +

    "<div class='title-area'>" +

      "<div class='title-row'>" +

        "<h3>" +
        item.name +
        "</h3>" +

        "<span class='rarity-badge " +
        item.rarityClass +
        "'>" +
        item.rarity +
        "</span>" +

      "</div>" +

      "<p class='item-effect'>" +
      (item[currentType] || "") +
      "</p>" +

    "</div>" +

  "</div>";

results.appendChild(div);

});

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
