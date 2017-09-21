


function tests() {

  permAlone = permAloneBruteForce2();
  result += "permAloneBruteForce2 simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneBruteForceOpti();
  result += "permAloneBruteForceOpti simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAlonePattern();
  result += "permAlonePattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneProgheal();
  result += "permAloneProgheal simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAloneDavidF25();
  result += "permAloneDavidF25 simple : " + testPermAloneSimple(permAlone).toString() + "</br>";

  permAlone = permAloneAlbinutte();
  result += "albinute simple : " + testPermAloneSimple(permAlone).toString() + "</br>";
  permAlone = permAlonePattern();
  result += "permAlonePattern complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneAlbinutte();
  result += "permAloneAlbinutte complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneProgheal();
  result += "permAloneProgheal complex : " + testPermAloneComplex(permAlone).toString() + "</br>";
  permAlone = permAloneDavidF25();
  result += "permAloneDavidF25 complex : " + testPermAloneComplex(permAlone).toString() + "</br>";

  result += "</br></br>";

  testsSpan.innerHTML = result;
}
