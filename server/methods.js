Meteor.methods({
    sendContract: function( to, fromName, subject, text ) {
        check([to, fromName, subject, text], [String]);
        this.unblock();
        console.log('t');
        Email.send({
            to: to,
            from: fromName,
            subject: subject,
            text: text
        });
    }
});
