const customExpress = require('./config/customExpress');
const connection = require('./helpers/connection');
const tables = require('./helpers/tables');

connection.connect(error => {
    if (error)
        console.log(error)
    else {
        console.log('Conectado com sucesso!');
        tables.init(connection);
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor ligado na porta 3000'));
    };
});