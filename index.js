//initialize express
//setup handlebars

//setup static files
// setup storage middleware
//set rout handlers(controller actions)
const express=require('express');
const hbs=require('express-handlebars');

const {init:storage }= require('./models/storage');

const {about} = require('./controllers/about');
const { catalog } = require('./controllers/catalog');
const {create, post: createPost} = require('./controllers/create');
const {details} = require('./controllers/details');
const {edit, post: editPost} =require('./controllers/edit')
const { notFound } = require('./controllers/notFound');

start();

async function start(){

const port= 3000;
const app = express();

app.engine('hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: false}));
app.use(await storage());

app.get('/', catalog);
app.get('/about', about);
app.get('/details/:id', details);
app.get('/create', create);
app.post('/create', createPost);

app.get('/edit/:id', edit);
app.post('/edit/:id', editPost);

app.all('*', notFound);





app.listen(port, ()=> console.log( `server listening on port ${port}`));


}


//https://softuni.bg/trainings/resources/video/60968/video-28-may-2021-viktor-kostadinov-js-back-end-may-2021/3357 2:16