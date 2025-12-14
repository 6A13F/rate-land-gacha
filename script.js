let pool;

fetch("data/generals.json")
  .then(res => res.json())
  .then(data => pool = data);

function randomPick(list) {
  const r = Math.random();
  let sum = 0;
  for (const item of list) {
    sum += item.rate;
    if (r <= sum) return item.name;
  }
  return list[list.length - 1].name;
}

function drawOnce() {
  const r = Math.random();
  let result;

  if (r < 0.06) {
    result = "SSR：" + randomPick(pool.SSR);
  } else if (r < 0.22) {
    result = "SR：" + randomPick(pool.SR);
  } else {
    result = "R：" + randomPick(pool.R);
  }

  document.getElementById("result").innerHTML =
    `<p>${result}</p >`;
}

function drawTen() {
  let html = "";
  for (let i = 0; i < 10; i++) {
    drawOnce();
  }
}
function render(results) {
  const box = document.getElementById("result");
  box.innerHTML = ""; // 清空之前的结果

  results.forEach(r => {
    const div = document.createElement("div");
    div.className = `card ${r.star}`;
    div.innerHTML = `
      <span class="star">${r.star}</span>
      <span class="name">${r.name}</span>
    `;
    box.appendChild(div);
  });

  const stat = document.createElement("div");
  stat.className = "stat";
  stat.innerText = `总招募：${totalDraw} 次 ｜ SSR：${ssrCount} 次`;
  box.appendChild(stat);
}
