
Template.bandPage.helpers({
    Events: function() {
        console.log(this);
        return Events.find({eventBandName: this.bandName});
    }
});
