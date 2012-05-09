should = require 'should'
fs = require 'fs'

content = fs.readFileSync 'common.js', 'utf-8'
eval content

describe 'regex exec', ->
  describe 'basic regex', ->
    it 'without option', ->
      regexExec('/abc/', 'abc1ABCabc').should.eql('abc')
    it 'no match', ->
      should.not.exist(regexExec('/abc/', 'aaa'))
  describe 'single option', ->
    it 'with g option', ->
      regexExec('/abc/g', 'abc1ABCabc').should.eql(['abc', 'abc'])
    it 'with g option mutched 1 item', ->
      regexExec('/abc/g', 'abc1ABC').should.eql(['abc'])
    it 'with i option', ->
      regexExec('/abc/i', 'abc1ABCabc').should.eql('abc')
    it 'with m option', ->
      regexExec('/abc$/m', 'abc\n1ABC').should.eql('abc')
    it 'without m option multi line no match', ->
      should.not.exist regexExec('/abc$/', 'abc\n1ABC')
  describe 'multi option', ->
    it 'with gi option', ->
      regexExec('/abc/gi', 'abc1ABCabc').should.eql(['abc', 'ABC', 'abc'])
    it 'with gm option', ->
      regexExec('/abc$/mg', 'abc\n1ABCabc').should.eql(['abc', 'abc'])
    it 'with im option', ->
      regexExec('/abc/im', 'abc\n1abcABC').should.eql('abc')


content = fs.readFileSync 'data.js', 'utf-8'
eval content

describe 'data parse', ->
  it 'loop execute', ->
    for d in data
      for e in d.example
        regexCheck(d.pattern, e).should.eql(
          result:true, res:e.answer
        )

