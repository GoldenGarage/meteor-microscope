Router.configure({ 
     layoutTemplate: 'layout', 
    loadingTemplate: 'loading',
             waitOn: function () { return [ Meteor.subscribe( 'notifications' ) ]; }
});

var PostsController = RouteController.extend({

       template: 'posts',

      increment: 5, 

          limit: function() 
                 { 
                     return parseInt( this.params.limit ) || this.increment; 
                 },

    findOptions: function() 
                 {
                     return { sort: { submitted: -1 }, limit: this.limit() };
                 },

         waitOn: function() 
                 {
                     return Meteor.subscribe( 'posts', this.findOptions() );
                 },

           data: function() 
                 {
                     return {     posts: Posts.find( {}, this.findOptions() ),
                               nextPath: this.route.path({ limit: this.limit() + this.increment }) 
                            };
                 }
});

var waitOnPostPageCollections = function () 
{
    return [ Meteor.subscribe( 'singlePost', this.params._id ),
             Meteor.subscribe( 'comments',   this.params._id )
           ]; 
}

var waitOnEditPostPageCollections = function () 
{
    return [ Meteor.subscribe( 'singlePost', this.params._id )
           ]; 
}

var thisPost = function () 
{
    return function () { return Posts.findOne( this.params._id ); }; 
}

Router.map( 
    function()
    {
        this.route( 'postPage',   {               path: '/posts/:_id', 
                                                waitOn: waitOnPostPageCollections,
                                                  data: thisPost()
                                  } );

        this.route( 'postEdit',   {               path: '/posts/:_id/edit',
                                                waitOn: waitOnEditPostPageCollections,
                                                  data: thisPost()
                                  } );

        this.route( 'postSubmit', {               path: '/submit',
                                       disableProgress: true
                                  } );

        this.route( 'posts',      {               path: '/:limit?',
                                            controller: PostsController
                                  } );
    });

var requireLogin = function()
{
    if ( ! Meteor.user() )
    {
        if ( Meteor.loggingIn() )
        {
            this.render( this.loadingTemplate );
        }
        else
        {
            this.render( 'accessDenied' );
        }

        this.stop();
    }
}

// require login before routing to /submit
Router.before( requireLogin, { only: 'postSubmit' } );

// clear notifications before routing (to any path)
Router.before( function() { clearErrors() } );
