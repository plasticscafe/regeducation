var Regex;

Regex = (function() {

  function Regex() {
    true;
  }

  Regex.prototype.test = function(pattern, string) {
    var pt, re;
    pt = pattern.match(/^\/(.*)\/(.*)$/);
    if (pt === null) return null;
    re = new RegExp(pt[1], pt[2]);
    return re.test(string);
  };

  Regex.prototype.match = function(pattern, string) {
    var pt, re, res;
    pt = pattern.match(/^\/(.*)\/(.*)$/);
    if (pt === null) return null;
    re = new RegExp(pt[1], pt[2]);
    res = string.match(re);
    if (res === null || res.length === 0) return res;
    if (!(res[1] != null)) return [res[0]];
    return res;
  };

  Regex.prototype.replace = function(pattern, string) {
    var pt, re, res;
    pt = pattern.match(/^\/(.*)\/(.*)\/(.*)$/);
    if (pt === null) return null;
    re = new RegExp(pt[1], pt[3]);
    res = string.replace(re, pt[2]);
    return res;
  };

  Regex.prototype.exec = function(pattern, string) {
    var pt;
    pt = pattern.match(/^([^\/]*)(\/.*)$/);
    if (pt === null) return null;
    if (pt[1] === 'm') {
      return this.match(pt[2], string);
    } else if (pt[1] === 's') {
      return this.replace(pt[2], string);
    } else {
      return this.test(pt[2], string);
    }
  };

  Regex.prototype.check = function(pattern, string, answer) {
    var res;
    res = this.exec(pattern, string);
    return {
      is_success: this.is_equal(res, answer),
      result: res
    };
  };

  Regex.prototype.is_equal = function(a, b) {
    var i, n;
    if (typeof a === 'object' && a !== null) {
      if (typeof b !== 'object' || a.length !== b.length) return false;
      n = a.length - 1;
      for (i = 0; 0 <= n ? i <= n : i >= n; 0 <= n ? i++ : i--) {
        if (a[i] !== b[i]) return false;
      }
    } else {
      return a === b;
    }
    return true;
  };

  return Regex;

})();
