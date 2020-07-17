//3 Line ini wajib
const express = require('express');
const app = express();
const Joi = require('joi');
app.use(express.json());

//ROUTE HANDLER
app.get('/', (req, res) => {
    res.send('Page 1');
    console.log('Someone is opening page 1');
});

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

app.get('/api/courses/list', (req, res) => {
    res.send(courses);
    console.log('Someone is opening the course page');
});

app.get('/api/courses/:id', (req, res) => {
    console.log('Someone is opening page 2');
    const findCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!findCourse){
        res.status(404).send('The course with given ID was not found.'); //resorce tidak ditemukan
        console.log('Object not found!');
    }
    res.send(findCourse);

});


//POST -> membuat data
app.post('/api/courses', (req, res) =>{
    // 1. ambil data post dari HTTP request client.
    // 2. buat objectnya.

    // course harus punya nama, klo tidak, reject
    // nama course, harus lebih ari 3 karakter
    // kedua persyaratan diatas, harus terpenuhi

    //404 -> object not found
    //200 -> ok
    //304 -> not modified
    //400 -> bad request(request is not standard)
    
    console.log('received');
    const schema = Joi.object({
        name: Joi.string().min(3).required()
        //tuliskan persyaratan agar object dianggap valid
    });

    const result = schema.validate(req.body);
    console.log(result);


    //INPUT VALIDATION

    if(result.error){
        //Jika kondisi salah
        return res.status(400).send(result.error.details[0].message);
    }

    
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
    console.log('user id:' + course.id+' added');
    console.log('user name:' + course.name+' added');
    //courses.send(course);
    //3. save data object baru, master data yang kita punya which is array courses. 
});


//Web service untuk update

app.put('api/course/:id', (req, res) => {
    //cari coursenya.
    //klo gk ketemu, return 404.

    //validasi.
    //klo gk sesuai, return 400.

    //klo semuanya memenuhi persyaratan, update.coursenya.
    //return object course yg telah diupdate.


    console.log('Someone is opening page 2');
    const findCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!findCourse){

        console.log('Object not found!');
        return res.status(404).send('The course with given ID was not found.'); //resorce tidak ditemukan
        
    }

    //Object Destructure
    const {error} = validateCourse(req.body);
    if(error){
        //Jika kondisi salah
        return res.status(400).send(result.error.details[0].message);
    }

    course.name = req.body.name;
    res.send(course);


});

app.delete('/api/courses/:id', (req, res) => {
    //cari coursenya
    //klo gk ketemu, return 404
    const findCourse = courses.find(c => c.id === parseInt(req.params.id));
    if(!findCourse){
        console.log('Object not found!');
        return res.status(404).send('The course with given ID was not found.'); //resorce tidak ditemukan
    }

    //delete
    const index = courses.indexOf(findCourse);
    courses.splice(index, 1);

    //return course yang berhasil dihapus
    res.send(findCourse);
});


app.listen(3000, function(){
    console.log('Listening on port 3000...');
});

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
        //tuliskan persyaratan agar object dianggap valid
    });

    return schema.validate(course);
    console.log(result);
}





/*
1. Callback function = function tanpa nama/ anonymous function.
2. Function adalah sebuah set of code yang bisa dipanggil dimanapun dan kapanpun.
3. 4 method crud pasti menggunakan callback function.
4. var, const, let. (Kebanyakan pro sekarang menggunakana let.)

var --> variable override
const --> Mencegah variable override
let --> variable override

404 -> standar id networking -> object/resource yg dicari tidak ditemukan. 

Event:
Bikin listener -> set of code yang akan dieksekusi kalau event specific dipanggil
Biking trigger -> trigger adalah source code untuk pointing 
*/