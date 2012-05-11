should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'
eval fs.readFileSync 'data.js', 'utf-8'

describe 'data parse', ->
  it 'loop execute', ->
    for d in data
      for e in d.example
        regexCheck(d.pattern, e).should.eql(
          result:true, res:e.answer
        )

