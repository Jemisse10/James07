const LocalStrategy = require('passport-local').Strategy;
const { getHashedPassword } = require('./function');
const { usuario } = require('../db/model');

module.exports = function(passport) {
    passport.use(new LocalStrategy(
        (nome, senha, done) => {
            let hashed = getHashedPassword(senha)
            usuario.findOne({nome: nome}).then(usuarios => {
                if (!usuarios) return done(null, false, {
                    message: 'Não encontrei este nome na minha db',
                })
                if (nome === usuarios.nome && hashed === usuarios.senha) {
                    return done(null, usuarios);
                } else {
                    return done(null, false, {
                        message: 'Nome ou senha inválidos',
                    });
                };
            });
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        usuario.findById(id, function(err, user) {
          done(err, user);
        });
      });
}