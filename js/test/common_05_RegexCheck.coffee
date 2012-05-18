should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'RegexCheck', ->
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
    it 'check regex match', ->
      regex.check('m/abc/', 'abc1ABC2abc', ['abc']).should.be.true
    it 'check regex match false', ->
      regex.check('m/abcd/', 'abc1ABC2abc', ['abc']).should.be.false
    it 'check regex match 2 items', ->
      regex.check('m/abc/g', 'abc1ABC2abc', ['abc', 'abc']).should.be.true
    it 'check regex match 2 items false', ->
      regex.check('m/abc/g', 'abc1ABC2abc', ['abc', 'ebc']).should.be.false
    it 'check regex match 3 items', ->
      regex.check('m/abc/gi', 'abc1ABC2abc', ['abc', 'ABC', 'abc']).should.be.true
    it 'check regex match 3 items false', ->
      regex.check('m/abc/gi', 'abc1ABC2abc', ['abc', 'ebc']).should.be.false
