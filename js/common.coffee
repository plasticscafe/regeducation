class Regex
  constructor: ->
    true
  
  test: (pattern, string) ->
    pt = pattern.match(/^\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[2]
    re.test string

  match: (pattern, string) -> 
    pt = pattern.match(/^\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[2]
    res = string.match(re)
    return res if res == null || res.length == 0
    return [res[0]] if typeof res[1] == 'undefined'
    res

  replace: (pattern, string) ->
    pt = pattern.match(/^\/(.*)\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[3]
    res = string.replace(re, pt[2])
    res

  exec: (pattern, string) ->
    pt = pattern.match(/^([^\/]*)(\/.*)$/)
    return null if pt is null
    if pt[1] == 'm'
      this.match pt[2], string
    else if pt[1] == 's'
      this.replace pt[2], string
    else 
      this.test pt[2], string

  check: (pattern, string, answer) ->
    res = this.exec pattern, string
    is_success: this.is_equal res, answer
    result: res

  is_equal: (a, b) ->
    if typeof a == 'object' && a !=  null
      return false if typeof b != 'object' || a.length != b.length
      n = a.length - 1
      for i in [0..n]
        return false if a[i] != b[i]
    else
      return (a == b)
    true

### Create Screen ###
blockCreate = (data) ->
  doc = document
  content = doc.getElementById 'content'
  count = 0
  for d in data
    count++
    # title 
    title = doc.createElement 'h3'
    title.className = 'title'
    title.appendChild doc.createTextNode(d.title)
    title.addEventListener 'click', toggleBlock
    
    result = doc.createElement 'span'
    result.className = 'result unfinish'
    title.appendChild result 
    content.appendChild title

    block = doc.createElement 'div'
    block.className = 'block' 
    block.style.display = 'none' if 1 < count  

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

# Event Action
toggleBlock = (e) ->
  block = this.nextSibling
  blocks = document.getElementsByClassName 'block'
  for b in blocks
    b.style.display = 'none' if b != block
  block.style.display = 'block' if block.style.display == 'none'

checkerClick = (e) ->
  examples = this.parentNode.previousSibling.childNodes
  pattern = this.previousSibling.value.replace /^\s+|\s+$/g, '' 
  return false if  pattern == ''
  pattern_type = pattern.match /^([^\/]*)\/(.*)$/
  match_type = ''
  match_type = pattern_type[1] if 1 < pattern_type.length
  return false if pattern == '' || examples < 1 
  for n in examples[0].childNodes
    ex = n.childNodes
    if ex[0].tagName == 'TD' || ex[0].tagName == 'td'
      answer = ex[1].textContent
        
      answer = null if answer == 'null'
      answer  = true if answer == 'true'
      answer  = false if answer == 'false'
      answer = answer.split ',' if match_type == 'm' && answer 
      console.log answer

      regex = new Regex
      res = regex.check pattern, ex[0].textContent, answer 
      if res.is_success
        n.className = 'success'
        ex[2].textContent = '○: ' + res.result
      else
        n.className = 'error'
        ex[2].textContent = '☓: ' + res.result

if typeof document != 'undefined' 
  document.addEventListener 'DOMContentLoaded', (e) ->
    blockCreate(data)
