This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app)

PROPS:
  * searchQuery:    String that is passed as a search term.
  * searchFilters:  array of json filters that the consumer passes to this module, [searchFilters Example](#searchFilters-example).
  * sortCategories: array of json categories that the consumer passes ti this module, example.
  * appliedFilters: array of json filters set as input,
  * resultsPage:     
  * resultsPerPage: 
  * startingResult:  
  * searchResults:  array of object received as search response

## searchFilters Example
  const FILTERS = [
    "Remote",
    "Engineering",
    "Management",
    "Entry level",
    "Senior level",
    {
      "Job Type" : [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship"
      ]
    },
    {
      "State" : [
        "DC",
        {
          "VA" : [
            "Arlington",
            "Reston"
          ]
        },
        "GA"
      ]
    },
];

searchCategories example:
