should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'regex.js', 'utf-8'

describe 'RegexClass', ->
  describe 'basic test', ->
    it 'defined Regex', ->
      Regex.should.be.ok
