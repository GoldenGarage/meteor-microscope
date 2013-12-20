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

Template.postItem.rendered = function ()
{
    // animate post from previous position to new position

    var    instance = this;
    var       $this = $( this.firstNode );

    var        rank = instance.data._rank;
    var  postHeight = 80;
    var newPosition = rank * postHeight;

    // if element has a currentPosition (i.e. it's not the first ever render)
    if ( typeof( instance.currentPosition ) !== 'undefined' ) 
    {
        var previousPosition = instance.currentPosition;

        // calculate difference between old position and new position and send element there
        var delta = previousPosition - newPosition;
        $this.css("top", delta + "px");
    }

    // let it draw in the old position, then..
    Meteor.defer( function () 
                  {
                      instance.currentPosition = newPosition;

                      // bring element back to its new original position
                      $this.css( "top",  "0px" );
                  } ); 
};

Template.postItem.events({ 

    'click .upvotable': function ( e ) 
    { 
        e.preventDefault(); 

        Meteor.call( 'upvote', this._id ); 
    } 

});

