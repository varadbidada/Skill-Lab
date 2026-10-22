let count = 0;
const counterEL = document.getElementById("counter");

document.getElementById("s1").addEventListener("click", function () {
  count++;
  counterEL.style.fontSize = "100px";
  counterEL.textContent = count;
});
document.getElementById("s2").addEventListener("click", function () {
  count--;
  counterEL.style.fontSize = "100px";
  counterEL.textContent = count;
});
document.getElementById("s3").addEventListener("click", function () {
  count = count + 10;
  counterEL.style.fontSize = "100px";
  counterEL.textContent = count;
});
document.getElementById("s4").addEventListener("click", function () {
  count = 0;
  counterEL.style.fontSize = "100px";
  counterEL.textContent = count;
});
