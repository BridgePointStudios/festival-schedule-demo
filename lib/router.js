Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    });



Router.route('/', {name: 'landing'});
Router.route('/bands', {name: 'bandsList'});
Router.route('/addNewBand', {name: 'addNewBand'});

Router.route('/bands/:_id', {
    name: 'bandPage',
    data: function() {return Bands.findOne(this.params._id);}
});

Router.route('/bands/:_id/edit', {
    name: 'bandEdit',
    data: function() {return Bands.findOne(this.params._id);}
});


Router.route('/venues', {name: 'venuesList'});
Router.route('/addNewVenue', {name: 'addNewVenue'});

Router.route('/venues/:_id', {
    name: 'venuePage',
    data: function() {return Venues.findOne(this.params._id);}
});

Router.route('/venues/:_id/edit', {
    name: 'venueEdit',
    data: function() {return Venues.findOne(this.params._id);}
});

Router.route('/events', {name: 'eventsList'});
Router.route('/addNewEvent', {name: 'addNewEvent'});

Router.route('/events/:_id', {
    name: 'eventPage',
    data: function() {return Events.findOne(this.params._id);}
});

Router.route('/events/:_id/edit', {
    name: 'eventEdit',
    data: function() {return Events.findOne(this.params._id);}
});
