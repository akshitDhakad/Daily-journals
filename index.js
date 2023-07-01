const express = require('express');
var bodyParser = require('body-parser')
const app = express();
let ejs = require('ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs');

//*********************** */ mongoose set-up /******************************* */

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Daily-Journals');
const Blog=mongoose.model("Blog",{
    title:String,
    content:String,
})



// ****************   routes set-up ***********************************
app.get('/', async (req, res) => {
    try {
      const data = await Blog.find({});
    
      res.render("home",{data:data}); 
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while searching for data.' });
    }
});
  
app.get('/page404', (req, res) => {
    res.render('page404');
    });
    

app.get('/newpost', (req, res) => {
    res.render("post")
})

app.get('/contact', (req, res) => {
    res.render("contact")
})

app.get('/sucess', (req, res) => {
    res.render("sucess")
})


app.get("/Blog",async (req,res)=>{
    try {
        const data =await Blog.findOne({title:`${req.query.blog}`})
        res.render("Blog",{data:data})
        
    } catch (error) {
    res.status(500).json({ error: 'An error occurred while searching for data.' });
    } 
})


app.get('*', (req, res) => {
    res.redirect('/page404');
  });
  


  




app.post('/post', (req, res) => {
    console.log(req.body)

    const Blog1 = new Blog({
        title:`${req.body.title}`,
        content:`${req.body.content}`
    }) 
    Blog1.save()
    res.redirect('/')
})





app.listen(5000,(req,res) => {
    console.log("server running on port  5000")
})