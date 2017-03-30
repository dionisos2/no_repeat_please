function permAloneSuperPattern () {
  function factorial(num) {
    var fact = 1;
    for(var i=2; i<=num; i++) {
      fact *= i;
    }
    return fact;
  }

  function binomial(n, chooseK) {
    var common = factorial(n - chooseK)*factorial(chooseK);
    return Math.round(factorial(n)/common);
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
      var sum = this.size;
      while ((!success)&&(i < this.superPatterns.length)) {
        sum -= this.superPatterns[i].size;
        if(this.superPatterns[i].size !== this.superPatterns[i].pattern.length) {
          str += "]";
          str += "[" + this.superPatterns[i].pattern.toString() + "]";
          success = true;
        } else {
          str += this.superPatterns[i].size + ", ";
          i++;
        }
      }



      str += "," + sum;

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
    var ultraPattern = new UltraPattern(reps, str.length);
    ultraPattern.start();
    var ok = true;
    while(ok) {
      console.log(ultraPattern.currentDescription());
      ok = ultraPattern.next();
    }

    return ultraPattern.completeDescription();
    // return permWithoutRepeats(reps[0], str.length);
  }

  return permAlone;
}
