const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/submit-form', (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nome, email e mensagem são obrigatórios.' });
  }

  const query = 'INSERT INTO form_submissions (name, email, phone, message) VALUES (?, ?, ?, ?)';

  db.execute(query, [name, email, phone, message], (err, result) => {
    if (err) {
      console.error('Erro ao inserir dados do formulário:', err);
      return res.status(500).json({ message: 'Erro ao salvar os dados do formulário.' });
    }

    res.status(201).json({ message: 'Formulário enviado com sucesso!', result });
  });
});

router.get('/form-entries', (req, res) => {
  const query = 'SELECT * FROM form_submissions';

  db.execute(query, (err, result) => {
    if (err) {
      console.error('Erro ao consultar formulários:', err);
      return res.status(500).json({ message: 'Erro ao consultar formulários.' });
    }

    res.json(result);
  });
});

module.exports = router;
