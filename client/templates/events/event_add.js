Template.addNewEvent.helpers({
    // adds bandName values to select box for addNewEvent
    bandNames: function () {
        return Bands.find().map(function (c) {
            return {label: c.bandName, value: c._id};
        });
    },
    // adds venueName values to select box for addNewEvent
    venueNames: function () {
        return Venues.find().map(function (c) {
            return {label: c.venueName, value: c._id};
        });
    }


});
