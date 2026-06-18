const materials = [
{
name: "異界の毒",
rarity: "ディヴァイン",
weapon: "攻撃速度 20～25%",
armor: "最大HP 25～30%",
accessory: "クールダウン 13～14.5%"
},
{
name: "ミノタウロスの角",
rarity: "アルカナ",
weapon: "攻撃速度 13～15%",
armor: "最大HP 18～20%",
accessory: "クールダウン 8.5～10%"
},
{
name: "オパール",
rarity: "イモータル",
weapon: "攻撃速度 11～13%",
armor: "詠唱速度 15～20%",
accessory: "移動速度 12～14%"
}
];

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

    const matchEffect =
        effect === "" ||
        item[currentType].includes(effect);

    return matchName && matchEffect;
});

results.innerHTML = "";

filtered.forEach(item => {

    const div = document.createElement("div");

    div.className = "card";

    div.innerHTML = `
        <h3>${item.name}</h3>
        <p>レアリティ: ${item.rarity}</p>
        <p>${item[currentType]}</p>
    `;

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

render();
