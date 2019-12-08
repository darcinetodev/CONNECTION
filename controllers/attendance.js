const Attendance = require('../models/attendance');

module.exports = app => {
    app.get('/attendances', (req, res) => {
        Attendance.list(res);
    });

    app.get('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Attendance.searchForId(id, res);
    });

    app.post('/attendances', (req, res) => {
        const attendance = req.body;

        Attendance.add(attendance, res);
    });

    app.patch('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;

        Attendance.patch(id, values, res);
    });

    app.delete('/attendance/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Attendance.delete(id, res);
    });
}