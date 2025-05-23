// api/postoffices.js
import data from '../lib/data.json'; // Assuming JSON is in /lib and inside Vercel build scope

export default function handler(req, res) {
  const { pincode } = req.query;

  if (!pincode) {
    return res.status(400).json({ error: "Missing 'pincode' query parameter" });
  }

  const filtered = data.Sheet1.filter(
    (entry) => entry.Pincode === pincode
  );

  if (filtered.length === 0) {
    return res.status(404).json({ message: 'No post office found for this pincode' });
  }

  return res.status(200).json(filtered);
}
