const express = require('express');
const pool = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM tokens');
  res.json(result.rows);
});

router.post('/', async (req, res) => {
  const { patient_id, token_number, created_by } = req.body;
  const result = await pool.query(
    'INSERT INTO tokens (patient_id, token_number, created_by) VALUES ($1, $2, $3) RETURNING *',
    [patient_id, token_number, created_by]
  );
  await logAction(created_by, 'CREATE', 'tokens', result.rows[0].id);
  res.status(201).json(result.rows[0]);
});

module.exports = router;