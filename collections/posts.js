Posts = new Meteor.Collection( 'posts' );

Posts.allow({
    update: isOwner,
    remove: isOwner
});

Posts.deny({
    update: 
    function( userId, post, fieldNames ) 
    {
        // may only edit the following two fields:
        return ( _.without( fieldNames, 'url', 'title' ).length > 0 );
    }
});

Meteor.methods({

    post: function( postAttributes )
    {
        var             user = Meteor.user();
        var postWithSameLink = Posts.findOne( { url: postAttributes.url } );
        
        var      notSignedIn = ! user;
        var          noTitle = ! postAttributes.title;
        var urlAlreadyExists = postAttributes.url && postWithSameLink;

        if ( notSignedIn      ) throw new Meteor.Error( 401, "You need to Sign In to post new stories." );
        if ( noTitle          ) throw new Meteor.Error( 422, "A Title is required." );
        if ( urlAlreadyExists ) throw new Meteor.Error( 302, "This link has already been posted.", postWithSameLink._id );

        var allowedAttributes = _.pick( postAttributes, 'url', 'message', 'title' );

        var post = _.extend( allowedAttributes,
                             {
                                        userId: user._id,
                                        author: user.username,
                                     submitted: new Date().getTime(),
                                 commentsCount: 0,
                                      upvoters: [], 
                                         votes: 0
                             });

        var postId = Posts.insert( post );

        return postId;
    },

    upvote: function ( postId )
    {
        var user = Meteor.user();

        if ( ! user ) throw new Meteor.Error( 401, "You need to login to upvote" );

        Posts.update( {         _id: postId, 
                           upvoters: {      $ne: user._id }
                      },
                      {
                          $addToSet: { upvoters: user._id },
                               $inc: {    votes: 1        }
                      } 
                    );
    }
});

