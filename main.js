
window.onload = function () {
  var permAlone;
  // tests();
  // benchmarks();
  createPermTab();

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

  result += permRegexp("aaabbbcdef", /([^a]aa([^a].*bb|bb))|(^aa([^a].*bb|bb))/g);
  result += "<br/>";

  permAlone = permAlonePattern();
  // permAlone = permAloneBruteForceOpti();
  result += "permAlonePattern('aaabbbcdef') : " + permAlone("aaabbbcdef").toString() + "</br>";
  result += "permAlonePattern('aaabcdefgh') : " + permAlone("aaabcdefgh").toString() + "</br>";

  permAlone = permAlonePattern();
  result += "permAlonePattern('aaaaaabbbbbxxxxx') : " + permAlone("aaaaaabbbbbcdefg").toString() + "</br>";
  result += "permAlonePattern('aaaaaaxxxxxxxxxx') : " + permAlone("aaaaaabcdefghijk").toString() + "</br>";
  result += "permAlonePattern('aaaaaxxxxxxxxxxx') : " + permAlone("aaaaabcdefghijkl").toString() + "</br>";
  resultSpan.innerHTML = result;
};
