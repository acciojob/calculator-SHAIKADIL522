//your code here
const display = document.getElementById("input");
const BAD = ["Infinity", "-Infinity", "NaN", "Error"];

function resetIfBad() {
  if (BAD.includes(display.value)) display.value = "";
}

document.querySelectorAll(".num, .op").forEach((btn) => {
  btn.addEventListener("click", () => {
    resetIfBad();
    display.value += btn.dataset.v;
  });
});

document.getElementById("clr").addEventListener("click", () => {
  display.value = "";
});

document.getElementById("ans").addEventListener("click", () => {
  let expr = display.value.trim();
  if (!expr) return;

  // allow only digits, operators, dot
  if (!/^[0-9+\-*/.]+$/.test(expr)) {
    display.value = "Error";
    return;
  }

  // strip leading zeros: 007 -> 7 (keeps 0.5 and 1.05)
  expr = expr.replace(/(^|[^\d.])0+(\d)/g, "$1$2");

  try {
    const result = new Function("return " + expr)();
    display.value = String(result);
  } catch (e) {
    display.value = "Error";
  }
});