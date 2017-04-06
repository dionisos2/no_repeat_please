
window.onload = function () {
  var permAlone;
  tests();
  benchmarks();
  // factBenchmark();
  // createPermTab();

  var result = "";
  var resultSpan = document.getElementById('result');

  result = "<br/>";

  // result += permRegexp("aaaaaaxxx", /aaaaaa/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaaaax+a/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaaax+aa/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaaax+ax+a/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaax+aaa/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaax+aax+a/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aaax+ax+ax+a/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aax+aax+aa/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aax+aax+ax+a/g);
  // result += "<br/>";
  // result += permRegexp("aaaaaaxxx", /aax+ax+ax+ax+a/g);

  // var tab = [];
  // var currentCache = null;
  // tab[10] = [];
  // currentCache = tab[10];
  // currentCache[5] = [];
  // currentCache = currentCache[5];
  // currentCache[2] = 20;
  // currentCache[200] = 7;
  // currentCache = currentCache[2];
  // currentCache = 8;
  // result += tab[10][5][2];
  // result += tab[10][5][200];

  permAlone = permAloneSuperPattern();
  result += "permAloneSuperPattern('aaabbcd') : " + permAlone("aaabbcd") + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "permAloneSuperPatternOpti('aaabbcd') : " + permAlone("aaabbcd") + "</br>";
  resultSpan.innerHTML = result;
};
