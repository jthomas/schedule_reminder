define(["../compose/compose"], function (compose) {
    var all_calendars = "https://www.google.com/calendar/feeds/default/owncalendars/full"; 

    return compose(function (google) {
        this.google = google;
        this.service = new google.gdata.calendar.CalendarService("Calendar");
    }, {
        link: null,
        title: "",
        summary: "",

        save: function () {
            var entry = new this.google.gdata.calendar.CalendarEntry();

            entry.setTitle(this.google.gdata.atom.Text.create(this.title));
            entry.setSummary(this.google.gdata.atom.Text.create(this.summary));

            var hidden = new google.gdata.calendar.HiddenProperty();
            hidden.setValue(false);
            entry.setHidden(hidden);

            this.service.insertEntry(all_calendars, entry, this._saved, 
                this._error, this.google.gdata.calendar.CalendarEntry);
        },
        add_event: function (details) {

        },
        _saved: function () {
            console.log("saved", this);
        },
        _error: function () {
            console.log("error");
        }
    });
});
