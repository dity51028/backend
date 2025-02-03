/*const { log } = require('console');
const http = require('http');

const server = http.createServer((req,res)=>{
   if(req.url=='/'){
    res.end('its our home page');
   }
   if(req.url=='/about'){
    res.end('its our about page');
   }
   if(req.url=='/profile'){
    res.end('its our profile page');
   }
   if(req.url=='/new'){
    res.end('its our new page')
   }
})

server.listen(3000);*/

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const userModel = require('./models/user')
const dbconnection = require('./config/db')

const app = express();

app.set('view engine','ejs')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/public/index.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'public', 'index.js'));
  });

app.get('/register',(req,res)=>{
    res.render('register');
});


//create operation
app.post('/register',async(req,res)=>{
    console.log(req.body);
    const {username,email,password} = req.body;

    const newUser =await userModel.create({
        userName : username,
        email : email,
        password : password,
    });

    res.send(newUser);
})

//read operation 

app.get('/get-user',(req,res)=>{
    userModel.findOne({
        userName:'user1'
    }).then((user)=>{
        res.send(user);
    })
})

//Update 

app.get('/user-update',async (req,res)=>{
    const updated = await userModel.findOneAndUpdate({
        userName:'user1'
    },{
        email:"new@gmail.com"
    })
    res.send(updated);
})


//delete 

app.get('/user-delete',async(req,res)=>{
    await userModel.findOneAndDelete({
        userName:'user1'
    })

    res.send('user deleted');
})



//custom middleware
/*app.use((req,res,next)=>{
    console.log('this is a middleware');

    const a = 5;
    const b = 6;
    console.log(a+b);

    return next();
})
 
app.get('/',
    (req,res,next)=>{
        const a = 5;
        const b = 10;

        console.log(a+b);

        next();
    },
    (req,res)=>{
    res.render("index")
    //res.send('home page');
});

app.get('/about',(req,res)=>{
    res.send('its our about');
})

app.post('/get-data',(req,res)=>{
    console.log(req.body);
    res.send("data received");
})*/

app.listen(3000);
