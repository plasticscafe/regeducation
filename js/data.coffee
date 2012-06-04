#********************** 
# regex data
#**********************
data = [{
  id: 1 # uniq no 
  title: 'test1' # question title
  description: 'test 1st' # question description
  pattern: '/abc/' # correct answer 
  example:[ # samples input text and answer
    { text: 'abcabc', answer: true }
    { text: 'aaaabc', answer: true }
    { text: 'aaabbb', answer: false  }
  ]
  },{
  id: 2 
  title: 'test2'
  description: 'test 2nd'
  pattern:'m/abc/g'
  example:[
    { text: 'abcabc', answer: ['abc', 'abc'] }
    { text: 'aaaabc', answer: ['abc'] }
    { text: 'aaabbb', answer: null  }
  ]
}]

