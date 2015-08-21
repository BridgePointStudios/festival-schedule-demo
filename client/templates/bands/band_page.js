
Template.bandPage.helpers({
    Events: function() {

        return Events.find({eventBandName: this.bandName});
    
    },
    onBandPage: function() {
        return true;
    },

    bandRevenueCollection: function()
    {
    	return GetAllRevenueForBand(this.bandName);
    },

//**RUSS this settings is not connected to the function call that runs the rest of this pagecode? it calls a named settings and this isn't names?
    settings: function(){
    	return {
    		rowsPerPage: 12,
    		showFilter: true,
    		fields: [
    			{ key:'Month'},
				{ key: 'Subtotal'}
				]
    	};
    }

});


Template.bandPage.rendered = function()
{
	//Fires once the page is rendered.

    //**RUSS - the myCursor needs to be edited to make it only contain events for this.bandName
    // similar to the .helper at the top, or the billing function, it's working to populate the
    // calendar but with all data. note that 'this.bandName' is undefinded here even though it works above
	myCursor = Events.find();

	var myEvents = [];
	myCursor.forEach(function(currentEvent) {
		var bandName = currentEvent.eventBandName;
		var venueName = currentEvent.eventVenueName;
		var eventTitle = bandName + " @ " + "\n" + venueName;

		var tempEvent = {
			title: eventTitle,
			start: moment(currentEvent.eventStartTime),
			allDay: true
		};

		$('#myCalendar').fullCalendar('renderEvent',tempEvent,true);
	});



}

function GetAllRevenueForBand(mBandName)
{
	//Months are in the format YYYY-MM e.g. 2012-08
	var allBandEvents = Events.find({eventBandName: mBandName});
	var associativeRev = {};
    var amountDue = {};
	//List of all events for this band
	allBandEvents.forEach(function(currentEvent)
	{
		//date is a native Javascript Date object.
		var date = currentEvent.eventStartTime;
		var dateString = moment(date).format('YYYY-MM');
		var dateAmount = 0;
		if (associativeRev[dateString] == undefined)
		{
			associativeRev[dateString] = 0;
		}
		associativeRev[dateString] += Number(currentEvent.eventBandPayment);
	});

	var tableCollection = [];
	for (var key in associativeRev)
	{
		tableCollection.push({Month: key,'Total Gig Income':  accounting.formatMoney(associativeRev[key]),'Amount Due to MSAU': accounting.formatMoney(associativeRev[key]/10)});

	}

	return tableCollection;
}
//**RUSS was the rest of this just something you used for testing?
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRevenueForMonth(mBandName,mMonth)
{
	return getRandomInt(500,1500);
}
