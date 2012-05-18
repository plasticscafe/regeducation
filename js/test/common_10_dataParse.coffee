should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'
eval fs.readFileSync 'data.js', 'utf-8'

describe 'data parse', ->
  regex = new Regex
  it 'loop execute', ->
    for d in data
      for e in d.example
        regex.check(d.pattern, e.text, e.answer).should.true

