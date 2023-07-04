import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import _ from 'lodash';

const homeStartingContent = "Welcome to our blog community! Our blog website is a place where friends come together to share their thoughts, experiences, and musings about random things that make life interesting. It's a digital space where we can connect, express ourselves, and celebrate the joy of sharing stories. Here, you'll find a diverse range of topics, from personal anecdotes and travel adventures to creative works of art and insightful reflections. Our blog community is a vibrant hub of ideas and perspectives, where each voice is valued, and every story matters. Whether you're a seasoned writer or new to the world of blogging, this is the perfect platform to unleash your creativity and let your thoughts flow freely. It's a supportive space where we encourage and inspire one another, fostering a sense of camaraderie and connection. Join us on this exciting journey of self-expression and exploration. Share your passions, ignite conversations, and discover new perspectives. This is where the extraordinary moments of everyday life come alive through the power of words. So, grab your keyboard, let your imagination soar, and let's embark on this incredible blogging adventure together! Welcome to our blog community. Your voice matters here.";
const aboutContent = "Lorem ipsum dolor sit amet. Ea quae mollitia aut quod excepturi qui maxime rerum ad minus temporibus utaliquam iusto ut corrupti galisum. Rem repellendus internos qui asperiores ducimus ea repellendus maximeet quasi inventore et inventore rerum ut explicabo reiciendis qui corporis aspernatur. Et omnisperferendis non quaerat sapiente est eveniet natus aut maxime molestias ut sunt magni non animivoluptatem aut tempora nihil.Hic incidunt molestias in voluptas sequi At necessitatibus galisum non enimtenetur eos rerum alias At quos libero. Est illo perferendis sit voluptatem quia cum provident debitiseos iusto necessitatibus.Intempore labore et sequi accusantium ea facilis alias. Qui voluptates nihil ut expedita velit sedautem laudantium et saepe optio. Et voluptas nisi sit deserunt labore et corporis omnis qui odit maximehic neque deleniti nam ullam quisquam non praesentium atque. Sed tempora autem est quia voluptatem nonminus eveniet.";
const contactContent = "Lorem ipsum dolor sit amet. Ea quae mollitia aut quod excepturi qui maxime rerum ad minus temporibus utaliquam iusto ut corrupti galisum. Rem repellendus internos qui asperiores ducimus ea repellendus maximeet quasi inventore et inventore rerum ut explicabo reiciendis qui corporis aspernatur. Et omnisperferendis non quaerat sapiente est eveniet natus aut maxime molestias ut sunt magni non animivoluptatem aut tempora nihil.Hic incidunt molestias in voluptas sequi At necessitatibus galisum non enimtenetur eos rerum alias At quos libero. Est illo perferendis sit voluptatem quia cum provident debitiseos iusto necessitatibus.Intempore labore et sequi accusantium ea facilis alias. Qui voluptates nihil ut expedita velit sedautem laudantium et saepe optio. Et voluptas nisi sit deserunt labore et corporis omnis qui odit maximehic neque deleniti nam ullam quisquam non praesentium atque. Sed tempora autem est quia voluptatem nonminus eveniet.";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

const blogPosts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set('view engine', "ejs");

app.get('/', function (req, res) {
    res.render('home', { blogPosts: blogPosts, homeStartingContent: homeStartingContent });
});

app.get('/about', function (req, res) {
    res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function (req, res) {
    res.render('contact', { contactContent: contactContent});
});

app.get('/compose', function (req, res) {
    res.render('compose');
});

app.get('/post/:postName', function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName); //lodash

    posts.forEach(function(post) {
      const storedTitle = _.lowerCase(post.title); //lodash
   
      if(storedTitle === requestedTitle) {
       res.render("post", {
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

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})