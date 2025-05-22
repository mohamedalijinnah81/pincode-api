// api/postoffices.js
const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const { pincode } = req.query;

  if (!pincode) {
    return res.status(400).json({ error: "Missing 'pincode' query parameter" });
  }

  // Read and parse the JSON file
  const filePath = path.join(__dirname, '..', 'data.json');
  const rawData = fs.readFileSync(filePath);
  const data = JSON.parse(rawData);

  // Filter data by pincode
  const filtered = data.Sheet1.filter(
    (entry) => entry.Pincode === pincode
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No post office found for this pincode' });
  }

  return res.status(200).json(filtered);
};
