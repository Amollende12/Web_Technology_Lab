const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static(__dirname)); // serves index.html

let students = [
    { id: 1, name: 'Suraj', age: 21 },
    { id: 2, name: 'Amit', age: 22 }
];

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// GET: fetch all students
app.get('/students', (req, res) => {
    res.json(students);
});

// POST: add new student
app.post('/students', (req, res) => {
    const newStudent = req.body;
    students.push(newStudent);
    res.json({ message: 'Student added', students });
});

// PUT: update student by id
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);
    if (index !== -1) {
        students[index] = { ...students[index], ...req.body };
        res.json({ message: 'Student updated', students });
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});

// DELETE: delete student by id
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    students = students.filter(s => s.id !== id);
    res.json({ message: 'Student deleted', students });
});

// Server start
app.listen(3000, () => console.log('Server running at http://localhost:3000'));
