const swag = require('../models/swag');


module.exports = {
    add: ( req, res, next ) => {
        const { id } = req.query;
        let { cart } = req.session.user;

        //this will return -1 if it isn't in the cart
        const index = cart.findIndex( swag => swag.id == id );

        if ( index === -1 ) {
            const selectSwag = swag.find( swag => swag.id == id );

            cart.push( selectSwag );
            req.session.user.total += selectSwag.price;
        }
        res.status(200).send( req.session.user );
    },
    delete: ( req, res, next ) => {
        const { id } = req.query;
        const { cart } = req.session.user;
       

        const selectedSwag = swag.find( swag => swag.id == id );

        if ( selectedSwag ) {
            const i = cart.findIndex( swag => swag.id == id);
            cart.splice(i, 1);
            req.session.user.total =+ selectedSwag.price; 
        }
        res.status(200).send( req.session.user );
    },
    checkout: ( req, res, next ) => {
        const { user } = req.session;
        user.cart = [];
        user.total = 0;

        res.status(200).send( req.session.user );
    },
}
