const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const rateLimit = require("express-rate-limit");
const passport = require('passport');
const flash = require('connect-flash');
const MemoryStore = require('memorystore')(session);
const compression = require('compression');
const cron = require('node-cron')

const mainrouter = require('./apis')
const userRouters = require('./db/users');
const premiumRouters = require('./rotas/premium');
const { isAuthenticated } = require('./funções/auth');
const { conectar_db } = require('./db/connect');
const { 
pegar_apikey, 
Totalregistrados,
resetar_todos_limit
} = require('./db/db');

const PORT = process.env.PORT || porta;

conectar_db();

app.set('trust proxy', 1);
app.use(compression())

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 2000, 
  message: 'Oops too many requests'
});
app.use(limiter);

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.static('public'));

app.use(session({
  secret: 'secret',  
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000
  }),
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());
require('./funções/config')(passport);

app.use(flash());

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})


	// LIMIT SERÁ RESETADO AS 12 HORAS TODOS OS DIAS
         
        cron.schedule('00 12 * * *', () => {
        resetar_todos_limit();
        console.log('Todos os Limits foram resetados')
        },{ 
       scheduled: true,
       timezone: "Africa/Maputo"})

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'index'
  });
});


app.get('/docs', isAuthenticated, async (req, res) => { 
  let { apikey, nome, limit, dinheiro } = req.user
  let registrados = await Totalregistrados()
//  let { apikey, nome } = getkey
  res.render('docs', {
    nome: nome,
    apikey: apikey,
    limit: limit,
    dinheiro: dinheiro,
    registrados: registrados,
    layout: 'docs'
  });
});


app.use('/api', mainrouter);
app.use('/usuario', userRouters);
app.use('/moderador', premiumRouters);

app.use(function (req, res, next) {
  if (res.statusCode == '200') {
    res.render('semresultado', {
      layout: 'layouts/main'
    });
  }
});

app.set('json spaces', 4);

app.listen(PORT, () => {
  console.log(`Akame api está rodando no host: http://localhost:${PORT}`);
});

module.exports = app