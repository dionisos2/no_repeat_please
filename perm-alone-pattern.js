function factorial(num) {
  var fact = 1;
  for(var i=2; i<=num; i++) {
    fact *= i;
  }
  return fact;
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

function mul(str,num) {
  var result = '';
  for(var i=0; i<num; i++) {
    result += str;
  }
  return result;
}

function binomial(n, chooseK) {
  var common = factorial(n - chooseK)*factorial(chooseK);
  return Math.round(factorial(n)/common);
}

function tryMoveNthA(nth, str) {
  for(var i = str.length-1; i>=0; i--) {
    if(str[i] === 'a') {
      nth--;
    }
    if(nth < 0) {
      if ((i < str.length-1)&&(str[i+1]!=='a')) {
        return str.substring(0, i) + 'xa' + str.substring(i+2);
      } else {
        return null;
      }
    }
  }

  return null;
}

function glueAfrom(nth, str) {
  var aFound = 0;

  for(var i = str.length-1; i>=0; i--) {
    if(str[i] === 'a') {
      aFound++;
    }
    if(aFound === nth+1) {
      // aaxxaaxxxaxa
      // aaxxaaaaxxxx
      var xAtEnd = str.length - i - (nth+1);
      return str.substring(0,i)+mul('a', nth + 1)+mul('x', xAtEnd);
    }
  }

  return null;
}

function Form(aNumber, xNumber,separators) {
  this.form = '';
  this.separators = separators;
  this.aNumber = aNumber;
  this.xNumber = xNumber;

  this.firstPossibleGoodForm = function () {
    var aNumber = this.aNumber;
    var xNumber = this.xNumber;
    this.form = '';

    while(aNumber > 0) {
      this.form += 'a';
      if(this.isCorrect()) {
        aNumber--;
      } else {
        if(xNumber > 0) {
          var str = this.form;
          str = str.substring(0, str.length-1) + 'x';
          this.form = str;
          xNumber--;
        } else {
          return false;
        }
      }
    }
    for(var j=0; j<xNumber; j++) {
      this.form += 'x';
    }
    return true;
  };

  this.nextForm = function () {
    /*
      aaaxaaxax
      aaaxaaxxa
      aaaxaxaax
      aaaxaxaxa
      aaaxaxxaa
      aaaxxaaax
      aaaxaaaxa
    */
    var nextForm = new Form(this.aNumber, this.xNumber, this.separators);
    var str = this.form;
    for (var i = 0; i<this.aNumber; i++) {
      var newStr = tryMoveNthA(i, str);
      if(newStr !== null) {
        newStr = glueAfrom(i, newStr);
        nextForm.form = newStr;
        return nextForm;
      }
    }

    return null;
  };

  this.nextPossibleGoodForm = function () {

    var nextForm = this.nextForm();
    while((nextForm !== null)&&(!nextForm.isCorrect())) {
      nextForm = nextForm.nextForm();
    }
    return nextForm;
  };

  this.subFormsSeparators = function () {
    separators = {};
    var reduc = 0;
    for(var i=0; i<this.form.length; i++) {
      if((this.form[i] === 'a') || (this.separators.hasOwnProperty(i))){
        separators[i-reduc] = true;
      }
      if(this.form[i]==='a') {
        reduc++;
      }
    }

    return separators;
  };

  this.isPerfect = function () {
    var str = this.toStr();
    return str.match(/xx/) === null;
  };

  this.isCorrect = function () {
    var prev = 'x';
    for (var i=0; i<this.form.length; i++) {
      var separatorBefore = this.separators.hasOwnProperty(i);
      if((prev === 'a')&&(this.form[i] === 'a')&&(!separatorBefore)) {
        return false;
      }
      prev = this.form[i];
    }

    return true;
  };

  this.toStr = function () {
    var str = this.form;
    var shift = 0;
    for(var i=0; i<str.length; i++) {
      if(this.separators.hasOwnProperty(i)) {
        str = str.substring(0, i+shift) + '|' + str.substring(i+shift);
        shift++;
      }
    }
    return str;
  };

}


function permAlonePattern(str) {
  var reps = getReps(str);
  var aNumber;
  var xNumber = str.length; //xxxxxxx
  var numberByForms = factorial(str.length);
  var currentForm;
  var goodForms = [];

  var possibleGoodForms = [];

  reps.sort(function(a,b){ //seem to optimize
    return a < b;
  });

  currentForm = new Form(0, xNumber, {});//xxxxxxx
  currentForm.firstPossibleGoodForm();
  currentForm.number = numberByForms; // 7!=5040
  possibleGoodForms.push(currentForm);


  for(var i = 0; i<reps.length; i++) {
    aNumber = reps[i];
    xNumber -= aNumber; //(aaaxxxx)
    numberByForms /= binomial(xNumber+aNumber, aNumber); // (7!/3⊂7)

    // We replace each possible good forms by their sub-forms.
    var newPossibleGoodForms = [];
    for(var j = 0; j<possibleGoodForms.length; j++) {
      var separators = possibleGoodForms[j].subFormsSeparators();//
      //var tmp = [];

      currentForm = new Form(aNumber,xNumber,separators);

      var ok = currentForm.firstPossibleGoodForm();
      if(!ok) {
        currentForm = null;
      }
      while(currentForm !== null) {
        currentForm.number = numberByForms;

        if(currentForm.isPerfect()) {
          // if the form is perfect we don’t have to consider it again
          //tmp.push(currentForm);
          goodForms.push(currentForm);
        } else {
          //tmp.push(currentForm);
          newPossibleGoodForms.push(currentForm);
        }
        currentForm = currentForm.nextPossibleGoodForm();
      }
      //if((i===1)&&(j===0)){
      //  return [possibleGoodForms[j], tmp];
      //}
    }
    possibleGoodForms = newPossibleGoodForms;
  }

  // All forms are good forms at the end
  goodForms = goodForms.concat(possibleGoodForms);
  //return goodForms.length;
  return goodForms.reduce(function(acc, form){
    return acc + form.number;
  },0);
}


