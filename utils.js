function fact(num) {
  var fact = 1;
  for(var i=2; i<=num; i++) {
    fact *= i;
  }
  return fact;
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
        htmlTab += "<td>p("+i.toString()+","+i2.toString()+")=" + (p(i,i2)).toString() + " c=" + ((fact(i2)-p(i,i2))).toString() +"</td>";
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
  var permAlone = permAlonePattern();
  return permAlone(mul('a',nba)+allDiff('b',nbx));
}


function perm(arr, start, stop, perms) {
	var i;
	var newPerm = [];

	// helper to swap array elements to the first position
	var swap = function(arr, start, i) {
	  var temp = arr[start];
	  arr[start] = arr[i];
	  arr[i] = temp;
	  return arr;
	};

	// if we got to the end, this is a new permutation
	if (start === stop) {
	  for (i = 0; i< arr.length; i++) {
	    newPerm.push(arr[i]);
	  }
	  perms.push(newPerm.join(''));
	  // else, swap the next letter into the first spot
	} else {
	  for (i = start; i < stop; i++) {
	    arr = swap(arr, start, i);
	    perm(arr, start+1, stop, perms);
	    arr = swap(arr, start, i);
	  }
	}
}

function permRegexp(str, regexp) {
	var perms = [];
	var arr = str.split('');

	perm(arr, 0, arr.length, perms);

	return perms.filter(function(perm) {
	  return perm.match(regexp);
	}).length;
}

