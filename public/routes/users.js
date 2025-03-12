const express = require('express');
const db = require('../db/dbconfig');
const router = express.Router();

router.get('/', (req, res) => {
  const query = `SELECT * FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  db.get(query, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(row);
  });
});

router.post('/', (req, res) => {
  const { nombre, apellido, numero, correo, fecha_nacimiento } = req.body;
  const query = `
    INSERT INTO users (nombre, apellido, numero, correo, fecha_nacimiento)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(query, [nombre, apellido, numero, correo, fecha_nacimiento], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

router.put('/:id', (req, res) => {
    const { nombre, apellido, numero, correo, fecha_nacimiento } = req.body;
    const query = `
      UPDATE users
      SET nombre = ?, apellido = ?, numero = ?, correo = ?, fecha_nacimiento = ?
      WHERE id = ?
    `;
    db.run(query, [nombre, apellido, numero, correo, fecha_nacimiento, req.params.id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  });

router.delete('/:id', (req, res) => {
  const query = `DELETE FROM users WHERE id = ?`;
  db.run(query, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

module.exports = router;