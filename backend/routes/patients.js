const express = require('express');
const pool = require('../db');
const logAction = require('../utils/logger.js');
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await pool.query('SELECT * FROM patients');
  res.json(result.rows);
});


router.post('/', async (req, res) => {
  const { name, age, gender, phone, address } = req.body;
  const result = await pool.query(
    'INSERT INTO patients (name, age, gender, phone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, age, gender, phone, address]
  );
  await logAction(null, 'CREATE', 'patients', result.rows[0].id);
  res.status(201).json(result.rows[0]);
});

router.put('/:id', async (req, res) => {
  const { name, age, gender, phone, address } = req.body;
  const result = await pool.query(
    'UPDATE patients SET name=$1, age=$2, gender=$3, phone=$4, address=$5 WHERE id=$6 RETURNING *',
    [name, age, gender, phone, address, req.params.id]
  );
  await logAction(null, 'UPDATE', 'patients', req.params.id);
  res.json(result.rows[0]);
});

router.delete('/:id', async (req, res) => {
  await pool.query('DELETE FROM patients WHERE id = $1', [req.params.id]);
  await logAction(null, 'DELETE', 'patients', req.params.id);
  res.status(204).end();
});

module.exports = router;