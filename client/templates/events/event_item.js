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
