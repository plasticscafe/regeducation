should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'regex test', ->
  describe 'method exists', ->
    it 'regexTest exists',  ->
      regexTest.should.ok
  describe 'basic regex', ->
    it 'match', ->
      regexTest('/abc/', 'abc1ABCabc').should.true
    it 'no match', ->
      regexTest('/abc/', 'aaa').should.false
  describe 'i option', ->
    it 'match', ->
      regexTest('/abc/i', '1ABCbca').should.true
    it 'no match', ->
      regexTest('/abc/', '1ABCbca').should.false
  describe 'm option', ->
    it 'match', ->
      regexTest('/abc$/m', 'ABCDE\nabc\n1234').should.true
    it 'no match', ->
      regexTest('/abc$/', 'ABCDE\nabc\n1234').should.false
  describe 'im option', ->
    it 'match', ->
      regexTest('/abc$/im', 'qwer\nABC\n1234').should.true
    it 'no match without i', ->
      regexTest('/abc$/m', 'qwer\nABC\n1234').should.false
    it 'no match without m', ->
      regexTest('/abc$/i', 'qwer\nABC\n1234').should.false
