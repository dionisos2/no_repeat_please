function permAloneSuperPattern () {
  function SuperPattern(pattern, size) {
    this.pattern = pattern;
    this.size = size;

    this.number = function () {
      var str = "";
      if (this.size >= this.pattern.length*2+1) {
        str += "p("+this.pattern.length+","+this.size+")";
      } else {
        return "0";
      }
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
          return new SuperPattern(newPattern);
        } else {
          aNumber++;
        }
      }
      return null;
    };
  }

  function permAlone(str) {
    superPattern = new SuperPattern([9]);

    while (superPattern !== null) {
      console.log(superPattern.pattern.toString());
      superPattern = superPattern.nextPattern();
    }
    // for(var i=0; i<4; i++) {
    //   console.log(superPattern.pattern.toString());
    //   superPattern = superPattern.nextPattern();
    // }
  }

  return permAlone;
}
