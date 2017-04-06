
window.onload = function () {
  var permAlone;
  // tests();
  benchmarks();
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

  resultSpan.innerHTML = result;
};
