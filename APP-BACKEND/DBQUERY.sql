-- criando o banco de dados
CREATE DATABASE contact_form_db;

-- selecionando o banco de dados
USE contact_form_db;

-- criando a tabela para armazenar os dados do formulário
CREATE TABLE form_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);