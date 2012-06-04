/* Using WebStorage
*/
var blockCreate, checkerClick, clearScore, clearScores, getPassScores, getScore, nextClick, openBlocks, passDisplay, scoreDisplay, setScore, toggleBlock;

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

clearScore = function() {
  return localStorage.setItem('regeducation.scores', JSON.stringify({}));
};

/* Create Screen
*/

blockCreate = function(data) {
  var block, checker, content, d, description, doc, e, examples, inputs, opened, result, scores, tbody, td, th, title, tr, _i, _j, _len, _len2, _ref, _results;
  doc = document;
  content = doc.getElementById('content');
  if (0 < getPassScores()) scoreDisplay(content);
  opened = true;
  scores = getScore();
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
  scoreDisplay(document.getElementById('content', data));
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

clearScores = function(e) {
  clearScore();
  return window.location.reload();
};

passDisplay = function(title) {
  var pass_tag;
  if (0 < title.getElementsByClassName('pass').length) return;
  pass_tag = document.createElement('span');
  pass_tag.appendChild(document.createTextNode('pass this stage!'));
  pass_tag.className = 'pass';
  return title.appendChild(pass_tag);
};

scoreDisplay = function(content) {
  var clear_btn, first, pass_scores, score_area, score_disp, score_label;
  first = content.firstChild;
  if (first.className === 'score' && first.style.display !== 'none') {
    content.removeChild(first);
  }
  pass_scores = getPassScores();
  score_area = document.createElement('div');
  score_area.className = 'score';
  score_label = document.createElement('span');
  score_label.appendChild(document.createTextNode('scores: '));
  score_label.className = 'label';
  score_area.appendChild(score_label);
  score_disp = document.createElement('span');
  score_disp.className = 'disp';
  score_disp.appendChild(document.createTextNode('pass ' + pass_scores + ' / all ' + data.length));
  score_area.appendChild(score_disp);
  clear_btn = document.createElement('input');
  clear_btn.setAttribute('type', 'button');
  clear_btn.setAttribute('value', 'clear score');
  clear_btn.addEventListener('click', clearScores);
  score_area.appendChild(clear_btn);
  return content.insertBefore(score_area, content.firstChild);
};

getPassScores = function() {
  var pass_scores, score, scores;
  scores = getScore();
  pass_scores = 0;
  for (score in scores) {
    if (scores[score] === true) pass_scores += 1;
  }
  return pass_scores;
};

if (typeof document !== "undefined" && document !== null) {
  document.addEventListener('DOMContentLoaded', function(e) {
    return blockCreate(data);
  });
}
