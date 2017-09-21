function factorialOpti(num) {
  if (typeof factorial.cache === 'undefined') {
    factorial.cache = [1,1];
  }

  if (factorial.cache.length > num) {
    return factorial.cache[num];
  } else {
    for(var i=factorial.cache.length; i<=num; i++) {
      factorial.cache.push(factorial.cache[i-1]*i);
    }
    return factorial.cache[num];
  }
}

function factorial(num) {
  var fact = 1;
  for(var i=2; i<=num; i++) {
    fact *= i;
  }
  return fact;
}

function factBenchmark () {
  var j;
  var result = "";
  var start = performance.now();
  var max = 1000;

  for (var i = 0; i < max; i++) {
    for (j = 0; j < 100; j++) {
      factorial(i);
    }
  }
  var duration = performance.now() - start;
  result += parseFloat(duration).toFixed(2) + "</br>";

  start = performance.now();

  for (i = 0; i < max; i++) {
    for (j = 0; j < 100; j++) {
      factorialOpti(i);
    }
  }
  duration = performance.now() - start;
  result += parseFloat(duration).toFixed(2) + "</br>";

  var benchmarksSpan = document.getElementById('benchmarks');
  benchmarksSpan.innerHTML = result;
}

function createStr (n) {
  var str = '';
  var letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','k','r','s'];
  for (var i=0; i < n; i++) {
    str += Array(n).join(letters[i]);
  }

  return str;
}

function complexity () {
  var result = "";
  var benchmarksSpan = document.getElementById('benchmarks');
  var start, duration;
  var fin = 15;
  var res;

  // result += "<br/>----------permAloneSuperPatternOpti---------<br/>";
  // for (var i=1; i < fin; i++) {
  //   str = createStr(i);
  //   permAlone = permAloneSuperPatternOpti();
  //   result += str + " : " + str.length.toString() + ' = ';

  //   start = performance.now();
  //   permAlone(str);
  //   duration = performance.now() - start;

  //   result += parseFloat(duration).toFixed(2) + '</br>';
  // }

  result += "<br/>----------permAloneDavidF25---------<br/>";
  for (i=1; i < fin; i++) {
    str = createStr(i);
    permAlone = permAloneDavidF25();
    result += str + " : " + '</br>' + str.length.toString() + ' = ';

    start = performance.now();
    res = permAlone(str);
    duration = performance.now() - start;

    result += parseFloat(duration).toFixed(2) + '</br>';
    result +=myToFixed(res) + '</br></br>';
  }

  benchmarksSpan.innerHTML = result;
}
