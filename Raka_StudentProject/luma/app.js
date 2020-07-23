const Joi = require('joi');
const express = require('express');
app = express();

const accounts = [
    { id: 1, username: 'Raka Zuhdi', email: 'rakazhp@gmail.com', password:'raka123', paymentType: '1', cardNumber:'01293881', expirationDateMonth:'January', expirationDateYear:'2023'},
    { id: 2, username: 'Orlando Zaska', email: 'orlando@gmail.com', password:'orlando123', paymentType: '0', cardNumber:'12310023', expirationDateMonth:'December', expirationDateYear:'2024' }
];

app.use(express.json());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers' : '*'
    });
    next();
})

app.get("/api/accounts", (req, res) => {
    res.send(accounts);
    console.log('Get all accounts has been initialized!');
});

app.get('/api/accounts/:id', (req, res) => {
    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    console.log(account);
    if (!account) return res.status(404).send('ID does not exist');
    console.log('Get Account Detail has been initialized!');
    return res.json(account);
})

app.delete('/api/accounts/:id', (req, res) => {
    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID does not exist');
    const index = accounts.indexOf(account);
    var status = accounts.splice(index, 1);
    if(status){
        console.log('Account with id: ' + req.params.id + ' has been deleted!');
    }
    return res.json(account);
});

app.put('/api/accounts/:id', (req, res) => {
    const result = validateAccount(req.body);
    if (result.error) {
        console.log(result.error.details[0]);
        return res.status(400).send(error.details[0].message);
    }
    const account = accounts.find( a => a.id === parseInt(req.params.id) );
    if (!account) return res.status(404).send('ID not found.');
    console.log('Edit account has been initialized!');

    account.username= req.body.username;
    account.email = req.body.email;
    account.password = req.body.password;
    account.paymentType = req.body.paymentType;
    account.cardNumber = req.body.cardNumber;
    account.expirationDateMonth = req.body.expireMonth;
    account.expirationDateYear = req.body.expireYear;

    return res.json(account);
});

function validateAccount(course) {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().min(6).required(),
        password :Joi.string().min(8).required(),
        paymentType : Joi.string().min(1).required(),
        cardNumber : Joi.string().min(8).required(),
        expirationDateMonth : Joi.string().min(3).required(),
        expirationDateYear : Joi.string().min(4).required()
    });
    return schema.validate(course);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});