let materials = [];

fetch("materials.json")
.then(response => response.json())
.then(data => {
materials = data;
render();
});

let currentType = "weapon";

const searchInput = document.getElementById("searchInput");
const effectSelect = document.getElementById("effectSelect");
const results = document.getElementById("results");
const tabs = document.querySelectorAll(".tab");

function render() {

const keyword = searchInput.value.toLowerCase();
const effect = effectSelect.value;

const filtered = materials.filter(item => {


const matchName =
  item.name.toLowerCase().includes(keyword);

const value =
  item[currentType] || "";

const matchEffect =
  effect === "" ||
  value.includes(effect);

return matchName && matchEffect;


});

results.innerHTML = "";

filtered.forEach(item => {


const div = document.createElement("div");

div.className = "card";

div.innerHTML =
  "<h3>" + item.name + "</h3>" +
  "<p>レアリティ: " + item.rarity + "</p>" +
  "<p>" + (item[currentType] || "") + "</p>";

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
effectSelect.addEventListener("change", render);
