const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await pool.query('SELECT id, name, email, role FROM users');
  res.json(users.rows);
});

module.exports = router;