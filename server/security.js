Bands.permit(['insert','update','remove']).apply();
Venues.permit(['insert','update','remove']).apply();


if (Meteor.isServer) {
  Meteor.publish("bands", function () {
    return Bands.find();
  });
  Meteor.publish("venues", function () {
    return Venues.find();
  });

}
