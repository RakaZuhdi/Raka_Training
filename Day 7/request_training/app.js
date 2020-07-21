const Joi = require('joi');

const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id: 1, name: 'Matematika' },
    { id: 2, name: 'Kimia' },
    { id: 3, name: 'Fisika' },
    { id: 4, name: 'Web Programming' }
];

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers' : '*'
    });
    next();
})

app.get('/', (req, res) => {
    res.send('Welcome!');
})

app.get("/api/courses", (req, res) => {
    return res.json(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(404).send('ID not found.');
    return res.json(course);
})

app.post('/api/courses', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    return res.json(course);
});

app.put('/api/courses/:id', (req, res) => {
    const {error} = validateCourse(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(404).send('ID not found.');

    course.name = req.body.name;
    return res.json(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if (!course) return res.status(404).send('ID not found.');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.json(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}