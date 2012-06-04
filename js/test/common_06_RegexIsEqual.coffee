should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'regex.js', 'utf-8'

describe 'RegexCheck', ->
  regex = new Regex
  describe 'basic test', ->
    it 'defined is_equal', ->
      regex.is_equal.should.ok
  describe 'item equals', ->
    it 'scalar eql', ->
      regex.is_equal('hoge', 'hoge').should.true
    it 'scalar not equal', ->
      regex.is_equal('hoge', 'hoge1').should.false
  describe 'array equals', ->
    it '1 item eql', ->
      regex.is_equal(['hoge'], ['hoge']).should.true
    it '1 item not equal', ->
      regex.is_equal(['hoge'], ['hoge1']).should.false
    it '2 item eql', ->
      regex.is_equal(['hoge', 'huga'], ['hoge', 'huga']).should.true
    it '2 item not equal', ->
      regex.is_equal(['hoge', 'huga'], ['hoge', 'hige']).should.false
    it 'item length not equal', ->
      regex.is_equal(['hoge', 'huga'], ['hoge']).should.false
    it 'item length not equal 2', ->
      regex.is_equal(['hoge'], ['hoge', 'hige']).should.false
