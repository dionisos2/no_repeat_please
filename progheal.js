function permAloneProgheal () {

  S=x=>eval(x.join`+`)
  A=magicRecipeOfProtection=l=>
    {
      K=[]
      T=[]
      for(s of l)
        ~(j=K.indexOf(s[1]))?++T[j]:K.push(s[1])+T.push(1)
      for(I=T.map(_=>p=0); p in I; )
      {
        A[I+'']=L=
          S(I)<2?[...I]:
          I.map((v,i)=>v&&S(K=A[J=[...I],--J[i],J+''])-K[i])
        //console.log(I,A[I+''])
        for(p=0; p in I && ++I[p] > T[p]; ) I[p++]=0
      }
      m=S(L)
      T.map(M=v=>v&&M(v-1,m*=v))
      return m
    }

  function permAlone(str) {
    var input = [];
    for(var i = 0; i<str.length;i++) {
      input.push(['', str[i]]);
    }

    return magicRecipeOfProtection(input);
  }
  return permAlone;
}
