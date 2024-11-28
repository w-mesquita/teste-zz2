const express = require('express');
const router = express.Router();
const { executeQuery } = require('./db');

// Rota para salvar dados do formulário
router.post('/submit-form', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Nome, email e mensagem são obrigatórios.' });
  }

  const query = `
    INSERT INTO form_submissions (name, email, phone, message)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const result = await executeQuery(query, [name, email, phone, message]);
    res.status(201).json({ message: 'Formulário enviado com sucesso!', result });
  } catch (error) {
    console.error('Erro ao salvar dados do formulário:', error);
    res.status(500).json({ message: 'Erro ao salvar os dados do formulário.' });
  }
});

// Rota para listar dados do formulário
router.get('/form-entries', async (req, res) => {
  const query = 'SELECT * FROM form_submissions';

  try {
    const results = await executeQuery(query);
    res.json(results);
  } catch (error) {
    console.error('Erro ao consultar formulários:', error);
    res.status(500).json({ message: 'Erro ao consultar formulários.' });
  }
});

module.exports = router;
