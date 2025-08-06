const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM logs ORDER BY timestamp DESC');
  res.json(result.rows);
});

module.exports = router;