var Regex, blockCreate, checkerClick;

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
    if (typeof res[1] === 'undefined') return [res[0]];
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

/* Create Screen
*/

blockCreate = function(data) {
  var block, checker, content, d, description, doc, e, examples, inputs, result, tbody, td, th, title, tr, _i, _j, _len, _len2, _ref, _results;
  doc = document;
  content = doc.getElementById('content');
  _results = [];
  for (_i = 0, _len = data.length; _i < _len; _i++) {
    d = data[_i];
    block = doc.createElement('div');
    block.className = 'block';
    title = doc.createElement('h3');
    title.className = 'title';
    title.appendChild(doc.createTextNode(d.title));
    result = doc.createElement('span');
    result.className = 'result unfinish';
    title.appendChild(result);
    block.appendChild(title);
    description = doc.createElement('p');
    description.className = 'description';
    description.appendChild(doc.createTextNode(d.description));
    block.appendChild(description);
    examples = doc.createElement('table');
    examples.className = 'examples';
    tbody = doc.createElement('tbody');
    tr = doc.createElement('tr');
    th = doc.createElement('th');
    th.appendChild(doc.createTextNode('search target'));
    tr.appendChild(th);
    th = doc.createElement('th');
    th.appendChild(doc.createTextNode('correct'));
    tr.appendChild(th);
    th = doc.createElement('th');
    th.appendChild(doc.createTextNode('answer'));
    tr.appendChild(th);
    tbody.appendChild(tr);
    _ref = d.example;
    for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
      e = _ref[_j];
      tr = doc.createElement('tr');
      td = doc.createElement('td');
      td.className = 'sample_text';
      td.appendChild(doc.createTextNode(e.text));
      tr.appendChild(td);
      td = doc.createElement('td');
      td.className = 'sample_answer';
      td.appendChild(doc.createTextNode(e.answer));
      tr.appendChild(td);
      td = doc.createElement('td');
      td.className = 'result';
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
    examples.appendChild(tbody);
    block.appendChild(examples);
    checker = doc.createElement('div');
    inputs = doc.createElement('input');
    inputs.setAttribute('type', 'text');
    inputs.className = 'pattern';
    checker.appendChild(inputs);
    inputs = doc.createElement('input');
    inputs.setAttribute('type', 'button');
    inputs.setAttribute('value', 'check');
    inputs.className = 'checker';
    inputs.addEventListener('click', checkerClick);
    checker.appendChild(inputs);
    block.appendChild(checker);
    _results.push(content.appendChild(block));
  }
  return _results;
};

checkerClick = function(e) {
  var answer, ex, examples, match_type, n, pattern, pattern_type, regex, res, _i, _len, _ref, _results;
  examples = this.parentNode.previousSibling.childNodes;
  pattern = this.previousSibling.value.replace(/^\s+|\s+$/g, '');
  pattern_type = pattern.match(/^([^\/]*)\/(.*)$/);
  match_type = '';
  if (1 < pattern_type.length) match_type = pattern_type[1];
  if (pattern === '' || examples < 1) return false;
  _ref = examples[0].childNodes;
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    n = _ref[_i];
    ex = n.childNodes;
    if (ex[0].tagName === 'TD' || ex[0].tagName === 'td') {
      answer = ex[1].textContent;
      if (answer === 'null') answer = null;
      if (answer === 'true') answer = true;
      if (answer === 'false') answer = false;
      if (match_type === 'm' && answer) answer = answer.split(',');
      console.log(answer);
      regex = new Regex;
      res = regex.check(pattern, ex[0].textContent, answer);
      console.log(res);
      if (res.is_success) {
        n.className = 'success';
        _results.push(ex[2].textContent = '○: ' + res.result);
      } else {
        n.className = 'error';
        _results.push(ex[2].textContent = '☓: ' + res.result);
      }
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function(e) {
    return blockCreate(data);
  });
}
