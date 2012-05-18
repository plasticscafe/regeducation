var data;

data = [
  {
    title: 'test1',
    description: 'test 1st',
    pattern: '/abc/',
    example: [
      {
        text: 'abcabc',
        answer: true
      }, {
        text: 'aaaabc',
        answer: true
      }, {
        text: 'aaabbb',
        answer: false
      }
    ]
  }, {
    title: 'test2',
    description: 'test 2nd',
    pattern: 'm/abc/g',
    example: [
      {
        text: 'abcabc',
        answer: ['abc', 'abc']
      }, {
        text: 'aaaabc',
        answer: ['abc']
      }, {
        text: 'aaabbb',
        answer: null
      }
    ]
  }
];
