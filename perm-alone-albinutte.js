function permAloneAlbinutte () {

  function sum(ar) {
    return ar.reduce(function(a, b){return a+b;});
  }
  function getReps(str) {
    var repsO = {};
    var l;
    for (var i = 0; i < str.length; i++) {
      l = str[i];
      if(repsO.hasOwnProperty(l)) {
        repsO[l]++;
      } else {
        repsO[l] = 1;
      }
    }
    var reps = [];
    for (var key in repsO) {
      reps.push(repsO[key]);
    }

    return reps;
  }

  function permAlone(str) {
    var reps = getReps(str);
    var res = solve(reps, null);
    return res;
  }

  function solve(remainingIngredients, lastIngredient) {
    var keyEnd = remainingIngredients[lastIngredient];
    var keyArray = Object.values(remainingIngredients.sort()).filter(function (e) {return e > 0;});
    if (typeof solve.memory === 'undefined') {
      solve.memory = {};
    }

    var key = "K" + keyArray.join("_");
    key += "L" + keyEnd;

    if (solve.memory.hasOwnProperty(key)) {
      return solve.memory[key];
    }

    if (sum(remainingIngredients) === 0) {
      return 1;
    }
    var countedCnt = {};
    var cnt;
    for(var tp = 0; tp < remainingIngredients.length; tp++) {
      cnt = remainingIngredients[tp];
      if ((cnt > 0) && (tp != lastIngredient)) {
        if(countedCnt.hasOwnProperty(cnt)) {
          countedCnt[cnt][1] += 1;
        } else {
          remainingIngredients[tp] -= 1;
          countedCnt[cnt] = [solve(remainingIngredients, tp) * cnt, 1];
          remainingIngredients[tp] += 1;
        }
      }
    }
    var res = 0;

    for(var index in countedCnt) {
      res += countedCnt[index][0] * countedCnt[index][1];
    }
    solve.memory[key] = res;
    return res;
  }
  return permAlone;
}
