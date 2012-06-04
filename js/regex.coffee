class Regex
  constructor: ->
    true
  
  test: (pattern, string) ->
    pt = pattern.match(/^\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[2]
    re.test string

  match: (pattern, string) -> 
    pt = pattern.match(/^\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[2]
    res = string.match(re)
    return res if res == null || res.length == 0
    return [res[0]] if !res[1]?
    res

  replace: (pattern, string) ->
    pt = pattern.match(/^\/(.*)\/(.*)\/(.*)$/)
    return null if pt is null
    re = new RegExp pt[1], pt[3]
    res = string.replace(re, pt[2])
    res

  exec: (pattern, string) ->
    pt = pattern.match(/^([^\/]*)(\/.*)$/)
    return null if pt is null
    if pt[1] == 'm'
      @match pt[2], string
    else if pt[1] == 's'
      @replace pt[2], string
    else 
      @test pt[2], string

  check: (pattern, string, answer) ->
    res = @exec pattern, string
    is_success: @is_equal res, answer
    result: res

  is_equal: (a, b) ->
    if typeof a == 'object' && a !=  null
      return false if typeof b != 'object' || a.length != b.length
      n = a.length - 1
      for i in [0..n]
        return false if a[i] != b[i]
    else
      return (a == b)
    true

