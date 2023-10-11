const mongoose = require('mongoose');


const donationSchema = new mongoose.Schema({
    transactionRef: {
         type: String,
          required: true 
        },
    amount: { 
        type: Number, 
        required: true 
    },
    fullname: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        required: true 
    },
},
 { timestamps: true });

module.exports.Donation = mongoose.model('Donation', donationSchema);