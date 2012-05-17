should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'regexCheck', ->
  regex = new Regex
  describe 'basic test', ->
    it 'defined RegexCheck', ->
      regex.check.should.be.ok
  describe 'call RegexExec', ->
    it 'check regex test', ->
      regex.check('/abc/', 'abc1ABC2abc', true).should.be.true
    it 'check regex test fail', ->
      regex.check('/abcd/', 'abc1ABC2abc', true).should.be.false
    it 'check regex replace', ->
      regex.check('s/abc/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.be.true
    it 'check regex replace fail', ->
      regex.check('s/abcd/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.be.false
