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
  var permAlone;
  permAlone = permAlonePattern();
  result += "benchmark permAlonePattern simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneBruteForce();
  result += "benchmark permAloneBruteForce simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneBruteForce2();
  result += "benchmark permAloneBruteForce2 simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneBruteForceOpti();
  result += "benchmark permAloneBruteForceOpti simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";
  permAlone = permAloneSuperPattern();
  result += "benchmark permAloneSuperPattern simple : " + parseFloat(benchmarkPermAloneSimple(permAlone)).toFixed(2) + "</br>";

  benchmarksSpan.innerHTML = result;
}
