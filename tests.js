function testPermAloneSimple(permAloneFunc) {
  var result = true;
  result = result && (permAloneFunc("aaabcdef") == 14400);
  result = result && (permAloneFunc("aaaabcde") == 2880);
  result = result && (permAloneFunc("aaabbbcd") == 6624);
  result = result && (permAloneFunc("aaabbcd") == 1152);
  result = result && (permAloneFunc("aaabbcce") == 9216);
  return result;
}


function tests() {
  var result = "";
  var testsSpan = document.getElementById('tests');
  result += "permAlonePattern simple : " + testPermAloneSimple(permAlonePattern).toString() + "</br>";
  result += "permAloneBruteForce simple : " + testPermAloneSimple(permAloneBruteForce).toString() + "</br>";
  result += "permAloneBruteForce2 simple : " + testPermAloneSimple(permAloneBruteForce2).toString() + "</br>";
  result += "permAloneBruteForceOpti simple : " + testPermAloneSimple(permAloneBruteForceOpti).toString() + "</br>";
  testsSpan.innerHTML = result;
}
