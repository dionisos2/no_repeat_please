function benchmarkPermAloneSimple (permAloneFunc) {
  var start = performance.now();

  for (var i = 0; i < 10; i++) {
    permAloneFunc("aaaabbcd");
  }
  var duration = performance.now() - start;
	return duration;
}

function benchmarks () {
  var result = "";
  var benchmarksSpan = document.getElementById('benchmarks');
  result += "benchmark permAlonePattern simple : " + parseFloat(benchmarkPermAloneSimple(permAlonePattern)).toFixed(2) + "</br>";
  result += "benchmark permAloneBruteForce simple : " + parseFloat(benchmarkPermAloneSimple(permAloneBruteForce)).toFixed(2) + "</br>";
  result += "benchmark permAloneBruteForce2 simple : " + parseFloat(benchmarkPermAloneSimple(permAloneBruteForce2)).toFixed(2) + "</br>";
  result += "benchmark permAloneBruteForceOpti simple : " + parseFloat(benchmarkPermAloneSimple(permAloneBruteForceOpti)).toFixed(2) + "</br>";
  benchmarksSpan.innerHTML = result;
}
