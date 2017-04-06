function permAloneSuperPatternOpti () {

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
    var common = factorial(n - chooseK)*factorial(chooseK);
    return Math.round(factorial(n)/common);
  }

  function chooseConsecutively(groups) {
    var result = 1;
    var numberToChooseFrom = groups.reduce(function(acc, element){
      return acc + element;
    }, 0);

    for (var i=0; i<groups.length; i++) {
      result *= binomial(numberToChooseFrom, groups[i]) * factorial(groups[i]);
      numberToChooseFrom -= groups[i];
    }

    return result;
  }

  function multipleFactorial(groups) {
    var result = 1;
    for (var i=0; i<groups.length;i++) {
      result *= factorial(groups[i]);
    }

    return result;
  }

  function permWithoutRepeatsM(repeatingLetters, numberOfLetters) {
    // console.log("permWithoutRepeatsM : [" + repeatingLetters.toString() + "], "+numberOfLetters);

    if ((repeatingLetters.length === 1) && (repeatingLetters[0] === 1)) {
      return factorial(numberOfLetters);
    } else {
      return factorial(numberOfLetters) - permWithRepeatsM(repeatingLetters, numberOfLetters);
    }
  }

  function permWithRepeatsM(repeatingLetters, numberOfLetters) {
    repeatingLetters = repeatingLetters.filter(function(element) {return element > 1;});
    // console.log("permWithRepeatsM : [" + repeatingLetters.toString() + "], "+numberOfLetters);

    repeatingLetters.sort(function(a,b) {
      return a < b;
    });

    if (typeof permWithRepeatsM.cache === 'undefined') {
      permWithRepeatsM.cache = [];
    }

    var found = true;
    var currentCache = null;

    if (repeatingLetters.length in permWithRepeatsM.cache) {
      currentCache = permWithRepeatsM.cache[repeatingLetters.length];
    } else {
      found = false;
      permWithRepeatsM.cache[repeatingLetters.length] = [];
      currentCache = permWithRepeatsM.cache[repeatingLetters.length];
    }

    if (numberOfLetters in currentCache) {
      currentCache = currentCache[numberOfLetters];
    } else {
      found = false;
      currentCache[numberOfLetters] = [];
      currentCache = currentCache[numberOfLetters];
    }

    var index;
    for (var i=0; i<repeatingLetters.length-1;i++) {
      index = repeatingLetters[i];
      if(index in currentCache) {
        currentCache = currentCache[index];
      } else {
        found = false;
        currentCache[index] = [];
        currentCache = currentCache[index];
      }
    }

    var lastIndex = repeatingLetters[repeatingLetters.length-1];

    if(lastIndex in currentCache) {
      if(found) {
        return currentCache[lastIndex];
      }
    }

    var ultraPattern = new UltraPattern(repeatingLetters, numberOfLetters);
    ultraPattern.start();
    // console.log(ultraPattern.completeDescription());

    var ok = true;
    var sum = 0;
    while(ok) {
      // console.log(ultraPattern.currentDescription());
      // console.log(ultraPattern.number());
      sum += ultraPattern.number();
      ok = ultraPattern.next();
    }

    currentCache[lastIndex] = sum;
    return sum;
  }

  function UltraPattern(groups, size) {
    this.groups = groups;
    this.size = size;
    this.superPatterns = [];

    this.start = function() {
      for (var i=0; i<this.groups.length; i++) {
        this.superPatterns.push(new SuperPattern([groups[i]], groups[i]));
      }
    };

    this.number = function() {
      var repeatingLetters = [];
      var success = false;
      var lastPattern = null;
      var i = 0;

      while ((!success)&&(i < this.superPatterns.length)) {
        if(this.superPatterns[i].size !== this.superPatterns[i].pattern.length) {
          lastPattern = this.superPatterns[i];
          success = true;
        } else {
          repeatingLetters.push(this.superPatterns[i].size);
          i++;
        }
      }

      repeatingLetters.push(lastPattern.pattern.length);
      var size = this.size - lastPattern.aNumber() + lastPattern.pattern.length;

      var numberOfPlacements = permWithoutRepeatsM(repeatingLetters, size);
      var numberByPlacement = 1;
      numberByPlacement *= chooseConsecutively(lastPattern.pattern);
      numberByPlacement /= multipleFactorial(lastPattern.getGroupedPattern());
      return numberOfPlacements * numberByPlacement;
    };

    this.next = function() {
      var success = false;
      var i = 0;
      var newSuperPattern;
      while ((!success) && (i < this.superPatterns.length - 1)) {
        newSuperPattern = this.superPatterns[i].nextPattern(true);
        if (newSuperPattern !== null) {
          this.superPatterns[i] = newSuperPattern;
          success = true;
        } else {
          i++;
        }
      }

      if (!success) {
        newSuperPattern = this.superPatterns[this.superPatterns.length-1].nextPattern();
        if (newSuperPattern !== null) {
          this.superPatterns[this.superPatterns.length-1] = newSuperPattern;
        } else {
          return false;
        }
      }

      return true;
    };

    this.currentDescription = function() {
      var str = "[";
      var success = false;
      var i = 0;
      var size = this.size;

      while ((!success)&&(i < this.superPatterns.length)) {
        if(this.superPatterns[i].size !== this.superPatterns[i].pattern.length) {
          str += "]";
          str += "[" + this.superPatterns[i].pattern.toString() + "]";
          size += this.superPatterns[i].pattern.length - this.superPatterns[i].aNumber();
          success = true;
        } else {
          str += this.superPatterns[i].size + ", ";
          i++;
        }
      }



      str += "," + size;

      return str;
    };

    this.completeDescription = function() {
      var str = "[";
      for (var i=0; i<this.superPatterns.length; i++) {
        str += this.superPatterns[i].size + ", ";
      }
      return str + "]" + ", " + this.size;
    };
  }

  function SuperPattern(pattern, size) {
    this.pattern = pattern;//a^5xaxx = [5,1]
    this.size = size;// a^6xxx=9

    this.number = function () {
      // a^5xaxx = p(2,5) = 72
      var str = "";
      if (this.gaNumber() <= (this.xNumber() + 1)) {
        var numberOfPlacements = permWithoutRepeats(this.gaNumber(), this.gNumber());
        // str += "p("+this.gaNumber().toString() + "," + this.gNumber().toString() + ") = " + numberOfPlacements.toString();
        var byPlacement = 1;
        var aToChooseFrom = this.aNumber();
        for (var i=0; i<this.pattern.length; i++) {
          byPlacement *= binomial(aToChooseFrom, this.pattern[i]) * factorial(this.pattern[i]);
          aToChooseFrom -= this.pattern[i];
        }

        var groupedPattern = this.getGroupedPattern();
        // byPlacement *= factorial(this.pattern.length);
        for(i=0; i<groupedPattern.length;i++) {
          byPlacement/=factorial(groupedPattern[i]);
        }
        var totalNumber = numberOfPlacements*byPlacement;

        return totalNumber;
      } else {
        return "0";
      }
    };

    this.aNumber = function () {
      // a^5xaxx = 6
      return this.pattern.reduce(function(acc, element){
        return acc + element;
      }, 0);
    };

    this.xNumber = function () {
      // a^5xaxx = 3
      return this.size - this.aNumber();
    };

    this.gaNumber = function () {
      return this.pattern.length;
    };

    this.getGroupedPattern = function() {
      // [5,5,4,4,2,2,2] → [2,2,3]
      var i, current;
      var groupedPattern = [];
      if(this.pattern.length > 0) {
        current = this.pattern[0];
        groupedPattern.push(1);
      }

      for(i=1; i < this.pattern.length; i++) {
        if(this.pattern[i] === current) {
          groupedPattern[groupedPattern.length -1]++;
        } else {
          current = this.pattern[i];
          groupedPattern.push(1);
        }
      }
      return groupedPattern;
    };

    this.gNumber = function () {
      // a^5xaxx = 5
      return this.gaNumber() + this.xNumber();
    };

    this.nextPattern = function (finalize) {
      if (typeof finalize === 'undefined') {
        finalize = false;
      }
      var i = 0, i2 = 0;
      var newPattern = [];
      var aNumber = 0;
      var max = 0;

      for (i = this.pattern.length - 1; i >= 0; i--) {
        if (this.pattern[i] >= 2 ) {
          if ((i === 0)&&(((this.pattern[i] === 2)&&(!finalize))||((this.pattern[i] === 1)&&(finalize)))) {
            return null;
          } else {
            max = this.pattern[i]-1;
            newPattern = this.pattern.slice(0, i).concat([this.pattern[i]-1]);
            aNumber++;
            for(i2 = max; i2 <= aNumber; i2+=max) {
              newPattern.push(max);
            }
            i2-=max;
            if(i2 != aNumber) {
              newPattern.push(aNumber-i2);
            }
          }
          return new SuperPattern(newPattern, this.size);
        } else {
          aNumber++;
        }
      }
      return null;
    };
  }

  function permWithoutRepeats(aNumber, totalNumber) {
    if (aNumber === 1) {
      return factorial(totalNumber);
    } else {
      return factorial(totalNumber) - permWithRepeats(aNumber, totalNumber);
    }
  }

  function permWithRepeats(aNumber, totalNumber) {
    var startPattern = [];
    startPattern.push(aNumber);
    var superPattern = new SuperPattern(startPattern, totalNumber);
    var sum = 0;
    while (superPattern !== null) {
      sum += superPattern.number();
      superPattern = superPattern.nextPattern();
    }

    return sum;
  }

  function getReps(str) {
    var sortedLetters = str.split("").sort();
    var reps = [];
    var currentLetter, numberOfLetters;

    if(str.length >= 1) {
      currentLetter = sortedLetters[0];
      numberOfLetters = 1;
    }
    for(var i = 1; i < sortedLetters.length; i++) {
      if(sortedLetters[i] === currentLetter) {
        numberOfLetters++;
      } else {
        if (numberOfLetters > 1) {
          reps.push(numberOfLetters);
        }
        currentLetter = sortedLetters[i];
        numberOfLetters = 1;
      }
    }
    if(numberOfLetters > 1) {
      reps.push(numberOfLetters);
    }
    return reps;
  }
  function permAlone(str) {
    var reps = getReps(str);

    reps.sort(function(a,b) {
      return a < b;
    });

    result = permWithoutRepeatsM(reps, str.length);

    return result;
  }

  return permAlone;
}
