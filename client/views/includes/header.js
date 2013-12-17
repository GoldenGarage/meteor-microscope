Template.header.helpers({

    activeRouteClass: function( /* route names */ ) 
    {
        // convert arguments to an array, and pop off the extra element added by Meteor
        var args = Array.prototype.slice.call( arguments, 0 );
        args.pop();

        // are any of the args names for the current route?
        var active = _.any( args, function ( name ) { return Router.current().route.name === name } );

        return active && 'active';
    }
});
