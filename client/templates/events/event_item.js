var DateFormats = {
       short: "h:mm a",
       long: "MMMM Do YYYY, h:mm a"
};

Template.registerHelper("formatStartTime", function(eventStartTime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(eventStartTime).format(format);
  }
  else {
    return eventStartTime;
  }
});

Template.registerHelper("formatStopTime", function(eventStopTime, format) {
  if (moment) {
    // can use other formats like 'lll' too
    format = DateFormats[format] || format;
    return moment(eventStopTime).format(format);
  }
  else {
    return eventStopTime;
  }
});

Template.eventItem.events({
    'click .genpdf': function () {


    var evnt = Events.findOne(this._id);
    var band = Bands.findOne({bandName: evnt.eventBandName});
    var venue = Venues.findOne({venueName: evnt.eventVenueName});
    var pdfCreatedDate = new Date();



    var doc = new jsPDF();
    var margin = 0.5;
    // set properties on the document
    doc.setProperties({
    	title: 'MSAU Event Contract',
    	subject: 'This PDF represents a contract between a band, a venue, and an agency for an event.',
    	author: 'Muscle Shoals Artists Unlimited',
    	keywords: 'generated, javascript, web 2.0, ajax',
    	creator: 'MSAU'
    });
    doc.setDrawColor(0, 255, 0);

    doc.setFontSize(22);
    doc.text(20, 20, 'Muscle Shoals Artists Unlimited');
    doc.setFontSize(18);
    doc.text(20, 28, 'Booking Agreement');
    doc.setFontSize(12);
    doc.text(20, 40, 'This contract entered into on the date of ' + moment(pdfCreatedDate).format('MMMM Do YYYY') + ' is for the personal services ');
    doc.text(20, 46, 'of the listed performer for the performance described below. It indicates that');
    doc.text(20, 52, 'the undersigned purchaser, ' + venue.venueName );
    doc.text(20, 58, 'the undersigned performer, ' + band.bandName );
    doc.text(20, 64, 'and Muscle Shoals Artists Unlimited (hereafter referred to as AGENT)');
    doc.text(20, 70, 'agree and contract as follows: ');
    doc.text(20, 80, ' ');
    doc.text(20, 86, '1. Name of Musician or Band: ' + band.bandName);
    doc.text(20, 92, '2. Number of Musicians: ' + band.bandNumberMusicians);
    doc.text(20, 98, '3. Name and Address of Place of Performance:' );
    doc.text(26, 104, venue.venueName );
    doc.text(26, 110, venue.venueAddress.street );
    if(venue.venueAddress.street2 != 'undefined'){
        doc.text(26, 110, venue.venueAddress.street );
    }
    else {
        doc.text(26, 110, venue.venueAddress.street + ' - ' +  venue.venueAddress.street2 );
    };
    doc.text(26, 116, venue.venueAddress.city + ', ' + venue.venueAddress.state + ', ' + venue.venueAddress.postalCode);
    doc.text(20, 122, '4. Date and Time of Performance: ' + moment(evnt.eventStartTime).format('MMMM Do YYYY, h:mm a') + ' until ' + moment(evnt.eventStopTime).format('h:mm a'));
    doc.text(20, 128, '5. Wage and Deposit Agreed Upon: ' + evnt.eventBandPayment);
    doc.text(20, 134, '6. At the end of the performance, payment is to be made to the following:');
    doc.text(26, 140, '(in either U.S. currency or certified check) ' + band.bandContactName);
    doc.text(20, 146, '7. Additional Terms:');
    doc.text(26, 152, 'PA: ' + evnt.eventPaProvided);
    doc.text(26, 158, 'Food & Beverage Tab: ' + evnt.eventTabProvided);
    doc.text(26, 164, 'Merchandise: ' + evnt.eventMerch);
    doc.text(26, 170, 'Lodging: ' + evnt.eventLodging);
    if (evnt.showNotes != undefined) {
        var allNotes = evnt.showNotes;
        var notes1stLine = allNotes.substring(0, 60);
        var notes2ndLine = allNotes.substring(61, 120);
        doc.text(26, 176, 'Notes: ' + notes1stLine);
    doc.text(40, 182, notes2ndLine);
};

    doc.setFontSize(10);
    doc.text(20, 188, 'This contract constitutes a complete and binding agreement between the employer and the musician(s).');
    doc.text(20, 194, 'AGENT acts only as agent and assumes no responsibility as between the employer and the musician(s).');
    doc.text(20, 200, 'In case of breach of this contract by Employer,');
    doc.text(26, 206, 'the Employer agrees to pay the amount stated in Section 6 as mitigated damages,');
    doc.text(26, 212, 'plus reasonable attorney\'s fees, court costs, and legal interest.');
    doc.text(20, 218, ' ');
    doc.text(20, 224, 'The persons signing for Employer and Musician(s) agree to be personally, jointly and severally liable');
    doc.text(26, 230, 'for the terms of this contract.');
    doc.text(20, 236, ' ');
    doc.text(20, 242, 'For MSAU:');
    doc.text(20, 248, ' ');
    doc.text(20, 254, '________________');
    doc.text(80, 242, 'For Purchaser:');
    doc.text(80, 248, ' ');
    doc.text(80, 254, '________________');
    doc.text(140, 242, 'For Artist:');
    doc.text(140, 248, ' ');
    doc.text(140, 254, '________________');

    doc.save(moment(evnt.eventStartTime).format('YYYY-MM-DD') + ' - ' + evnt.eventBandName + ' at ' + evnt.eventVenueName + '.pdf');
}
});

Template.eventItem.events({
    'click .send-contract': function () {
        var evnt = Events.findOne(this._id);
        var band = Bands.findOne({bandName: evnt.eventBandName});
        var venue = Venues.findOne({venueName: evnt.eventVenueName});

        Meteor.call('logSomething',band.bandContactEmail);


       Meteor.call('sendContract',
        band.bandContactEmail,
        'booking@muscleshoalsartists.com',
        'Here is your contract',
         "Band Name: " + band.bandName + "\n" + "Event Date: " + moment(evnt.eventStartTime).format('MMMM Do YYYY, h:mm a'));


}
});
