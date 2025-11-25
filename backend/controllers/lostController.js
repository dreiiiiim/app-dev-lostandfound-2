const pool = require('../config/db');

exports.createLost = async (req, res) => {
  try {
    // req.user.user_id comes from auth middleware
    const { item_name, category, description, location_lost, date_lost } = req.body;
    const user_id = req.user.user_id;
    const image_path = req.file ? `/uploads/${req.file.filename}` : null;

    const [result] = await pool.query(
      `INSERT INTO lost_items (user_id, item_name, category, description, location_lost, date_lost, image_path)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, item_name, category, description, location_lost, date_lost || null, image_path]
    );

    res.json({ message: 'Lost item posted', lost_id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllLost = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM lost_items ORDER BY date_posted DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { lost_id } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE lost_items SET status = ? WHERE lost_id = ?', [status, lost_id]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
