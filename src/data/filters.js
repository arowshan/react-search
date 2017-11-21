const FILTERS = [
  {
    'name': 'USA Jobs',
    'keyword': '',
    'children': [
      {
        'name': 'Relocation',
        'keyword': 'RelocationIndicator'
      },
      {
        'name': "Most Recent",
        'keyword' : "ExcludeJOAOpenFor30Days"
      },
      {
        'name': "Internship",
        'keyword' : "Internship"
      },
      {
        'name': "Recent Grad",
        'keyword' : "RecentGrad"
      },
    ]
  },
  {
    'name': 'Full Time',
    'keyword': 'fullTime',
    'children': [
      {
        'name': 'Relocation1',
        'keyword': 'RelocationIndicator1'
      },
      {
        'name': "Most Recent1",
        'keyword' : "ExcludeJOAOpenFor30Days1"
      },
      {
        'name': "Internship1",
        'keyword' : "Internship1"
      },
      {
        'name': "Recent Grad1",
        'keyword' : "RecentGrad1"
      },
    ]
  },
  {
    'name': 'Part Time1',
    'keyword': 'partTime1'
  }
];


export default FILTERS;