function benchmarkPermAloneSimple (permAloneFunc) {
  var start = performance.now();

  for (var i = 0; i < 10; i++) {
    permAloneFunc("aaaabbcd");
  }
  var duration = performance.now() - start;
	return duration;
}


function benchmarkPermAloneOneGroup (permAloneFunc) {
  var start = performance.now();

  for (var i = 0; i < 10; i++) {
    permAloneFunc("aaaaaaaaabcdefghijklmnopq");
  }
  var duration = performance.now() - start;
	return duration;
}

function benchmarkPermAloneComplex (permAloneFunc) {
  var start = performance.now();

  permAloneFunc("aaabbcccddefg");

  var duration = performance.now() - start;
	return duration;
}

function benchmarkPermAloneVeryComplex (permAloneFunc) {
  var start = performance.now();

  permAloneFunc("aaaaabbbbbbccccddeeeefghij");

  var duration = performance.now() - start;
	return duration;
}

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

function benchmarks () {
  var result = "";
  var benchmarksSpan = document.getElementById('benchmarks');
  var permAlone;

  permAlone = permAloneBruteForce();
  result += "benchmark permAloneBruteForce simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneBruteForce2();
  result += "benchmark permAloneBruteForce2 simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneBruteForceOpti();
  result += "benchmark permAloneBruteForceOpti simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAlonePattern();
  result += "benchmark permAlonePattern simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPattern();
  result += "benchmark permAloneSuperPattern simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "benchmark permAloneSuperPatternOpti simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";

  result += "<br/>";
  permAlone = permAlonePattern();
  result += "benchmark permAlonePattern one group : " + parseFloat(benchmarkPermAloneOneGroup(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPattern();
  result += "benchmark permAloneSuperPattern one group : " + parseFloat(benchmarkPermAloneOneGroup(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "benchmark permAloneSuperPatternOpti one group : " + parseFloat(benchmarkPermAloneOneGroup(permAlone)).toFixed(2) + "</br>";

  result += "<br/>";
  permAlone = permAlonePattern();
  result += "benchmark permAlonePattern complex : " + parseFloat(benchmarkPermAloneComplex(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPattern();
  result += "benchmark permAloneSuperPattern complex : " + parseFloat(benchmarkPermAloneComplex(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "benchmark permAloneSuperPatternOpti complex : " + parseFloat(benchmarkPermAloneComplex(permAlone)).toFixed(2) + "</br>";

  result += "<br/>";
  permAlone = permAloneSuperPattern();
  result += "benchmark permAloneSuperPattern very complex : " + parseFloat(benchmarkPermAloneVeryComplex(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPatternOpti();
  result += "benchmark permAloneSuperPatternOpti very complex : " + parseFloat(benchmarkPermAloneVeryComplex(permAlone)).toFixed(2) + "</br>";

  benchmarksSpan.innerHTML = result;
}
