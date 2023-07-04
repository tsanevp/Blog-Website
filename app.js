import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set('view engine', "ejs");

app.get('/', function(req, res) {
    res.render('home', { blogPosts: blogPosts });
});

app.get('/about', function(req, res) {  
    res.render('about');
});

app.get('/contact', function(req, res) {  
    res.render('contact');
});

app.get('/compose', function(req, res) {  
    res.render('compose');
});

app.post('/compose', function(req, res) {
    const body = req.body;
    const title = body.title;
    const content = body.content;
    blogPosts.push([title, content])
    res.redirect('/')
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})