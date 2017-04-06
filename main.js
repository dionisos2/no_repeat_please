
window.onload = function () {
  var permAlone;
  tests();
  benchmarks();
  // factBenchmark();
  // createPermTab();

  var result = "";
  var resultSpan = document.getElementById('result');

  result = "<br/>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti('aaaaabbbbbbccccddeeeefghij') : " + myToFixed(permAlone("aaaaabbbbbbccccddeeeefghij")) + "</br>";
  resultSpan.innerHTML = result.toString();
};
