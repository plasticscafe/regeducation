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
      regex.check('/abc/', 'abc1ABC2abc', true).should.eql(
        is_success: true, result: true 
      )
    it 'check regex test fail', ->
      regex.check('/abcd/', 'abc1ABC2abc', true).should.eql(
        is_success: false, result: false
      )
    it 'check regex test fail 2', ->
      regex.check('/abcd/', 'abc1ABC2abc', false).should.eql(
        is_success: true, result: false
      )
    it 'check regex replace', ->
      regex.check('s/abc/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.eql(
        is_success: true, result: 'hoge1ABC2abc'
      )
    it 'check regex replace fail', ->
      regex.check('s/abcd/hoge/', 'abc1ABC2abc', 'hoge1ABC2abc').should.eql(
        is_success: false, result: 'abc1ABC2abc'
      )
    it 'check regex match', ->
      regex.check('m/abc/', 'abc1ABC2abc', ['abc']).should.eql(
        is_success: true, result: ['abc']
      )
    it 'check regex match false', ->
      regex.check('m/abcd/', 'abc1ABC2abc', ['abc']).should.eql(
        is_success: false, result: null
      )
    it 'check regex match false 2', ->
      regex.check('m/abc/', 'abc1ABC2abc', ['abc', 'abc']).should.eql(
        is_success: false, result: ['abc']
      )
    it 'check regex match 2 items', ->
      regex.check('m/abc/g', 'abc1ABC2abc', ['abc', 'abc']).should.eql(
        is_success: true, result: ['abc', 'abc']
      )
    it 'check regex match 2 items false', ->
      regex.check('m/abc/g', 'abc1ABC2abc', ['abc', 'ebc']).should.eql(
        is_success: false, result: ['abc', 'abc']
      )
    it 'check regex match 3 items', ->
      regex.check('m/abc/gi', 'abc1ABC2abc', ['abc', 'ABC', 'abc']).should.eql(
        is_success: true, result: ['abc', 'ABC','abc']
      )
    it 'check regex match 3 items false', ->
      regex.check('m/abc/gi', 'abc1ABC2abc', ['abc', 'ebc']).should.eql(
        is_success: false, result: ['abc', 'ABC','abc']
      )
