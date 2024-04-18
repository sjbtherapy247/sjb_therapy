// pages/api/data.js

  export default function handler(req, res) {
    switch (req.method) {
      case 'GET':
        res.status(200).json({ message: "You made a GET request" });
        break;
      case 'POST':
        // Handle POST request
        res.status(200).json({ message: "You made a POST request" });
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }