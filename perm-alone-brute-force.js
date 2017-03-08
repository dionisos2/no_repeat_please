function permAloneBruteForce(str) {
  var re=/(.)\1/;
  function pT(p,o){
    if(o.length){
      var sum=0;
      for(var i=0;i<p.length+1;i++){
        sum+=pT(p.slice(0,i).concat(o[0]).concat(p.slice(i)),o.slice(1));
      }
      return sum;
    }
    else return !re.test(p.join(''));
  }
  return pT([],str.split(''));
}
