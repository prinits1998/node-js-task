const express = require("express");
let app = express();
let port = 4001;

let students = [
    { id: "1", name: "mishri", surname: "malaviya" },
    { id: "2", name: "mishti", surname: "malaviya" }
];

// -------- Needed for POST (body data) -------
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// -------- READ All Students --------
app.get("/students", (req, res) => {
    res.send(students);
});

//  Single Student 
app.get("/students/:id", (req, res) => {
    let student = students.find(el => el.id === req.params.id);
    if (!student) return res.send("Student not found");
    res.send(student);
});

// -------- CREATE Student --------
app.post("/students", (req, res) => {
    let newStudent = {
        id: String(students.length + 1),
        name: req.body.name,
        surname: req.body.surname
    };

    students.push(newStudent);
    res.send(newStudent);
});

// -------- UPDATE Student (PUT) --------
app.put("/students/:id", (req, res) => {
    let index = students.findIndex(el => el.id === req.params.id);

    if (index === -1) return res.send("Student not found");

    students[index] = {
        id: req.params.id,
        name: req.body.name,
        surname: req.body.surname
    };

    res.send(students[index]);
});

// -------- DELETE Student --------
app.delete("/students/:id", (req, res) => {
    let newList = students.filter(el => el.id !== req.params.id);

    if (newList.length === students.length)
        return res.send("Student not found");

    students = newList;
    res.send("Student deleted");
});

// -------- SERVER START --------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});