import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const blogPosts = [["My first post", "Et omnis dolor et earum excepturi 33 sunt assumenda et laborum sint et ipsam autem? Et repudiandae explicabo aut magni debitis et distinctio accusamus sed provident dolorem cum quaerat culpa aut totam itaque. Et vero vero quo maxime officia quo illo alias est esse deleniti ut facilis harum."]];

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
    res.render('contact');
});


app.post('/', function(req, res) {
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
})