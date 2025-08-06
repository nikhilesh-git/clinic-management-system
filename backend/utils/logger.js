const pool = require('../db');

const logAction = async (userId, action, table, targetId) => {
  try {
    await pool.query(
      'INSERT INTO logs (user_id, action, target_table, target_id) VALUES ($1, $2, $3, $4)',
      [userId, action, table, targetId]
    );
  } catch (err) {
    console.error('Logging error:', err.message);
  }
};

module.exports = logAction;
