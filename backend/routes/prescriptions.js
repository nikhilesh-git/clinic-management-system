const express = require('express');
const pool = require('../db');
const logAction = require('../utils/logger');
const router = express.Router();

router.post('/', async (req, res) => {
  const { patient_id, doctor_id, notes, items } = req.body;
  const result = await pool.query(
    'INSERT INTO prescriptions (patient_id, doctor_id, notes) VALUES ($1, $2, $3) RETURNING *',
    [patient_id, doctor_id, notes]
  );
  const prescription_id = result.rows[0].id;
  for (let item of items) {
    await pool.query(
      'INSERT INTO prescription_items (prescription_id, medicine_name, dosage, duration) VALUES ($1, $2, $3, $4)',
      [prescription_id, item.medicine_name, item.dosage, item.duration]
    );
  }
  await logAction(doctor_id, 'CREATE', 'prescriptions', prescription_id);
  res.status(201).json({ id: prescription_id });
});

router.get('/:id', async (req, res) => {
  const pres = await pool.query('SELECT * FROM prescriptions WHERE id = $1', [req.params.id]);
  const items = await pool.query('SELECT * FROM prescription_items WHERE prescription_id = $1', [req.params.id]);
  res.json({ ...pres.rows[0], items: items.rows });
});

module.exports = router;
