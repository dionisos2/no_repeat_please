function permAloneDavidF25 () {
  function factorial(num) {
    if (typeof factorial.cache === 'undefined') {
      factorial.cache = [1,1];
      factorial.count = 0;
    }

    if (factorial.cache.length > num) {
      factorial.count++;
      return factorial.cache[num];
    } else {
      for(var i=factorial.cache.length; i<=num; i++) {
        factorial.cache.push(factorial.cache[i-1]*i);
      }
      return factorial.cache[num];
    }
  }

  function binomial(n, chooseK) {

    if ((chooseK > n) || (n < 0) ||(chooseK < 0)) {
      return 0;
    }
    var common = factorial(n - chooseK)*factorial(chooseK);
    return Math.round(factorial(n)/common);
  }

  function magicRecipeOfProtection (str) {
    var nbOfCurrentType;
    var nbOfItems = 1;
    var dp = [];
    var numberOfType = 0;
    var magicalNature = {};
    var newValue;
    var letter;

    for(var key in str) {
      letter = str[key];
      if(magicalNature.hasOwnProperty(letter)) {
        magicalNature[letter]++;
      } else {
        magicalNature[letter] = 1;
      }
    }
    var len = str.length + 10;
    for (var i=0;i<len;i++) {
      dp.push(Array(len).fill(0));
    }
    dp[0][0] = 1;

    for (key in magicalNature) {
      nbOfCurrentType = magicalNature[key];
      for(var newConflicts = nbOfCurrentType-1; newConflicts >= 0; newConflicts--) {
        for(var oldConflicts = nbOfItems-1; oldConflicts >= 0; oldConflicts--) {
          for(var solvedConflicts = nbOfItems-1; solvedConflicts >= 0; solvedConflicts--) {
            newValue = binomial(oldConflicts,solvedConflicts)*
              binomial(nbOfItems-oldConflicts,nbOfCurrentType-newConflicts-solvedConflicts) *
              binomial(nbOfCurrentType-1,newConflicts) *
              factorial(nbOfCurrentType);

            dp[numberOfType+1][oldConflicts+newConflicts-solvedConflicts] += dp[numberOfType][oldConflicts] * newValue;
          }
        }
      }
      nbOfItems += nbOfCurrentType;
      if (nbOfCurrentType !== 0) {
        numberOfType++;
      }
    }

    return dp[numberOfType][0];
  }
  return magicRecipeOfProtection;
}
