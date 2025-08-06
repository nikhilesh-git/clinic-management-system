const express = require('express');
const pool = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.post('/', async (req, res) => {
  const { patient_id, receptionist_id, amount, details } = req.body;
  const result = await pool.query(
    'INSERT INTO bills (patient_id, receptionist_id, amount, details) VALUES ($1, $2, $3, $4) RETURNING *',
    [patient_id, receptionist_id, amount, details]
  );
  await logAction(receptionist_id, 'CREATE', 'bills', result.rows[0].id);
  res.status(201).json(result.rows[0]);
});

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM bills');
  res.json(result.rows);
});

module.exports = router;