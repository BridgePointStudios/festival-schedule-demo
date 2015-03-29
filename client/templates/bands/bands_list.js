Meteor.subscribe("bands");
Template.bandsList.helpers({
    bands: function() {
        return Bands.find({}, {sort: {bandName: 1}});
    }
});
