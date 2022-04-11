const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        email: String!
        password: String!
        type: String!
    }

    type Listing {
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }

    type Booking {
          listing_id: String!
          booking_id: String!
          booking_date:String! 
          booking_start:String!
          booking_end:String!
          username:String!
    }

    type Query {
        getUsers: [User]
        getListing: [Listing]
        getListingByTitle (id: ID!): Listing
        getListingByPostal(postal_code: String!): Listing
        getListingByCity(city: String! ): Listing
        getBooking : [Booking]
    }

    type Mutation {
        addUser(username: String!, firstname: String!,lastname: String!, email: String!, password: String!, type: String!): User!
        login(username: String!, password: String!): String!
        addListing( listing_id: String!, listing_title: String!, description: String!, street: String!,city:String!,postal_code:String!,price: Float!, email: String!, username: String!): Listing!
        addBooking(listing_id: String!,booking_id:String!,booking_date:String!, booking_start:String!, booking_end:String! ,username:String!) : Booking
    }
`