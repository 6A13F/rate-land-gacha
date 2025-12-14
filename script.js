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
