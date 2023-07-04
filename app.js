import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const homeStartingContent = "Lorem ipsum dolor sit amet. Ea quae mollitia aut quod excepturi qui maxime rerum ad minus temporibus utaliquam iusto ut corrupti galisum. Rem repellendus internos qui asperiores ducimus ea repellendus maximeet quasi inventore et inventore rerum ut explicabo reiciendis qui corporis aspernatur. Et omnisperferendis non quaerat sapiente est eveniet natus aut maxime molestias ut sunt magni non animivoluptatem aut tempora nihil.Hic incidunt molestias in voluptas sequi At necessitatibus galisum non enimtenetur eos rerum alias At quos libero. Est illo perferendis sit voluptatem quia cum provident debitiseos iusto necessitatibus.Intempore labore et sequi accusantium ea facilis alias. Qui voluptates nihil ut expedita velit sedautem laudantium et saepe optio. Et voluptas nisi sit deserunt labore et corporis omnis qui odit maximehic neque deleniti nam ullam quisquam non praesentium atque. Sed tempora autem est quia voluptatem nonminus eveniet.";
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

app.post('/compose', function (req, res) {
    const body = req.body;
    const title = body.title;
    const content = body.content;
    blogPosts.push([title, content])
    
    res.redirect('/')
});

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})