should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'RegexClass', ->
  describe 'basic test', ->
    it 'defined Regex', ->
      Regex.should.be.ok
