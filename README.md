#### 
`
'2019-06-06 20:00:00.000 2456 : INFO : A thread started'`
`
## Usage
```javascript
  let lang = 'fr'; // en etc to determine date format (with momentjs)
  let pattern = "%date(locale:'" + lang + "') : %integer(name:'pid') : %string(name:'type') : %string(name:'description')";
  let rows = ['2019-06-06 20:00:00.000 2456 : INFO : A thread started'];
  let res = await new Parser().parse(lang, rows, new Pattern(pattern).pattern(), 'filename', 'path'); // or new Parser().parse(...).then(...)
  console.log(res);
```


## Output
```
{ "pattern":
   [ { "key": 'date', "formats": [Array], "separator": ' : ' },
     { "key": 'integer', "formats": [Array], "separator": ' : ' },
     { "key": 'string', "formats": [Array], "separator": ' : ' },
     { "key": 'string', "formats": [Array], "separator": -1 } ],
  "name": "filename",
  "path": "path'",
  "data":
   [ { "keywords": [Array],
       "date": [Array],
       "time": [Array],
       "formats": [],
       "originalDate": "2019-06-06 20:00:00.000 2456",
       "pid": 2456,
       "type": "INFO",
       "description": "A thread started" } ],
  "nRows": 1 }
```
