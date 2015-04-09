Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [Meteor.subscribe('bands'),
                Meteor.subscribe('venues'),
                Meteor.subscribe('events') ,
                Meteor.subscribe('bandEvents')
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

Router.route('/getPDF', function() {
    var pdfBandName = "pdfBandName";
    var pdfCreatedDate = "12/14/14";
    var pdfVenueName = "pdfVenueName";
    var pdfNumberMusicians = "pdfNumberMusicians";
    var pdfVenueAddress = "pdfVenueAddress";
    var pdfShowDateStart = "pdfShowDateStart";
    var pdfShowDateStop = "pdfShowDateStop";
    var pdfBandPayment = "pdfBandPayment";
    var pdfBandPayee = "pdfBandPayee";
    var pdfPaProvided = "pdfPaProvided";
    var pdfTabProvided = "pdfTabProvided";
    var pdfMerchandise = "pdfMerchandise";
    var pdfLodging = "pdfLodging";

    var doc = new PDFDocument({size: 'A4', margin: 50});
    doc.fontSize(24);
    doc.text('Booking Agreement');
    doc.fontSize(12);
    doc.text("This contract entered into on the date of " + pdfCreatedDate + " is for the personal " +
        "services of the listed performer for the performance described below. It indicates " +
        "that the undersigned purchaser, " + pdfVenueName + ", the undersigned performer, " +
        pdfBandName + " and Muscle Shoals Artists Unlimited (hereafter referred to as AGENT) agree " +
        "and contract as follows: " );
    doc.text(" ");
    doc.text("1. Name of Musician or Band: " + pdfBandName);
    doc.text("2. Number of Musicians: " + pdfNumberMusicians);
    doc.text("3. Name and Address of Place of Performance:");
    doc.text(pdfVenueAddress);
    doc.text("4. Date and Time of Performance:");
    doc.text(pdfShowDateStart + " until " + pdfShowDateStop);
    doc.text("5. Wage and Deposit Agreed Upon:" + pdfBandPayment);
    doc.text("6. At the end of the performance, payment is to be made to the following " +
        "in either U.S. currency or certified check: " + pdfBandPayee);
    doc.text("7. Additional Terms:");
    doc.text("PA: " + pdfPaProvided);
    doc.text("Food & Beverage Tab: " + pdfTabProvided);
    doc.text("Merchandise: " + pdfMerchandise);
    doc.text("Lodging: " + pdfLodging);
    doc.text(" ");
    doc.text("This contract constitutes a complete and binding agreement between the employer and the musician(s). ");
    doc.text("AGENT acts only as agent and assumes no responsibility as between the employer and the musician(s). ");
    doc.text("In case of breach of this contract by Employer, the Employer agrees to pay the amount stated in " +
        "Section 6 as mitigated damages, plus reasonable attorney's fees, court costs, and legal interest. ")
    doc.text(" ");
    doc.text("The persons signing for Employer and Musician(s) agree to be personally, jointly and severally "+
        "liable for the terms of this contract.");
    doc.text(" ");
    doc.text("For MSAU: ");
    doc.text(" ");
    doc.text("________________");
    doc.text(" ");
    doc.text("For Purchaser: ");
    doc.text(" ");
    doc.text("________________");
    doc.text(" ");
    doc.text("For Artist: ");
    doc.text(" ");
    doc.text("________________");

    this.response.writeHead(200, {
        'Content-type': 'application/pdf',
        'Content-Disposition': "attachment; contract.pdf"
    });
    this.response.end( doc.outputSync() );
}, {where: 'server'});
