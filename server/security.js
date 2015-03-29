Bands.permit(['insert','update','remove']).apply();

if (Meteor.isServer) {
  Meteor.publish("bands", function () {
    return Bands.find();
  });
}
