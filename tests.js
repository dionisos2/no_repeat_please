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
  var permAlone;

  permAlone = permAlonePattern();
  result += "permAlonePattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneBruteForce();
  result += "permAloneBruteForce simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneBruteForce2();
  result += "permAloneBruteForce2 simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneBruteForceOpti();
  result += "permAloneBruteForceOpti simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";

  testsSpan.innerHTML = result;
}
