Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('bands'),
                Meteor.subscribe('venues'),
                Meteor.subscribe('events')
              ];
    }
    });



Router.route('/', {name: 'landing'});
Router.route('/bands', {name: 'bandsList'});
Router.route('/addNewBand', {name: 'addNewBand'});

Router.route('/bands/:bandName', {
    name: 'bandPage',
    data: function() {return Bands.findOne({bandName: this.params.bandName});}
});

Router.route('/bands/:bandName/edit', {
    name: 'bandEdit',
    data: function() {return Bands.findOne({bandName: this.params.bandName});}
});


Router.route('/venues', {name: 'venuesList'});
Router.route('/addNewVenue', {name: 'addNewVenue'});

Router.route('/venues/:venueName', {
    name: 'venuePage',
    data: function() {return Venues.findOne({venueName: this.params.venueName});}
});

Router.route('/venues/:venueName/edit', {
    name: 'venueEdit',
    data: function() {return Venues.findOne({venueName: this.params.venueName});}
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

Router.route('/testthis', function(){

    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(24);
    doc.text('Booking Agreement');
    this.response.writeHead(200, {'Content-type': 'application/pdf', 'Content-Disposition': "attachment; contract.pdf"});
    this.response.end(doc.outputSync());

},
{
  where: 'server'
});
