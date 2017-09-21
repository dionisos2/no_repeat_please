function testSimpleFor(permAloneFunc, name) {
  var result = true;
  var testsSpan = document.getElementById('tests');
  var permAlone;

  result = result && (permAloneFunc("aaabcdef") == 14400);
  result = result && (permAloneFunc("aaaabcde") == 2880);
  result = result && (permAloneFunc("aaabbbcd") == 6624);
  result = result && (permAloneFunc("aaabbcd") == 1152);
  result = result && (permAloneFunc("aaabbcce") == 9216);

  testsSpan.innerHTML += "Test simple for " + name + " : " + result.toString() + "</br>";
}

function testComplexFor(permAloneFunc, name) {
  var result = true;
  var testsSpan = document.getElementById('tests');

  result = result && (permAloneFunc("aaaaaaacdefgh") == 3628800);
  result = result && (permAloneFunc("aaaabbbcccde") == 46344960);
  result = result && (permAloneFunc("aaabbcccddefg") == 1593043200);

  testsSpan.innerHTML += "Test complex for " + name + " : " + result.toString() + "</br>";
}

function benchmarkFor (permAloneFunc, input, name) {
  var benchmarksSpan = document.getElementById('benchmarks');
  var start = performance.now();

  permAloneFunc(input);

  var duration = performance.now() - start;

  benchmarksSpan.innerHTML += "Benchmark for " + name + " : " + duration.toFixed(2).toString() + "</br>";
}


function benchmarks (solutions, input) {
  var benchmarksSpan = document.getElementById('benchmarks');
  benchmarksSpan.innerHTML += '</br>------------- "' + input + '" -------------</br></br>';

  for (var name in solutions) {
    benchmarkFor(solutions[name], input, name);
  }
}

function tests(solutions, testFunction) {
  for (var name in solutions) {
    testFunction(solutions[name], name);
  }
}

window.onload = function () {
  var permAlone;
  var slowSolutions = {
    "permAloneBruteForce" : permAloneBruteForce(),
    "permAloneBruteForceOpti" : permAloneBruteForceOpti(),
    "permAlonePattern" : permAlonePattern(),
    "permAloneAlbinutte" : permAloneAlbinutte(),
    "permAloneProgheal" : permAloneProgheal(),
  };

  var fastSolutions = {
    "permAloneSuperPatternOpti" : permAloneSuperPatternOpti(),
    "permAloneMesterum" : permAloneMesterum(),
    "permAloneDavidF25" : permAloneDavidF25()
  };

  tests(slowSolutions, testSimpleFor);
  tests(fastSolutions, testSimpleFor);
  tests(fastSolutions, testComplexFor);

  benchmarks(slowSolutions, "aaaeei");
  benchmarks(fastSolutions, "aaabbccdefgh");
  benchmarks(fastSolutions, "aaabbbcccddeeefgh");
  benchmarks(fastSolutions, "aaaaaaaaabbbbbbbbbbccccccccddddeeeeeefffgggghhhhij");
};
