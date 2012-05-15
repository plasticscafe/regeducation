should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'exec regex', ->
  describe 'basic test', ->
    it 'defined regexExec', ->
      regexExec.should.be.ok
  describe 'call regexTest', ->
    #it 'no option call regexTest', ->
    #  regexExec('/abc/', 'abc1ABC2abc').should.eql regexTest 
    it 'no option call regexTest', ->
      regexExec('/abc/', 'abc1ABC2abc').should.be.true 
    it 'i option call regexTest', ->
      regexExec('/abc/i', 'afbc1ABC2avbc').should.be.true 
    it 'no option call regexTest fail', ->
      regexExec('/abcd/', 'abc1ABC2abc').should.be.false 
  describe 'call regexMatch', ->
    #it 'no option call regexMatch', ->
    #  regexExec('m/abc/', 'abc1ABC2abc').should.eql regexMatch 
    it 'no option call regexMatch', ->
      regexExec('m/abc/', 'abc1ABC2abc').should.eql ['abc'] 
    it 'g option call regexMatch', ->
      regexExec('m/abc/g', 'abc1ABC2abc').should.eql ['abc', 'abc'] 
    it 'gi option call regexMatch', ->
      regexExec('m/abc/ig', 'abc1ABC2abc').should.eql ['abc', 'ABC', 'abc'] 
    it 'no option call regexMatch fail', ->
      should.not.exist regexExec('m/abcd/', 'abc1ABC2abc') 
  describe 'call regexReplace', ->
    #it 'no option call regexReplace', ->
    #  regexExec('s/abc/hoge/', 'abc1ABC2abc').should.eql regexReplace 
    it 'no option call regexReplace', ->
      regexExec('s/abc/hoge/', 'abc1ABC2abc').should.eql 'hoge1ABC2abc' 
    it 'g option call regexReplace', ->
      regexExec('s/abc/hoge/g', 'abc1ABC2abc').should.eql 'hoge1ABC2hoge' 
    it 'gi option call regexReplace', ->
      regexExec('s/abc/hoge/ig', 'abc1ABC2abc').should.eql 'hoge1hoge2hoge' 
    it 'no option call regexReplace fail', ->
      regexExec('s/abcd/hoge/', 'abc1ABC2abc').should.eql 'abc1ABC2abc' 


