const connection = require('../helpers/connection');
const moment = require('moment');
const cpf = require('cpf');

class Attendance {
    add(attendance, res) {
        const date_input = moment().format('YYYY-MM-DD HH:MM:SS');
        const date_output = attendance.date_output ? moment(attendance.date_output, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS') : null;
        const birth = moment(attendance.birth, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const dateIsValid = date_output ? moment(date_output).isSameOrAfter(date_output) : true;
        const clientIsValid = attendance.client.length >= 4;
        const cpfIsValid = cpf.isValid(attendance.cpf);

        const validates = [
            {
                name: 'date_output',
                validate: dateIsValid,
                message: 'A data de finalização deve ser maior ou igual a data atual.'
            },
            {
                name: 'client',
                validate: clientIsValid,
                message: 'O cliente deve ter mais de 3 caracteres.'
            },
            {
                name: 'cpf',
                validate: cpfIsValid,
                message: 'O CPF deve ser válido.'
            }
        ];

        const errors = validates.filter(field => !field.validate);
        const existsErrors = errors.length;
        
        if (existsErrors)
            res.status(400).json(errors);
        else {
            const attendanceDate = {...attendance, date_input, date_output, birth};
            
            const sql = 'INSERT INTO attendance SET ?';

            connection.query(sql, attendanceDate, (error, results) => {
                error ? res.status(400).json(error)
                      : res.status(201).json(attendance);
            });
        }
    }

    list(res) {
        const sql = 'SELECT * FROM Attendance';

        connection.query(sql, (error, results) => {
            error ? res.status(400).json(error)
                  : res.status(200).json(results);
        })
    }

    searchForId(id, res) {
        const sql = `SELECT * FROM Attendance WHERE id=${id}`;

        connection.query(sql, (error, results) => {
            const attendance = results[0];

            error ? res.status(400).json(error)
                  : res.status(200).json(attendance);
        });
    }

    patch(id, values, res) {
        const date_output = moment().format('YYYY-MM-DD HH:MM:SS');
        const status = 'I';
                     
        const sql = `UPDATE Attendance SET solution='${values.solution}', date_output='${date_output}', status='${status}' WHERE id=${id}`;

        connection.query(sql, [values, id], (error, results) => {
          error ? res.status(400).json(error)
                : res.status(200).json({...values, id});
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM Attendance WHERE id=?';

        connection.query(sql, id, (error, results) => {
            error ? res.status(400).json(error)
                  : res.status(200).json({id});
        });
    }
}

module.exports = new Attendance;