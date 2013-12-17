// Fixture data 

if ( Posts.find().count() === 0 ) 
{
    var now = new Date().getTime();

    // create user tom ------------------------------------------------------------------------------------------------
    var tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman' }
    });

    var tom = Meteor.users.findOne( tomId );


    // create user sascha ---------------------------------------------------------------------------------------------
    var sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif' }
    });

    var sacha = Meteor.users.findOne( sachaId );


    // create telescope post ------------------------------------------------------------------------------------------
    var telescopeId = Posts.insert({

                       title: 'Introducing Telescope',
                      userId: sacha._id,
                      author: sacha.profile.name,
                         url: 'http://sachagreif.com/introducing-telescope/',
                   submitted: now - 7 * 3600 * 1000,
               commentsCount: 2,
                    upvoters: [], 
                       votes: 0
    });

    // create a comment to the telescope post -------------------------------------------------------------------------
    Comments.insert({

                      postId: telescopeId,
                      userId: tom._id,
                      author: tom.profile.name,
                   submitted: now - 5 * 3600 * 1000,
                        body: 'Interesting project Sacha, can I get involved?'
    });

    // create another comment to the telescope post (reply to the first comment) --------------------------------------
    Comments.insert({

                      postId: telescopeId,
                      userId: sacha._id,
                      author: sacha.profile.name,
                   submitted: now - 3 * 3600 * 1000,
                        body: 'You sure can Tom!'
    });

    // create meteor post ---------------------------------------------------------------------------------------------
    Posts.insert({

                       title: 'Meteor',
                      userId: tom._id,
                      author: tom.profile.name,
                         url: 'http://meteor.com',
                   submitted: now - 10 * 3600 * 1000,
               commentsCount: 0,
                    upvoters: [], 
                       votes: 0
    });

    // create meteor book post ----------------------------------------------------------------------------------------
    Posts.insert({

                       title: 'The Meteor Book',
                      userId: tom._id,
                      author: tom.profile.name,
                         url: 'http://themeteorbook.com',
                   submitted: now - 12 * 3600 * 1000,
               commentsCount: 0,
                    upvoters: [], 
                       votes: 0
    });

    // add a bunch of random posts ------------------------------------------------------------------------------------
    for ( var i = 0; i < 10; i++ )
    {
        Posts.insert({

                       title: 'Test post # ' + i,
                      userId: sacha._id,
                      author: sacha.profile.name,
                         url: 'http://google.com?q=test-' + i,
                   submitted: now - i * 3600 * 1000,
               commentsCount: 0,
                    upvoters: [], 
                       votes: 0
        });
    }
}
