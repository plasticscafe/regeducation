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
    return res === answer;
  };

  /*
    res = regexMatch pattern, example.text
    result = false
    if res == null
      result = true if example.answer == null
    else 
      result = itemCheck(res, example.answer)
    return { result: result, res: res } 
  
  itemCheck = (a, b) ->
    return false if a.length != b.length 
    num = a.lengthi - 1
    for i in [0 .. num]
      return false if a[i] != b[i] 
    true 
  
  blockCreate = (data) ->
    doc = document
    content = doc.getElementById 'content'
    for d in data
      block = doc.createElement 'div'
      block.className = 'block' 
  
      # title 
      title = doc.createElement 'h3'
      title.className = 'title'
      title.appendChild doc.createTextNode(d.title)
      
      result = doc.createElement 'span'
      result.className = 'result unfinish'
      title.appendChild result 
      block.appendChild title
  
      # description 
      description = doc.createElement 'p'
      description.className = 'description'
      description.appendChild doc.createTextNode(d.description)
      block.appendChild description 
  
      # examaple items
      examples = doc.createElement 'table'
      examples.className = 'examples'
      tbody = doc.createElement 'tbody'
        
      tr = doc.createElement 'tr'
      th = doc.createElement 'th'
      th.appendChild doc.createTextNode('search target')
      tr.appendChild th 
  
      th = doc.createElement 'th'
      th.appendChild doc.createTextNode('correct')
      tr.appendChild th 
  
      th = doc.createElement 'th'
      th.appendChild doc.createTextNode('answer')
      tr.appendChild th 
      tbody.appendChild tr
      
      for e in d.example
        tr = doc.createElement 'tr'
  
        td = doc.createElement 'td'
        td.className = 'sample_text'
        td.appendChild doc.createTextNode(e.text)
        tr.appendChild td 
  
        td = doc.createElement 'td'
        td.className = 'sample_answer'
        td.appendChild doc.createTextNode(e.answer)
        tr.appendChild td 
  
        td = doc.createElement 'td'
        td.className = 'result'
        tr.appendChild td 
  
        tbody.appendChild tr
        
      examples.appendChild tbody
      block.appendChild examples 
  
      # input form
      checker = doc.createElement 'div'
      
      inputs = doc.createElement 'input'
      inputs.setAttribute 'type', 'text' 
      inputs.className = 'pattern'
      checker.appendChild inputs
  
      inputs = doc.createElement 'input'
      inputs.setAttribute 'type', 'button'
      inputs.setAttribute 'value', 'check'
      inputs.className = 'checker'
      inputs.addEventListener 'click', checkerClick
      checker.appendChild inputs
  
      block.appendChild checker
      content.appendChild block
  
  checkerClick = (e) ->
    examples = this.parentNode.previousSibling.childNodes
    pattern = this.previousSibling.value.replace /^\s+|\s+$/g, '' 
    return false if pattern == '' || examples < 1 
    for n in examples[0].childNodes
      ex = n.childNodes
      if ex[0].tagName == 'TD' || ex[0].tagName == 'td'
        answer = ex[1].textContent
        if answer == 'null'
          answer = null 
        else
          answer = answer.split ','
        res = regexCheck pattern,
          text: ex[0].textContent
          answer: answer 
        if res.result
          n.className = 'success'
          ex[2].textContent = '○: ' + res.res
        else
          n.className = 'error'
          ex[2].textContent = '☓: ' + res.res
  
  if typeof document != 'undefined' 
    document.addEventListener 'DOMContentLoaded', (e) ->
      blockCreate(data)
  */

  return Regex;

})();
