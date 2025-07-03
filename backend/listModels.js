const axios = require('axios');

const GEMINI_API_KEY = 'AIzaSyBSWvhxBzr1aSABgjHbG6XeP0vMpUzIS94'; // Replace with your actual key

axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`)
  .then(res => {
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch(err => {
    console.error(err.response?.data || err.message);
  });