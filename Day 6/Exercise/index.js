const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

/*
*
* LOCAL VARILABLE, DATABASE COURSE
*
*/

const courses = [
    { id: 1, name: 'Matematika' },
    { id: 2, name: 'Kimia' },
    { id: 3, name: 'Fisika' },
    { id: 4, name: 'Web Programming' }
];

/*
app.get("/", (req, res) => {
    res.send('Hello World!');
});
*/


/*
*
* WEB SERVICE UNTUK RETURN ALL COURSES
*
*/
app.get("/api/courses", (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.send( courses );
});

/*
* 
* WEB SERVICE UNTUK RETURN 1 OBJECT COURSE BY COURSE ID
*
*/
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if( !course ) res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

/*
*
* WEB SERVICE UNTUK ADD 1 DATA BARU KE DALAM MASTER DATA COURSES
*
*/
app.post("/api/courses", (req, res) => {


    /*
    * 
    * SCHEMA UNTUK VALIDASI OBJECT YANG MASUK KE HTTP REQUEST
    *
    */
    const {error} = validateCourse(req.body); 
    if( error ){
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    } 


    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);

});

/*
*
* WEB SERVICE UNTUK UPDATE 1 COURSE BASED ON COURSE ID
*
*/
app.put('/api/courses/:id', (req, res) => {

    // validasi
    // klo ga sesuai, return 400
    const {error} = validateCourse(req.body); 
    if( error ){
        // 400 Bad Request
        return res.status(400).send(error.details[0].message);
    } 

    // cari course nya
    // klo ga ketemu, return 404
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if( !course ) res.status(404).send('The course with the given ID was not found.');

    // klo semuanya sesuai dengan persyaratan
    // maka update course nya
    // return object course yang baru setelah di update
    course.name = req.body.name;
    res.send(course);

});






/*
*
* WEB SERVICE UNTUK DELETE 1 COURSE BASED ON COURSE ID
*
*/
app.delete('/api/courses/:id', (req, res) => {

    // cari course nya
    // klo ga ketemu, return 404 
    const course = courses.find( c => c.id === parseInt(req.params.id) );
    if( !course ) res.status(404).send('The course with the given ID was not found.');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return course yang berhasil dihapus
    res.send(course);

});








function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

















/*
*
* START WEB SERVICE
*
*/

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

