-- ============================================================
-- Projeto Beta — McLaren | Schema do banco de dados
-- MySQL 8.0+
-- Execute: mysql -u root -p < database/schema.sql
-- ============================================================

-- 📦 Cria o banco (caso não exista)
CREATE DATABASE IF NOT EXISTS projeto_beta
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE projeto_beta;

-- 👤 Tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    id         INT UNSIGNED                  NOT NULL AUTO_INCREMENT,
    name       VARCHAR(120)                  NOT NULL,
    email      VARCHAR(255)                  NOT NULL,
    password   VARCHAR(255)                  NOT NULL,
    role       ENUM('user','admin')          NOT NULL DEFAULT 'user',
    created_at TIMESTAMP                     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP                     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE KEY uq_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Se a tabela já existia sem a coluna role, adicione-a:
-- ALTER TABLE users ADD COLUMN role ENUM('user','admin') NOT NULL DEFAULT 'user';
