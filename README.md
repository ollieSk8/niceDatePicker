# Nice Date Picker

Nice DatePicker with support for date ranges and no jquery dependency, easy styling and more.

# Example

[Demo Page](https://olliesk8.github.io/niceDatePicker/)

# Use Setup

### Install nice-date-picker

``` bash
npm install nice-date-picker --save
```

### UsAge

``` javascript
// import
import niceDatePicker from 'nice-date-picker'

// or require
var niceDatePicker  = require('nice-date-picker')


// or script

<link rel="stylesheet" href="../nice-date-picker.css">
<script src="../nice-date-picker.js"></script>

```

### example

``` javascript

new niceDatePicker({
   dom:document.getElementById('calendar1-wrapper1'),
   onClickDate:function(date){
       document.querySelector('.calendar1-msg').innerHTML='calendar1 your selected '+date;
   }
});

new niceDatePicker({
    dom:document.getElementById('calendar1-wrapper2'),
    year:2017,
    month:5,
    mode:'en',
    onClickDate:function(date){
        document.querySelector('.calendar2-msg').innerHTML='calendar2 your selected '+date;
    }
});

```

# Options

| Option | Description |
| ----- | ----- |
| dom | the outer wrapper for the calendar instance （html dom）|
| year | calendar instance year |
| month | calendar instance year |
| mode | calendar instance Language default zh|


# License

MIT