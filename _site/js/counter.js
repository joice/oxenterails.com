var difference = (new Date("10/17/2010") - new Date()) / 1000;
document.getElementById("countdown").innerHTML = Math.floor(( difference < 0 ? 0 : difference ) / (60 * 60 * 24)) + 1;
