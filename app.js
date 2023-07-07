import express from 'express';
import https from 'https';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';

const homeStartingContent = "Welcome to our blog community! Our blog website is a place where friends come together to share their thoughts, experiences, and musings about random things that make life interesting. It's a digital space where we can connect, express ourselves, and celebrate the joy of sharing stories. Here, you'll find a diverse range of topics, from personal anecdotes and travel adventures to creative works of art and insightful reflections. Our blog community is a vibrant hub of ideas and perspectives, where each voice is valued, and every story matters. Whether you're a seasoned writer or new to the world of blogging, this is the perfect platform to unleash your creativity and let your thoughts flow freely. It's a supportive space where we encourage and inspire one another, fostering a sense of camaraderie and connection. Join us on this exciting journey of self-expression and exploration. Share your passions, ignite conversations, and discover new perspectives. This is where the extraordinary moments of everyday life come alive through the power of words. So, grab your keyboard, let your imagination soar, and let's embark on this incredible blogging adventure together! Welcome to our blog community. Your voice matters here.";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

app.set('view engine', "ejs");

app.get('/', function (req, res) {
    res.render('home', { blogPosts: blogPosts, homeStartingContent: homeStartingContent });
});

app.get("/about", function (req, res) {
    res.redirect("https://github.com/tsanevp/Blog-Website");
});

app.get('/contact', function (req, res) {
    const form = '<form id="contact-form" action="/contact" method="POST"><h1 id="contact-intro-msg">Contact Me</h1><div class="contact-field"><label for="name-input" class="input-label">Name</label><input type="text" class="input-field contact-input" id="name" name="name" placeholder="Enter Your Name"required></div><div class="contact-field"><label for="email-input" class="input-label">Email address</label><input type="email" class="input-field contact-input" id="email-address" name="emailAddress"placeholder="Enter Your Email Address" required></div><div class="contact-field"><label for="message-input" class="input-label">Message</label><textarea class="input-field contact-input" id="message" name="message"placeholder="Please Type Your Message" required></textarea></div><div class="contact-field"><button type="submit" class="contact-submit-btn button">Submit</button></div></form>';
    res.render('contact', { form: form });
});

app.get('/compose', function (req, res) {
    res.render('compose');
});

app.get('/posts/:postName', function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    blogPosts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);

        if (storedTitle === requestedTitle) {
            res.render("posts", {
                title: post.title,
                content: post.content
            });
        }
    });
});

app.post('/compose', function (req, res) {
    const body = req.body;
    const title = body.title;
    const content = body.content;
    blogPosts.push({ title, content })

    res.redirect('/')
});

app.post("/contact", function (req, res) {
    const { name, emailAddress, message } = req.body;
    const url = "https://docs.google.com/forms/d/e/1FAIpQLSfD_i06X6v0rfPi6XydDBKGmUnRQ2AKAku-lm1kDwxKN4TZSA/formResponse?entry.2005620554=" + name + "&entry.1045781291=" + emailAddress + "&entry.1065046570=" + message;

    https.get(url, (response) => {
        let form = '<h1 id="contact-intro-msg">Your Message Was Successfully Sent!</h1>'

        if (response.statusCode !== 200) {
            form = '<h1 id="contact-intro-msg">There Was An Error Contacting Peter. Please Try Again!</h1>'
            res.render('contact', { form: form });
            return;
        }

        res.render('contact', { form: form });
    }).on('error', (e) => {
        res.send(e);
    });
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})