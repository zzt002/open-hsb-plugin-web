// alert(navigator.userAgent.toLocaleLowerCase())
let can = document.createElement("canvas");
can.id = "canvas";
can.style.position="fixed";
can.style.left="0";
can.style.top="0";
can.style.zIndex="-1";
can.style.opacity="1";
document.body.appendChild(can);

let width = document.getElementById("canvas").width = screen.width;
let height = document.getElementById("canvas").height = screen.height;
let ctx = document.getElementById("canvas").getContext("2d");
let arr = Array(Math.ceil(width / 10)).fill(0);
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split("");

function rain() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#0f0";
  arr.forEach(function (value, index) {
    ctx.fillText(str[Math.floor(Math.random() * str.length)], index * 10, value + 10);
    arr[index] = value >= height || value > 8888 * Math.random() ? 0 : value + 10;
  });
}

function rainy() {
  setInterval(rain, 30);
}

export {
  rainy
}
