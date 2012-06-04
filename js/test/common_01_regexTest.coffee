should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'regex.js', 'utf-8'

describe 'regex test', ->
  regex = new Regex
  describe 'method exists', ->
    it 'Regex.test exists',  ->
      regex.test.should.ok
  describe 'basic regex', ->
    it 'match', ->
      regex.test('/abc/', 'abc1ABCabc').should.true
    it 'no match', ->
      regex.test('/abc/', 'aaa').should.false
  describe 'i option', ->
    it 'match', ->
      regex.test('/abc/i', '1ABCbca').should.true
    it 'no match', ->
      regex.test('/abc/', '1ABCbca').should.false
  describe 'm option', ->
    it 'match', ->
      regex.test('/abc$/m', 'ABCDE\nabc\n1234').should.true
    it 'no match', ->
      regex.test('/abc$/', 'ABCDE\nabc\n1234').should.false
  describe 'im option', ->
    it 'match', ->
      regex.test('/abc$/im', 'qwer\nABC\n1234').should.true
    it 'no match without i', ->
      regex.test('/abc$/m', 'qwer\nABC\n1234').should.false
    it 'no match without m', ->
      regex.test('/abc$/i', 'qwer\nABC\n1234').should.false
