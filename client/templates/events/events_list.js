
Template.eventsList.helpers({
    events: function() {
        return Events.find({}, {sort: { eventStartTime: 1 }});
    }
});

Template.eventsList.rendered = function()
{
	//Fires once the page is rendered.
	myCursor = Events.find();
	var myEvents = [];
	myCursor.forEach(function(currentEvent) {
		var bandName = currentEvent.eventBandName;
		var venueName = currentEvent.eventVenueName;
		var eventTitle = bandName + " @ " + venueName;

		var tempEvent = {
			title: eventTitle,
			start: moment(currentEvent.eventStartTime),
			allDay: true
		}
		$('#myCalendar').fullCalendar('renderEvent',tempEvent,true);
	});

	
	
}
