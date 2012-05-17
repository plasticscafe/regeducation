should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'replace', ->
  regex = new Regex
  describe 'basic test', ->
    it 'defined Regex.replace', ->
      regex.replace.should.be.ok
  describe 'basic replace', ->
    it 'without option', ->
      regex.replace('/abc/hoge/', 'abc1ABCabc').should.eql('hoge1ABCabc')
    it 'no match', ->
      regex.replace('/cba/hoge/', 'abc1ABCabc').should.eql('abc1ABCabc')
  describe 'use valiable', ->
    it 'use $1', ->
      regex.replace('/(abc)/a$1s/', 'abc1ABCabc').should.eql('aabcs1ABCabc')
    it 'use $1 $2', ->
      regex.replace('/(abc)1AB(C)/a$1s$2/', 'abc1ABCabc').should.eql('aabcsCabc')
    it 'use $1 $2 $3', ->
      regex.replace('/(abc)1AB(C)ab(c)/a$1s$2d$3/', 'abc1ABCabc').should.eql('aabcsCdc')
  describe 'single option', ->
    it 'with g option', ->
      regex.replace('/abc/hoge/g', 'abc1ABCabc').should.eql('hoge1ABChoge')
    it 'with i option', ->
      regex.replace('/1abc/hoge/i', 'abc1ABCabc').should.eql('abchogeabc')
    it 'with m option', ->
      regex.replace('/abc$/hoge/m', 'abc\n1ABC').should.eql('hoge\n1ABC')
    it 'without m option multi line no match', ->
      regex.replace('/abc$/hoge/', 'abc\n1ABC').should.not.eql('hoge\nABC')
  describe 'multi option', ->
    it 'with gi option', ->
      regex.replace('/abc/hoge/gi', 'abc1ABCabc').should.eql('hoge1hogehoge')
    it 'with gm option', ->
      regex.replace('/abc$/hoge/mg', 'abc\n1ABCabc').should.eql('hoge\n1ABChoge')
    it 'with im option', ->
      regex.replace('/abc$/hoge/im', 'abcABC\n1abcABC').should.eql('abchoge\n1abcABC')
    it 'with img option', ->
      regex.replace('/abc$/hoge/img', 'abc\n1abcABC').should.eql('hoge\n1abchoge')

