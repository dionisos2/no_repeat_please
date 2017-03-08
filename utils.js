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
      }
    }
    htmlTab += "</tr>";
  }

  htmlTab += "</table>";
  permTab.innerHTML = htmlTab;
}
