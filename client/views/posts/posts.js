Template.posts.helpers({ 

    hasMorePosts: function() 
           { 
               this.posts.rewind();

               return Router.current().limit &&
                      ( Router.current().limit() == this.posts.fetch().length );
           } 

});
