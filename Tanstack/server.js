import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory list
let items = ['Learn TanStack Query', 'Understand Redux State', 'Build Express Server'];

// Fetch items
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Add new item
app.post('/api/items', (req, res) => {
  const { text } = req.body;
  if (text) {
    items.push(text);
  }
  res.json(items);
});

app.listen(3001, () => {
  console.log('Server running on http://localhost:3001');
});
