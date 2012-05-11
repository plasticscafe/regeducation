should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'common.js', 'utf-8'

describe 'regex match', ->
  describe 'basic regex', ->
    it 'without option', ->
      regexMatch('/abc/', 'abc1ABCabc').should.eql(['abc'])
    it 'no match', ->
      should.not.exist(regexMatch('/abc/', 'aaa'))
  describe 'single option', ->
    it 'with g option', ->
      regexMatch('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc'])
    it 'with g option mutched 1 item', ->
      regexMatch('/abc/g', 'abc1ABC').should.eql(['abc'])
    it 'with i option', ->
      regexMatch('/abc/i', 'abc1ABCabc').should.eql(['abc'])
    it 'with m option', ->
      regexMatch('/abc$/m', 'abc\n1ABC').should.eql(['abc'])
    it 'without m option multi line no match', ->
      should.not.exist regexMatch('/abc$/', 'abc\n1ABC')
  describe 'multi option', ->
    it 'with gi option', ->
      regexMatch('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc'])
    it 'with gm option', ->
      regexMatch('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc'])
    it 'with im option', ->
      regexMatch('/abc/im', 'abc\n1abcABC').should.eql(['abc'])

