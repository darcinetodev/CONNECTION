const connection = require('../helpers/connection');
const moment = require('moment');

class Attendance {
    add(attendance, res) {
        const date_input = moment().format('YYYY-MM-DD HH:MM:SS');
        //const date_output = moment(attendance.date_output, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const birth = moment(attendance.birth, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        //const dateIsValid = moment(date_output).isSameOrAfter(input_date);
        const clientIsValid = attendance.client.length >= 5;

        const validates = [
            /*{
                name: 'date_output',
                validate: dateIsValid,
                message: 'A data de finalização deve ser maior ou igual a data atual.'
            }*/
            {
                name: 'client',
                validate: clientIsValid,
                message: 'O cliente deve ter ao menos 5 caractéres.'
            }
        ];

        const errors = validates.filter(field => !field.validate);
        const existsErrors = errors.length;
        
        if (existsErrors)
            res.status(400).json(errors);
        else {
            const attendanceDate = {...attendance, date_input, birth};
            
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
        if (values.birth) values.birth = moment(values.birth, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
                     
        const sql = 'UPDATE Attendance SET ? WHERE id=?';

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