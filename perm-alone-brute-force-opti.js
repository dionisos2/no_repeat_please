function permAloneBruteForceOpti() {

  function permAlone(str, p) {
    return str.split('').reduce(function(result, element, index) {
      if (element == p) {
        return result;
      } else {
        if (str.length == 1) {
          return 1;
        } else {
          return result + permAlone(str.slice(0, index) + str.slice(index + 1), element);
        }
      }
    }, 0);
  }

  return permAlone;
}
