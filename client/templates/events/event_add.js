Template.addNewEvent.helpers({
    // adds bandName values to select box for addNewEvent
    bandNames: function () {
        return Bands.find().map(function (c) {
            return {label: c.bandName, value: c.bandName};
        });
    },
    // adds venueName values to select box for addNewEvent
    venueNames: function () {
        return Venues.find().map(function (c) {
            return {label: c.venueName, value: c.venueName};
        });
    },
    // adds booking agent values to select box for addNewEvent
    eventBookingAgents: function () {
        return Agents.find().map(function (c) {
            return {label: c.agentName, value: c.agentName};
        });
    }


});
