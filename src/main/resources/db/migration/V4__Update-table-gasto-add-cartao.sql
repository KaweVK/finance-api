ALTER TABLE gasto
    ADD CONSTRAINT fk_gasto_cartao
        FOREIGN KEY (cartao_id) REFERENCES cartao(id);