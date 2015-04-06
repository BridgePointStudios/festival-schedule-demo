Events = new Mongo.Collection('events');

Events.attachSchema(new SimpleSchema({
    eventTitle: {
        type: String,
        label: "Event Title"
    },
    eventBandName: {
        type: String,
        label: "Band Name"
    },
    eventVenueName: {
        type: String,
        label: "Venue Name"
    },
    eventStartTime: {
        type: Date,
        label: "Event Start Time"
    },
    eventStopTime: {
        type: Date,
        label: "Event Stop Time"
    },
    eventCost: {
        type: String,
        label: "Event Cost"
    },
    showNotes: {
        type: String,
        label: "Show Notes",
        optional: true
    },
    showSponsor: {
        type: String,
        label: "Show Sponsor",
        optional: true
    }

}));
