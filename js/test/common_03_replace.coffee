should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'replace', ->
  describe 'basic test', ->
    it 'defined regexReplace', ->
      regexReplace.should.be.ok
  describe 'basic replace', ->
    it 'without option', ->
      regexReplace('/abc/hoge/', 'abc1ABCabc').should.eql('hoge1ABCabc')
    it 'no match', ->
      regexReplace('/cba/hoge/', 'abc1ABCabc').should.eql('abc1ABCabc')
  describe 'use valiable', ->
    it 'use $1', ->
      regexReplace('/(abc)/a$1s/', 'abc1ABCabc').should.eql('aabcs1ABCabc')
    it 'use $1 $2', ->
      regexReplace('/(abc)1AB(C)/a$1s$2/', 'abc1ABCabc').should.eql('aabcsCabc')
    it 'use $1 $2 $3', ->
      regexReplace('/(abc)1AB(C)ab(c)/a$1s$2d$3/', 'abc1ABCabc').should.eql('aabcsCdc')
  describe 'single option', ->
    it 'with g option', ->
      regexReplace('/abc/hoge/g', 'abc1ABCabc').should.eql('hoge1ABChoge')
    it 'with i option', ->
      regexReplace('/1abc/hoge/i', 'abc1ABCabc').should.eql('abchogeabc')
    it 'with m option', ->
      regexReplace('/abc$/hoge/m', 'abc\n1ABC').should.eql('hoge\n1ABC')
    it 'without m option multi line no match', ->
      regexReplace('/abc$/hoge/', 'abc\n1ABC').should.not.eql('hoge\nABC')
  describe 'multi option', ->
    it 'with gi option', ->
      regexReplace('/abc/hoge/gi', 'abc1ABCabc').should.eql('hoge1hogehoge')
    it 'with gm option', ->
      regexReplace('/abc$/hoge/mg', 'abc\n1ABCabc').should.eql('hoge\n1ABChoge')
    it 'with im option', ->
      regexReplace('/abc$/hoge/im', 'abcABC\n1abcABC').should.eql('abchoge\n1abcABC')
    it 'with img option', ->
      regexReplace('/abc$/hoge/img', 'abc\n1abcABC').should.eql('hoge\n1abchoge')

