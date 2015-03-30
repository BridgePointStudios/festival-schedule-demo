Meteor.subscribe("events");
Template.eventsList.helpers({
    bands: function() {
        return Events.find({}, {sort: {eventDate: 1}});
    }
});
