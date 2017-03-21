
window.onload = function () {
  tests();
  benchmarks();
  createPermTab();
  var permAlone = permAloneSuperPattern();
  var result = "";
  var resultSpan = document.getElementById('result');

  result += "aaaxxxx : " + permAlone("aaaxxxx").toString() + "</br>";
  resultSpan.innerHTML = result;
  permAloneSuperPattern("aaaxxxx");
};
