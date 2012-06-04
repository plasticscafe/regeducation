should = require 'should'
fs = require 'fs'

eval fs.readFileSync 'regex.js', 'utf-8'

describe 'regex match', ->
  regex = new Regex
  describe 'basic test', ->
    it 'defined Regex.match', ->
      regex.match.should.be.ok
  describe 'basic regex', ->
    it 'without option', ->
      regex.match('/abc/', 'abc1ABCabc').should.eql(['abc'])
    it 'no match', ->
      should.not.exist(regex.match('/abc/', 'aaa'))
  describe 'single option', ->
    it 'with g option', ->
      regex.match('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc'])
    it 'with g option mutched 1 item', ->
      regex.match('/abc/g', 'abc1ABC').should.eql(['abc'])
    it 'with i option', ->
      regex.match('/abc/i', 'abc1ABCabc').should.eql(['abc'])
    it 'with m option', ->
      regex.match('/abc$/m', 'abc\n1ABC').should.eql(['abc'])
    it 'without m option multi line no match', ->
      should.not.exist regex.match('/abc$/', 'abc\n1ABC')
  describe 'multi option', ->
    it 'with gi option', ->
      regex.match('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc'])
    it 'with gm option', ->
      regex.match('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc'])
    it 'with im option', ->
      regex.match('/abc/im', 'abc\n1abcABC').should.eql(['abc'])

