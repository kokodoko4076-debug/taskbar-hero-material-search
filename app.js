const materials = [
    {
        name: "異界の毒",
        rarity: "ディヴァイン",
        weapon: "攻撃速度 20～25%"
    },
    {
        name: "ミノタウロスの角",
        rarity: "アルカナ",
        weapon: "攻撃速度 13～15%"
    },
    {
        name: "オパール",
        rarity: "イモータル",
        weapon: "攻撃速度 11～13%"
    }
];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

function render(list){
    results.innerHTML = "";

    list.forEach(item => {
        const div = document.createElement("div");
        div.className = "card";

        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>レアリティ: ${item.rarity}</p>
            <p>${item.weapon}</p>
        `;

        results.appendChild(div);
    });
}

render(materials);

searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();

    const filtered = materials.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    render(filtered);
});
