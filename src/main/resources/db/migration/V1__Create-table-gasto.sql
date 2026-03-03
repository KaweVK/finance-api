create database finance;

CREATE TABLE IF NOT EXISTS gasto (
    id BIGSERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    valor DECIMAL(10, 2) NOT NULL,
    tipo_gasto VARCHAR(55) NOT NULL,
    metodo_pagamento VARCHAR(55) NOT NULL,
    data DATE,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);