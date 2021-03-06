const Joi = require('joi');
const express = require('express');
app = express();

const accounts = [
    { id: 1, username: 'Raka Zuhdi', email: 'rakazhp@gmail.com', password:'raka123', paymentType: '1', cardNumber:'01293881', securityCode:'123', expirationDateMonth:'1', expirationDateYear:'2023'},
    { id: 2, username: 'Orlando Zaska', email: 'orlando@gmail.com', password:'orlando123', paymentType: '0', cardNumber:'12310023', securityCode:'456', expirationDateMonth:'12', expirationDateYear:'2024' },
    { id: 3, username: 'Lorem Ipsum', email: 'Ipsum@gmail.com', password:'lorem1234'}
];


const contents = [
    {contentID: 1, Description1: 'Economic', Description2: '1 account', Description3: '9.99', Description4: '/month'},
    {contentID: 2, Description1: 'Budget', Description2: '3 accounts', Description3: '18.99', Description4: '/month'}
];

app.use(express.json());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers' : '*'
    });
    next();
});

app.get('/api/contents', (req,res) =>{
    var datetime = new Date();
    console.log(datetime)
    console.log('Get contents has been initialized !\n');
    console.log(contents);
    res.send(contents);
});


app.get("/api/accounts", (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Get all accounts has been initialized!\n');
    res.send(accounts);
    
});

app.get('/api/accounts/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Get account detail has been initialized!\n');

    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID does not exist');
    console.log(account +'\n');
    return res.json(account);
});
app.get('/api/contents/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Get content detail has been initialized!\n');
    const content = contents.find( a => a.contentID === parseInt(req.params.id) );
    console.log(contents);
    if (!content) return res.status(404).send('ID does not exist');
    
    return res.json(content);
});

app.delete('/api/accounts/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Delete account has been initiated!');

    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID does not exist');
    const index = accounts.indexOf(account);
    var status = accounts.splice(index, 1);
    if(status){
        console.log('Account with id: ' + req.params.id + ' has been deleted!\n');
    }
    return res.json(account);
});

app.delete('/api/contents/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Delete content has been initiated!\n');
    const content = contents.find( a => a.contentID === parseInt(req.params.id) );
    if (!content) return res.status(404).send('ID does not exist');
    const index = contents.indexOf(content);
    var status = contents.splice(index, 1);
    if(status){
        console.log('Content with id: ' + req.params.id + ' has been deleted!');
    }
    return res.json(content);
});

app.get('/api/accountLogin/:email/:password', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Login page has been initialized!\n');
    var email = req.params.email;
    var password = req.params.password;

    const findEmail = accounts.find( a => a.email === email);
    if(!findEmail){
        console.log('Email cannot be found!');
        return res.status(404).send('Email cannot be found!');
    }

    if(findEmail.password !== password){
        console.log('Password incorrect!');
        return res.status(404).send('Password incorrect');
    }

    var id = findEmail;

    console.log( findEmail.email +' has successfully logged in!');
    return res.send(id);
});

app.put('/api/accounts/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Edit account page has been initialized!\n');
    
    const result = validateAccount(req.body);
    if (result.error) {
        console.log(result.error.details[0]);
        return res.status(400).send(error.details[0].message);
    }
    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID not found.');

    account.username= req.body.username;
    account.email = req.body.email;
    account.password = req.body.password;
    account.paymentType = req.body.paymentType;
    account.cardNumber = req.body.cardNumber;
    account.expirationDateMonth = req.body.expirationDateMonth;
    account.expirationDateYear = req.expirationDateYear;

    return res.json(account);
});

app.put('/api/contents/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Edit content has been initialized!\n');
    const content = contents.find( a => a.contentID === parseInt(req.params.id) );
    if (!content) return res.status(404).send('ID not found.');

    
    return res.json(content);
});

app.put('/api/accountsRegistration/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Payment data page has been initialized!\n');

    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID not found.');
    const schema = Joi.object({
        paymentType:Joi.string(),
        cardNumber: Joi.string().min(6).required(),
        securityCode:Joi.string().max(3).required(),
        expirationDateMonth: Joi.string().required(),
        expirationDateYear: Joi.string().min(4).required()
    });

    const validation = schema.validate(req.body);
    if(validation.error){
        console.log(validation);
        return res.status(404).send(validation);
    }

    account.paymentType = req.body.paymentType;
    account.cardNumber = req.body.cardNumber;
    account.securityCode = req.body.securityCode;
    account.expirationDateMonth = req.body.expirationDateMonth;
    account.expirationDateYear = req.body.expirationDateYear;

    return res.json(account);
});

app.post('/api/createContent/:description1/:description2/:description3/:description4',(req,res)=>{
    var datetime = new Date();
    console.log(datetime);
    console.log('Create content page has been initialized!\n');
    const content = {
        contentID: contents.length+1,
        Description1: req.params.description1,
        Description2: req.params.description2,
        Description3: req.params.description3,
        Description4: '/'+ req.params.description4
    }
    const schema = Joi.object({
        contentID: Joi.required(),
        Description1: Joi.string().min(2).required(),
        Description2: Joi.string().min(2).required(),
        Description3: Joi.string().min(2).required(),
        Description4: Joi.string().min(2).required()
    });

    const validation = schema.validate(content);
    if(validation.error){
        console.log(validation);
        return res.status(404).send(validation);
    }

    contents.push(content);
    return res.send('success');
});

app.put('/api/contentsRegistration/:id', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Update content page has been initialized!\n');
    const content = contents.find( a => a.contentID === parseInt(req.params.id) );
    if (!content) return res.status(404).send('ID not found.');
    const schema = Joi.object({
        contentID: Joi.string().required(),
        Description1: Joi.string().min(1).required(),
        Description2: Joi.string().min(1).required(),
        Description3: Joi.string().min(1).required(),
        Description4: Joi.string().min(1).required()
    });

    const validation = schema.validate(req.body);
    if(validation.error){
        console.log(validation);
        return res.status(404).send(validation);
    }

    content.Description1 = req.body.Description1;
    content.Description2= req.body.Description2;
    content.Description3 = req.body.Description3;
    content.Description4 = req.body.Description4;

    return res.json(content);
});

app.post('/api/accounts/', (req, res) => {
    var datetime = new Date();
    console.log(datetime);
    console.log('Register account page has been initialized!\n');
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(6).email().required(),
        password :Joi.string().min(8).required()
    });
    const validation= schema.validate(req.body);
    if(validation.error){
        console.log(validation);
        return res.status(404).send(validation);
    }

    const findEmail = accounts.find( a => a.email === req.body.email);
    if (findEmail){
        console.log('Registration Failed!');
        return res.status(404).send({respond: 'Email already exist.'});
    }
    const account = {
        id: accounts.length + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        status: 200
    };
    var userID = account.id;
    res.status(200).json(account);
    accounts.push(account);

    console.log('User has successfully been registered');
    console.log(account);
});

const port = /*process.env.PORT ||*/ 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}\n`);
});