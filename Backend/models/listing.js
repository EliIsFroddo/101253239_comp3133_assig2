const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
  listing_id: {
    type: String,
    required: [true],
    unique: [true]
  },
  listing_title: {
    type: String,
    required: [true, 'Please enter the listing title'],
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  postal_code: {
    type:String,
    required:true,
    uppercase: true
  },
  price: {
      type:Number,
      required:true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,
    //Custom validation
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  username: {
    type: String,
    required: true,
    minlength: [6,'You are only allowed 6 characters'],
    trim: true
  }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;