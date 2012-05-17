should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'exec regex', ->
  regex = new Regex
  describe 'basic test', ->
    it 'defined Regex.exec', ->
      regex.exec.should.be.ok
  describe 'call regexTest', ->
    it 'no option call regexTest', ->
      regex.exec('/abc/', 'abc1ABC2abc').should.be.true 
    it 'i option call regexTest', ->
      regex.exec('/abc/i', 'afbc1ABC2avbc').should.be.true 
    it 'no option call regexTest fail', ->
      regex.exec('/abcd/', 'abc1ABC2abc').should.be.false 
  describe 'call regexMatch', ->
    it 'no option call regexMatch', ->
      regex.exec('m/abc/', 'abc1ABC2abc').should.eql ['abc'] 
    it 'g option call regexMatch', ->
      regex.exec('m/abc/g', 'abc1ABC2abc').should.eql ['abc', 'abc'] 
    it 'gi option call regexMatch', ->
      regex.exec('m/abc/ig', 'abc1ABC2abc').should.eql ['abc', 'ABC', 'abc'] 
    it 'no option call regexMatch fail', ->
      should.not.exist regex.exec('m/abcd/', 'abc1ABC2abc') 
  describe 'call regexReplace', ->
    it 'no option call regexReplace', ->
      regex.exec('s/abc/hoge/', 'abc1ABC2abc').should.eql 'hoge1ABC2abc' 
    it 'g option call regexReplace', ->
      regex.exec('s/abc/hoge/g', 'abc1ABC2abc').should.eql 'hoge1ABC2hoge' 
    it 'gi option call regexReplace', ->
      regex.exec('s/abc/hoge/ig', 'abc1ABC2abc').should.eql 'hoge1hoge2hoge' 
    it 'no option call regexReplace fail', ->
      regex.exec('s/abcd/hoge/', 'abc1ABC2abc').should.eql 'abc1ABC2abc' 


