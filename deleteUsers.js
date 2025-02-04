const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');

// Configuration
const apiUrl = 'https://rest.iad-0X.braze.com/users/delete'; 
const apiKey = 'your_API_Key';
const batchSize = 50; 

// CSV reader function
const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const externalIds = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        if (row.external_id) {
          externalIds.push(row.external_id);
        }
      })
      .on('end', () => {
        resolve(externalIds);
      })
      .on('error', reject);
  });
};

// Delete users batches function
const deleteUsersInBatches = async (externalIds) => {
  for (let i = 0; i < externalIds.length; i += batchSize) {
    const batch = externalIds.slice(i, i + batchSize);
    try {
      const response = await axios.post(apiUrl, {
        external_ids: batch
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      console.log(`Batch ${Math.floor(i / batchSize) + 1}: Success`, response.data);
    } catch (error) {
      console.error(`Batch ${Math.floor(i / batchSize) + 1}: Error`, error.response ? error.response.data : error.message);
    }
  }
};

// Here you will execute your functions
const filePath = 'path/users.csv';

readCSV(filePath)
  .then(deleteUsersInBatches)
  .catch((error) => {
    console.error('Error at reading the CSV file:', error.message);
  });