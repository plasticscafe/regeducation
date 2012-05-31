var Regex, blockCreate, checkerClick, getScore, nextClick, openBlocks, passDisplay, setScore, toggleBlock;

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

/* Using WebStorage
*/

setScore = function(item, score) {
  var res, scores;
  scores = JSON.parse(localStorage.getItem('regeducation.scores'));
  if (typeof res === 'Object') res = {};
  scores[item] = score;
  return localStorage.setItem('regeducation.scores', JSON.stringify(scores));
};

getScore = function() {
  var res;
  res = JSON.parse(localStorage.getItem('regeducation.scores'));
  if (typeof res === 'Object') res = {};
  return res;
};

/* Create Screen
*/

blockCreate = function(data) {
  var block, checker, clear_btn, content, d, description, doc, e, examples, has_scores, inputs, opened, result, score, score_area, scores, tbody, td, th, title, tr, _i, _j, _len, _len2, _ref, _results;
  scores = getScore();
  has_scores = false;
  for (score in scores) {
    has_scores = true;
    break;
  }
  doc = document;
  content = doc.getElementById('content');
  if (has_scores) {
    score_area = doc.createElement('div');
    score_area.className = 'score';
    clear_btn = doc.createElement('input');
    clear_btn.setAttribute('type', 'button');
    clear_btn.setAttribute('value', 'clear score');
    score_area.appendChild(clear_btn);
    content.appendChild(score_area);
  }
  opened = true;
  _results = [];
  for (_i = 0, _len = data.length; _i < _len; _i++) {
    d = data[_i];
    title = doc.createElement('h3');
    title.className = 'title';
    title.appendChild(doc.createTextNode(d.title));
    title.addEventListener('click', toggleBlock);
    if (scores[d.id]) passDisplay(title);
    result = doc.createElement('span');
    result.className = 'result unfinish';
    title.appendChild(result);
    content.appendChild(title);
    block = doc.createElement('div');
    block.className = 'block';
    if (!opened || scores[d.id]) {
      block.style.display = 'none';
    } else {
      opened = false;
    }
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
    inputs.setAttribute('regex_id', d.id);
    inputs.className = 'checker';
    inputs.addEventListener('click', checkerClick);
    checker.appendChild(inputs);
    block.appendChild(checker);
    _results.push(content.appendChild(block));
  }
  return _results;
};

toggleBlock = function(e) {
  return openBlocks(this.nextSibling);
};

openBlocks = function(block) {
  var b, blocks, _i, _len;
  blocks = document.getElementsByClassName('block');
  for (_i = 0, _len = blocks.length; _i < _len; _i++) {
    b = blocks[_i];
    if (b !== block) b.style.display = 'none';
  }
  if (block.style.display === 'none') return block.style.display = 'block';
};

checkerClick = function(e) {
  var answer, block_result, ex, examples, inputs, match_type, n, next_title, pattern, pattern_type, regex, res, _i, _len, _ref;
  examples = this.parentNode.previousSibling.childNodes;
  pattern = this.previousSibling.value.replace(/^\s+|\s+$/g, '');
  if (pattern === '') return false;
  pattern_type = pattern.match(/^([^\/]*)\/(.*)$/);
  match_type = '';
  if (1 < pattern_type.length) match_type = pattern_type[1];
  if (pattern === '' || examples < 1) return false;
  block_result = true;
  _ref = examples[0].childNodes;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    n = _ref[_i];
    ex = n.childNodes;
    if (ex[0].tagName === 'TD' || ex[0].tagName === 'td') {
      answer = ex[1].textContent;
      if (answer === 'null') answer = null;
      if (answer === 'true') answer = true;
      if (answer === 'false') answer = false;
      if (match_type === 'm' && answer) answer = answer.split(',');
      regex = new Regex;
      res = regex.check(pattern, ex[0].textContent, answer);
      if (res.is_success) {
        n.className = 'success';
        ex[2].textContent = '○: ' + res.result;
      } else {
        block_result = false;
        n.className = 'error';
        ex[2].textContent = '☓: ' + res.result;
      }
    }
  }
  if (!block_result) return;
  passDisplay(this.parentNode.parentNode.previousSibling);
  setScore(this.getAttribute('regex_id'), true);
  next_title = this.parentNode.parentNode.nextSibling;
  if (!this.nextSibling && next_title !== null && next_title.className === 'title') {
    inputs = document.createElement('input');
    inputs.setAttribute('type', 'button');
    inputs.setAttribute('value', 'go to next stage');
    inputs.className = 'next_btn';
    inputs.addEventListener('click', nextClick);
    return this.parentNode.appendChild(inputs);
  }
};

nextClick = function(e) {
  return openBlocks(this.parentNode.parentNode.nextSibling.nextSibling);
};

passDisplay = function(title) {
  var pass_tag;
  if (0 < title.getElementsByClassName('pass').length) return;
  pass_tag = document.createElement('span');
  pass_tag.appendChild(document.createTextNode('pass this stage!'));
  pass_tag.className = 'pass';
  return title.appendChild(pass_tag);
};

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function(e) {
    return blockCreate(data);
  });
}
