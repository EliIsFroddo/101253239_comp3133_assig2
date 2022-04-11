
const Booking = require('./models/booking')
const User = require('./models/users');
const Listing = require('./models/listing');
const { compare } = require('bcrypt');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pick = require("lodash").pick;
const SECRET = "createaverystrongsec34!retthatalsoincludes2423412wdsa324e34e";

//const shieldMiddleware = require('shieldMiddleware');



exports.resolvers = {
    Query: {
        getUsers: async (parent, args,{user,isAdmin}) => {
            if (!user) {
                throw new Error("You are not logged in to access this information ");
              }
              if (!isAdmin){
                throw new Error("You are not Admin ");
              }
                          
            return User.find({});
        },
        getListingByTitle: async (parent, args) => {

          if (!user) {
            throw new Error("You are not logged in to access this information ");
          }
          if (!isAdmin){
            throw new Error("You are not Admin ");
          }

            return Listing.findById(args.id)
        },
        getListingByCity: async (parent, args) => {

          if (!user) {
            throw new Error("You are not logged in to access this information ");
          }
          if (!isAdmin){
            throw new Error("You are not Admin ");
          }

            return Listing.findByCity(args.city)
        },
        getListingByPostal: async (parent, args) => {

          if (!user) {
            throw new Error("You are not logged in to access this information ");
          }
          if (!isAdmin){
            throw new Error("You are not Admin ");
          }

            return Listing.findByPostal(args.postal_code)
        },
        getListing: async(parent, args) => {

          if (!user) {
            throw new Error("You are not logged in to access this information ");
          }
          if (!isAdmin){
            throw new Error("You are not Admin ");
          }
            return Listing.find({})
        },
        getBooking: async(parent, args) => {

          if (!user) {
            throw new Error("You are not logged in to access this information ");
          }
          if (isAdmin){
            throw new Error("You are not a Customer ");
          }
            return Booking.find({})
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            console.log(args)
           
            const newUser = User();
            newUser.username = args.username;
            newUser.firstname= args.firstname;
            newUser.lastname= args.lastname;
            newUser.email = args.email;
            newUser.password = await bcrypt.hash(args.password, 12);
            newUser.type= args.type;
           
            return newUser.save()
        },
        addListing: async (parent, args) => {
            console.log(args)
            const newListing = Listing();
            
            newListing.listing_id= args.listing_id;
            newListing.listing_title= args.listing_title;
            newListing.description = args.description;
            newListing.street =args.street;
            newListing.city= args.city;
            newListing.postal_code =args.postal_code
            newListing.price =args.price
            newListing.email =args.email 
            newListing.username = args.username;
            
            
            return newListing.save()
        },

        addBooking: async (parent, args) => {
            console.log(args)
            const newBooking = Booking();
            newBooking.listing_id = args.listing_id;
            newBooking.booking_id = args.booking_id;
            newBooking.booking_date= args.booking_date;
            newBooking.booking_start= args.booking_start;
            newBooking.booking_end= args.booking_end;
            newBooking.username = args.username;
            
            return newBooking.save()
        },

        async login(parent, { username, password }, { SECRET }) {
            // The secret is coming from the context that will pass to Apollo Server
            // the next lines basically check if the user exist or not
            const user = await User.findOne({ username })
            if (!user) {
              throw new Error('No user found ')
            }
         
            const findAdmin = await User.find({username});
              if(findAdmin.type == 'admin'){
                const isAdmin = true
              }


            // user.password contains the hashed password
            // we use bcrypt again to compare with the password from the args
            const isValid = await bcrypt.compare(password, user.password)
            if (!isValid) {
              throw new Error('Incorrect password ')
            }
            //   sign in the user
            // create the token specifically for the user and return the token
            // you can specify how long the token will take to expire, this is up to you
            
                     
            const token = await jwt.sign(
              {
                user: pick(user, ["_id", "username", "type"]),
               
              },
              SECRET,
              // this token will last for a day
              { expiresIn: '1d' }
            )
            
            return token
          },
    }
}



/* 


const permissions = {
  Query: {
    myQuery: isAdmin
  }
}
export default shield(resolvers, permissions);
*/