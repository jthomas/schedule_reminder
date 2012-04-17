define(["../compose/compose", "../dojo/_base/lang", "../dojo/_base/Deferred"], function (compose, lang, Deferred) {
    var all_calendars = "https://www.google.com/calendar/feeds/default/owncalendars/full"; 

    return compose(function (google) {
        this.google = google;
        this.service = new google.gdata.calendar.CalendarService("Calendar");
    }, {
        link: null,
        title: "",
        summary: "",

        save: function () {
            var entry = new this.google.gdata.calendar.CalendarEntry(),
                deferred = new Deferred();

            entry.setTitle(this.google.gdata.atom.Text.create(this.title));
            entry.setSummary(this.google.gdata.atom.Text.create(this.summary));

            var hidden = new google.gdata.calendar.HiddenProperty();
            hidden.setValue(false);
            entry.setHidden(hidden);

            this.service.insertEntry(all_calendars, entry, 
                lang.hitch(this, "_saved", deferred), lang.hitch(this, "_error", deferred), 
                this.google.gdata.calendar.CalendarEntry);

            return deferred.promise;
        },

        add_event: function (content) {
            var entry = new this.google.gdata.calendar.CalendarEventEntry();

            entry.setContent(new this.google.gdata.atom.Text.create(content));

            var quickAdd = new this.google.gdata.calendar.QuickAddProperty();
            quickAdd.setValue(true);
            
            entry.setQuickAdd(quickAdd);

            var callback = function (result) {
                console.log("added");
            };

            var handleError = function (error) {
                console.log("failed");
            };

            this.service.insertEntry(this.link, entry, callback, handleError, this.google.gdata.calendar.CalendarEventEntry);
        },

        _saved: function (deferred, result) {
            console.log("saved", this, result);
            this.link = result.entry.link[0].href;
            deferred.callback();
        },
        _error: function (deferred) {
            console.log("error");
            deferred.errback();
        }
    });
});
