const express = require('express');
const axios = require('axios');
const router = express.Router();

const ZEPTO_API_BASE_URL = 'https://sandbox-api.zepto.money';
const ZEPTO_API_KEY = process.env.API_KEY_ZEPTO;

// Example route for creating a PayID payment
router.post('/create', async (req, res) => {
  try {
    const { amount, payId, description } = req.body;

    // Build the request for the Zepto API
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ZEPTO_API_KEY,
      },
    };

    const data = {
      amount,
      payId,
      description,
    };

    // Call the Zepto API to create a payment
    const response = await axios.post(`${ZEPTO_API_BASE_URL}/v1/payments`, data, config);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add more routes for other
// Example route for fetching payment status
router.get('/status/:paymentId', async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
  
      // Build the request for the Zepto API
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ZEPTO_API_KEY,
        },
      };
  
      // Call the Zepto API to fetch payment status
      const response = await axios.get(`${ZEPTO_API_BASE_URL}/v1/payments/${paymentId}`, config);
  
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Example route for updating payment details
  router.patch('/update/:paymentId', async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const { description } = req.body;
  
      // Build the request for the Zepto API
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ZEPTO_API_KEY,
        },
      };
  
      const data = {
        description,
      };
  
      // Call the Zepto API to update payment details
      const response = await axios.patch(`${ZEPTO_API_BASE_URL}/v1/payments/${paymentId}`, data, config);

      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  
  