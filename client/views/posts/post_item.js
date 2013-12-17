var extractDomainFromThisUrl = function()
{
    var a = document.createElement('a');

    a.href = this.url;

    var domain = a.hostname;

    return domain;
}

Template.postItem.helpers({    

    domain: extractDomainFromThisUrl,
                              
    ownPost: function() 
    { 
        return this.userId == Meteor.userId(); 
    },

    upvotedClass: function() 
    { 
        var userId    = Meteor.userId();
        var userVoted = _.include( this.upvoters, userId );

        return ( userId && ! userVoted ) ? "btn-primary upvotable" : "disabled";
    },
});

Template.postItem.events({ 

    'click .upvotable': function ( e ) 
    { 
        e.preventDefault(); 

        Meteor.call( 'upvote', this._id ); 
    } 

});

