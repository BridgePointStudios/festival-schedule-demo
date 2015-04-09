Bands.permit(['insert','update','remove']).apply();
Venues.permit(['insert','update','remove']).apply();
Events.permit(['insert','update','remove']).apply();



if (Meteor.isServer) {
  Meteor.publish("bands", function () {
    return Bands.find();
  });
   Meteor.publish("venues", function () {
    return Venues.find();
  });
  Meteor.publish("events", function () {
    return Events.find();
  });
 Meteor.publish("bandEvents", function(id) {
    return Events.find({'eventBandName': id});
 });

}
