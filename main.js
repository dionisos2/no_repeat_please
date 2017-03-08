function testPermAlone(permAloneFunc) {
  result = true;
  result = result && (permAloneFunc("aaabcdef") == 14400);
  result = result && (permAloneFunc("aaaabcde") == 2880);
  result = result && (permAloneFunc("aaabbbcd") == 6624);
  result = result && (permAloneFunc("aaabbcd") == 1152);
  result = result && (permAloneFunc("aaabbcce") == 9216);
  return result;
}

function createPermTab () {
  var permTab = document.getElementById('permTab');
  var dim = 10;
  var i, i2;
  var htmlTab = "";

  htmlTab += "<table><caption>aaaaxxx</caption><hthead><tr><th>a\\t</th>";
  for (i = 1; i < dim; i++) {
    htmlTab += "<th>"+i.toString()+"</th>";
  }
  htmlTab += "</tr></thead>";

  for (i = 1; i < dim; i++) {
    htmlTab += "<tr><th>"+i+"</th>";
    for (i2 = 1; i2 < dim; i2++) {
      if (i <= i2) {
        htmlTab += "<td>perm("+i.toString()+","+i2.toString()+")</td>";
      } else {
        htmlTab += "0";
      }
    }
    htmlTab += "</tr>";
  }

  htmlTab += "</table>";
  permTab.innerHTML = htmlTab;
}

window.onload = function () {
  var resultSpan = document.getElementById('result');
  var result = '';
  createPermTab();

  result += "test permAlonePattern : " + testPermAlone(permAlonePattern).toString() + "<br/>";

  result += "permAlone('aabcde') = ";
  result += permAlonePattern('aabcde').toString();
  result += "<br/>";

  result += "permAlone('aaabcde') = ";
  result += permAlonePattern('aaabcde').toString();
  result += "<br/>";

  result += "permAlone('aaaabcde') = ";
  result += permAlonePattern('aaaabcde').toString();
  result += "<br/>";

  result += "permAlone('aaaabc') = ";
  result += permAlonePattern('aaaabc').toString();
  result += "<br/>";
  resultSpan.innerHTML = result;

  result += "permAlone('aabcdef') = ";
  result += permAlonePattern('aabcdef').toString();
  result += "<br/>";
  resultSpan.innerHTML = result;
};
