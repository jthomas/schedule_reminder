var gspreadsheet = require('google-spreadsheets'),
    sys = require('sys');

var days_of_the_week = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

var print_week = function (week, num) {
    sys.puts("Week " + num);
    days_of_the_week.forEach(function (day) {
        sys.puts(day + ": " + week[day]);
    });
};

gspreadsheet({
    key: "0An1xGHsgw2ledDNQWmhxenZ2RW9ocGNCZHJhT09mRUE"
}, function(err, spreadsheet) {
    var ws = spreadsheet.worksheets[0];
        
    ws.rows(null, function(err, weeks) {
        sys.puts("Found schedule for " + weeks.length + " weeks");

        weeks.forEach(print_week);
    });
});

