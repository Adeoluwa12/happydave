const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user');
const Donation = require('../models/donate')


router.get('/', (req, res) => {
    res.render('home')
});

router.get('/about', (req, res) => {
    res.render('about')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

router.get('/orphanage', (req, res) => {
    res.render('orphanage')
});

router.get('/donate', (req, res) => {
    res.render('donate')
});

router.get('/thank', (req, res) => {
    res.render('thank')
});




// Route to render the donation form
router.get('/donatee', (req, res) => {
  res.render('donate');
});

// Route to handle the donation submission
router.post('/donatee', async (req, res) => {
  try {
    // Extract donation amount and other necessary details from the form
    const { amount, email, fullname } = req.body;

    // Create a unique reference for the transaction
    const transactionRef = `ORPHANAGE_${Date.now()}`;

    // Construct the payload for the Flutterwave API
    const payload = {
      tx_ref: transactionRef,
      amount,
      currency: 'NGN', // Replace with your preferred currency
      payment_type: 'card',
      redirect_url: '/donatee/callback', // Replace with your callback URL
      meta: {
        fullname,
        email,
      },
      customizations: {
        title: 'Orphanage Donation',
        description: 'Donation to support the orphanage',
      },
    };

    // Make an API request to Flutterwave to initialize the payment
    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    );

    // Save the donation details to the database
    const donation = new Donation({
      transactionRef,
      amount,
      fullname,
      email,
      status: 'pending',
    });
    await donation.save();

    // Redirect the user to the payment page on Flutterwave
    res.redirect(response.data.data.link);
  } catch (error) {
    console.error('Error processing donation:', error.message);
    res.status(500).send('Error processing donation');
  }
});

// Route for handling the Flutterwave callback after payment
router.get('/donatee/callback', async (req, res) => {
  try {
    // Retrieve transaction reference and other payment details from the request query
    const { tx_ref, transaction_id, status, amount } = req.query;

    // Find the corresponding donation in the database by transaction reference
    const donation = await Donation.findOne({ transactionRef: tx_ref });

    if (!donation) {
      return res.status(404).send('Donation not found');
    }

    // Update the donation status in the database based on the payment status
    donation.status = status;
    await donation.save();

    // Render the donation status page with the details
    res.render('donation_callback', { donation });
  } catch (error) {
    console.error('Error processing donation callback:', error.message);
    res.status(500).send('Error processing donation callback');
  }
});





module.exports = router