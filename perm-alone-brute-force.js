function permAloneBruteForce () {

  function pT(p,o){
    var re=/(.)\1/;
    if(o.length > 0){
      var sum=0;
      for(var i=0;i<p.length+1;i++){
        var tail = p.slice(0,i).concat(o[0]).concat(p.slice(i));
        sum += pT(tail,o.slice(1));
      }
      return sum;
    } else {
      return !re.test(p.join(''));
    }
  }

  function permAlone(str) {
    return pT([],str.split(''));
  }

  return permAlone;
}

function permAloneBruteForce2 () {
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

  function permAlone(str) {
	  var perms = [];
	  var arr = str.split('');

	  perm(arr, 0, arr.length, perms);

	  return perms.filter(function(perm) {
	    return !perm.match(/(.)\1+/g);
	  }).length;
  }

  return permAlone;
}
