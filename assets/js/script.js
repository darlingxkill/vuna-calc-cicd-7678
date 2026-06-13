let LAST_RESULT = 0;
var currentExpression = "";

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    btn.innerHTML = "☀️";
    btn.title = "Switch to light mode";
    localStorage.setItem("theme", "dark");
  } else {
    btn.innerHTML = "🌙";
    btn.title = "Switch to dark mode";
    localStorage.setItem("theme", "light");
  }
}

window.addEventListener("DOMContentLoaded", function () {
  const theme = localStorage.getItem("theme");
  const body = document.body;
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      btn.innerHTML = "☀️";
      btn.title = "Switch to light mode";
    } else {
      btn.innerHTML = "🌙";
      btn.title = "Switch to dark mode";
    }
  }
});

function appendToResult(value) {
  currentExpression += value.toString();
  updateResult();
}

function backspace() {
  currentExpression = currentExpression.slice(0, -1);
  updateResult();
}

function operatorToResult(value) {
  currentExpression += value;
  updateResult();
}

function clearResult() {
  currentExpression = "";
  updateResult();
}

function appendPi() {
  currentExpression += "pi";
  updateResult();
}

function calculateExpression(expression) {
  try {
    let normalizedExpression = expression.replace(/\bans\b/gi, LAST_RESULT).replace(/\bpi\b/gi, "Math.PI");
    let result = eval(normalizedExpression);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }
    return result;
  } catch (e) {
    return "Error";
  }
}

function calculateResult() {
  if (!currentExpression) return;
  const display = document.getElementById("result");
  let result = calculateExpression(currentExpression);
  result = String(result);
  LAST_RESULT = result;
  display.value = result;
  currentExpression = result;
  updateResult();
}

function updateResult() {
  document.getElementById("result").value = currentExpression || "0";
}

document.addEventListener("keydown", function (e) {
  const key = e.key;
  if (key >= "0" && key <= "9") {
    appendToResult(key);
  } else if (key === ".") {
    appendToResult(".");
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    operatorToResult(key);
  } else if (key === "Enter" || key === "=") {
    e.preventDefault();
    calculateResult();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape" || key === "Delete") {
    clearResult();
  }
});
