Template.billingDashboard.helpers({
    msauRevenueCollection: function()
    {
    	return GetAllRevenueForMSAU(this.bandName);
    }

});

function GetAllRevenueForMSAU(mBandName)
{

	//Months are in the format YYYY-MM e.g. 2012-08

	var allBandEvents = Events.find();
	var associativeRev = {};

    var amountDue = {};
	//List of all events for all bands
	allBandEvents.forEach(function(currentEvent)
	{
        var billingBandName = currentEvent.eventBandName;

		//date is a native Javascript Date object.
		var date = currentEvent.eventStartTime;
		var dateString = moment(date).format('YYYY-MM');
		var dateAmount = 0;
		if (associativeRev[billingBandName] == undefined)
		{
			associativeRev[billingBandName] = 0;
		}
		associativeRev[billingBandName] += Number(currentEvent.eventBandPayment);
	});

	var tableCollection = [];
        
	for (var key in associativeRev)
	{
		tableCollection.push({
            BandName: key,

            'Total Gig Income':accounting.formatMoney(associativeRev[key]),
            'Amount Due to MSAU': accounting.formatMoney(associativeRev[key]/10)});

	}



	return tableCollection;
}
