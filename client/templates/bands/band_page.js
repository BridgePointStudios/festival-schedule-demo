
Template.bandPage.helpers({
    Events: function() {
        console.log(this);
        return Events.find({eventBandName: this.bandName});
    },
    onBandPage: function() {
        return true;
    },

    bandRevenueCollection: function()
    {
    	return GetAllRevenueForBand(this.bandName);
    },

    settings: function(){
    	return {
    		rowsPerPage: 10,
    		showFilter: true,
    		fields: [
    			{ key:'Month'},
				{ key: 'Subtotal'}
				]
    	};
    }
    
});

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function GetRevenueForMonth(mBandName,mMonth)
{
	return getRandomInt(500,1500);
}

function GetAllRevenueForBand(mBandName)
{

	//Months are in the format YYYY-MM e.g. 2012-08

	var allBandEvents = Events.find({eventBandName: mBandName});
	var associativeRev = {};
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
		tableCollection.push({Month: key,Subtotal: associativeRev[key]});
	
	}



	return tableCollection;
}
