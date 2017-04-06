function testPermAloneSimple(permAloneFunc) {
  var result = true;
  result = result && (permAloneFunc("aaabcdef") == 14400);
  result = result && (permAloneFunc("aaaabcde") == 2880);
  result = result && (permAloneFunc("aaabbbcd") == 6624);
  result = result && (permAloneFunc("aaabbcd") == 1152);
  result = result && (permAloneFunc("aaabbcce") == 9216);
  return result;
}

function testPermAloneComplex(permAloneFunc) {
  var result = true;
  result = result && (permAloneFunc("aaaaaaacdefgh") == 3628800);
  result = result && (permAloneFunc("aaaabbbcccde") == 46344960);
  result = result && (permAloneFunc("aaabbcccddefg") == 1593043200);
  return result;
}


function tests() {
  var result = "";
  var testsSpan = document.getElementById('tests');
  var permAlone;
  // permAlone = permAloneBruteForce();
  // result += "permAloneBruteForce simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  // permAlone = permAloneBruteForce2();
  // result += "permAloneBruteForce2 simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  // permAlone = permAloneBruteForceOpti();
  // result += "permAloneBruteForceOpti simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  // permAlone = permAlonePattern();
  // result += "permAlonePattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti simple : " + testPermAloneSimple(permAlone).toString() + "</br>";

  // permAlone = permAlonePattern();
  // result += "permAlonePattern complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  result += "</br></br>";

  testsSpan.innerHTML = result;
}
