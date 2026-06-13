function calculateExpression(expression, lastResult) {
  try {
    let normalizedExpression = expression.replace(/\bans\b/gi, lastResult || 0).replace(/\bpi\b/gi, "Math.PI");
    let result = eval(normalizedExpression);
    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }
    return result;
  } catch (e) {
    return "Error";
  }
}

let passed = 0;
let failed = 0;

function assert(actual, expected, name) {
  if (actual === expected) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.log(`  ✗ ${name} — expected ${expected}, got ${actual}`);
  }
}

console.log("Calculator Unit Tests\n");

console.log("Basic arithmetic:");
assert(calculateExpression("2+3"), 5, "2 + 3 = 5");
assert(calculateExpression("10-4"), 6, "10 - 4 = 6");
assert(calculateExpression("3*4"), 12, "3 * 4 = 12");
assert(calculateExpression("15/3"), 5, "15 / 3 = 5");

console.log("\nOrder of operations:");
assert(calculateExpression("2+3*4"), 14, "2 + 3 * 4 = 14");
assert(calculateExpression("(2+3)*4"), 20, "(2 + 3) * 4 = 20");

console.log("\nDecimal operations:");
assert(calculateExpression("0.5+0.25"), 0.75, "0.5 + 0.25 = 0.75");
assert(calculateExpression("7.5/2.5"), 3, "7.5 / 2.5 = 3");

console.log("\nDivision by zero:");
assert(calculateExpression("1/0"), "Error", "1 / 0 = Error");

console.log("\nInvalid expressions:");
assert(calculateExpression("abc"), "Error", "abc = Error");

console.log("\nPi constant:");
assert(calculateExpression("pi"), Math.PI, "pi = Math.PI");
assert(calculateExpression("2*pi"), 2 * Math.PI, "2 * pi = " + 2 * Math.PI);

console.log("\nANS / last result memory:");
assert(calculateExpression("ans", 10), 10, "ans with lastResult=10 = 10");
assert(calculateExpression("ans+5", 10), 15, "ans + 5 with lastResult=10 = 15");

console.log(`\n${passed} passed, ${failed} failed\n`);

process.exit(failed > 0 ? 1 : 0);
