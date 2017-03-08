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
        htmlTab += "<td>p("+i.toString()+","+i2.toString()+")=" + p(i,i2) + "</td>";
      } else {
        htmlTab += "<td>0</td>";
      }
    }
    htmlTab += "</tr>";
  }

  htmlTab += "</table>";
  permTab.innerHTML = htmlTab;
}

function mul(str,num) {
  var result = '';
  for(var i=0; i<num; i++) {
    result += str;
  }
  return result;
}

function allDiff(str, num) {
  var result = '';
  for(var i=0; i<num; i++) {
    result += str;
    str = String.fromCharCode(str.charCodeAt(0) + 1);
  }
  return result;
}

function p(nba,nbt) {
  var nbx = nbt - nba;
  return permAlonePattern(mul('a',nba)+allDiff('b',nbx));
}
