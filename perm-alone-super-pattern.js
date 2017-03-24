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
        str += "p("+this.gaNumber().toString() + "," + this.gNumber().toString() + ") = " + p(this.gaNumber(), this.gNumber()).toString();
        var placement = p(this.gaNumber(), this.gNumber());
        var byPlacement = 1;
        var aToChooseFrom = this.aNumber();
        for (var i=0; i<this.pattern.length; i++) {
          byPlacement *= binomial(aToChooseFrom, this.pattern[i]) * factorial(this.pattern[i]);
          aToChooseFrom -= this.pattern[i];
        }
        var totalNumber = placement*byPlacement/factorial(this.pattern.length);

        console.log(totalNumber.toString());
        return str;
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

    this.gaDiffNumber = function() {
      var count = 0;
      var current = 0;
      for(var i=0;i<this.pattern.length;i++) {
        if (current != this.pattern[i]) {
          count++;
          current = this.pattern[i];
        }
      }
      return count;
    };

    this.gNumber = function () {
      // a^5xaxx = 5
      return this.gaNumber() + this.xNumber();
    };

    this.nextPattern = function () {
      var i = 0;
      var newPattern = [];
      var aNumber = 0;

      for (i = this.pattern.length - 1; i >= 0; i--) {
        if (this.pattern[i] >= 2 ) {
          if (this.pattern[i] === 2) {
            if(i === 0) {
              return null;
            }
            newPattern = this.pattern.slice(0, i).concat([this.pattern[i]-1]).concat(this.pattern.slice(i+1)).concat([1]);
          } else {
            if(1 + aNumber < this.pattern[i]) {
              newPattern = this.pattern.slice(0, i).concat([this.pattern[i]-1]).concat([1 + aNumber]);
            } else {
              newPattern = this.pattern.slice(0, i).concat([this.pattern[i]-1]).concat(this.pattern[i]-1).concat(this.pattern.slice(i-1+this.pattern[i]));
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
    // for(var i=0; i<4; i++) {
    //   console.log(superPattern.pattern.toString());
    //   superPattern = superPattern.nextPattern();
    // }
  }

  return permAlone;
}
