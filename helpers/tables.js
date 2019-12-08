class Tables {
    init(connection) {
        this.connection = connection;

        this.createCalls();
    }

    createCalls() {
        const sql = 'CREATE TABLE IF NOT EXISTS attendance  (     ' +
                    'id          INT NOT NULL AUTO_INCREMENT,     ' +
                    'client      VARCHAR(50) NOT NULL,            ' +
                    'cpf         VARCHAR(11) NOT NULL,            ' +
                    'birth       DATETIME NOT NULL,               ' +
                    'date_input  DATETIME NOT NULL,               ' +
                    'date_output DATETIME,                        ' +
                    'problem     VARCHAR(255) NOT NULL,           ' +
                    'solution    VARCHAR(255),                    ' +
                    'status      VARCHAR(1) NOT NULL DEFAULT "A", ' +
                    'PRIMARY KEY(id)                             )';

        this.connection.query(sql, error => 
            error ? console.log(error)
                  : console.log('Tabela criada com sucesso!')
        );
    }
}

module.exports = new Tables;