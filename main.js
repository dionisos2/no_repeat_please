
window.onload = function () {
  // tests();
  // benchmarks();
  createPermTab();

  var result = "";
  var resultSpan = document.getElementById('result');
  result += "aaaxxxx : " + permAloneSuperPattern("aaaxxxx").toString() + "</br>";
  resultSpan.innerHTML = result;
  permAloneSuperPattern("aaaxxxx");
};
