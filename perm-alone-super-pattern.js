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

  function p(a,x) {
    var tabP = {};
    tabP[1] = {};
    tabP[1][4] = 24;
    tabP[2] = {};
    tabP[2][5] = 72;
    tabP[3] = {};
    tabP[3][6] = 144;
    tabP[4] = {};
    tabP[4][7] = 144;

    return tabP[a][x];
  }

  function SuperPattern(pattern, size) {
    this.pattern = pattern;//a^5xaxx = [5,1]
    this.size = size;// a^6xxx=9

    this.number = function () {
      // a^5xaxx = p(2,5) = 72
      var str = "";
      if (this.gaNumber() <= (this.xNumber() + 1)) {
        var numberOfPlacements = p(this.gaNumber(), this.gNumber());
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

    this.nextPattern = function () {
      var i = 0, i2 = 0;
      var newPattern = [];
      var aNumber = 0;
      var max = 0;

      for (i = this.pattern.length - 1; i >= 0; i--) {
        if (this.pattern[i] >= 2 ) {
          if ((this.pattern[i] === 2)&&(i === 0)) {
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

  function permAlone(str) {
    superPattern = new SuperPattern([6],9);

    while (superPattern !== null) {
      console.log(superPattern.pattern.toString() + ":" + superPattern.number());
      superPattern = superPattern.nextPattern();
    }
    // for(var i=0; i<10; i++) {
    //   console.log(superPattern.pattern.toString());
    //   superPattern = superPattern.nextPattern();
    // }
  }

  return permAlone;
}
