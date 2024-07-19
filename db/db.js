const { usuario } = require('./model');
require('../edite');

    async function add_usuario(nome, senha, apikey) {
        let obj = { nome, senha, apikey, defaultKey: apikey, premium: null, limit: limitfree, dinheiro: din };
        usuario.create(obj);
    }    
    async function verificar_nome(nome) {
        let usuarios = await usuario.findOne({nome: nome});
        if(usuarios !== null) {
            return usuarios.nome;
        } else {
            return false;
        }
    }    
    async function pegar_apikey(id) {
        let usuarios = await usuario.findOne({_id: id});
        return {apikey: usuarios.apikey, nome: usuarios.nome};
    }        
    async function verificar_apikey(apikey) {
        let db = await usuario.findOne({apikey: apikey});
        if(db === null) {
            return false;
        } else {
            return db.apikey;
        }
    }        
  async function adicionar_limit(apikey) {
        let key = await usuario.findOne({apikey: apikey});
        let min = key.limit - 1;
        usuario.updateOne({apikey: apikey}, {limit: min}, function (err, res) {
            if (err) throw err;
        })
    }    
  async function verificar_limit(apikey) {
        let key = await usuario.findOne({apikey: apikey});
        return key.limit;
    }
  async function isLimit(apikey) {
        let key = await usuario.findOne({apikey: apikey});
        if (key.limit <= 0){
            return true;
        } else {
            return false;
        }
    }    
      async function verificar_dinheiro(apikey) {
        let key = await usuario.findOne({apikey: apikey});
        return key.dinheiro;
    }
    async function adicionar_dinheiro(nome, quantia) {
        let key = await usuario.findOne({nome: nome});
        let dindin = key.dinheiro += quantia;
        usuario.updateOne({nome: nome}, {dinheiro: dindin}, function (err, res) {
            if (err) throw err;
        })
    }    
     async function Totalregistrados() {
        let db = await usuario.find({})
        return db.length
    }    
    
        async function resetar_todos_limit() {
        let users = await usuario.find({});
        users.forEach(async(data) => {
            let { premium, nome } = data
            if (premium !== null) {
                return usuario.updateOne({nome: nome}, {limit: limitPremium}, function (err, res) {
                    if (err) throw err;
                })   
            } else {
                return usuario.updateOne({nome: nome}, {limit: limitCount}, function (err, res) {
                    if (err) throw err;
                })
            }
        })
    }
    


//NÃO MEXA    
module.exports.add_usuario = add_usuario;
module.exports.verificar_nome = verificar_nome;
module.exports.pegar_apikey = pegar_apikey;
module.exports.verificar_apikey = verificar_apikey;
module.exports.adicionar_limit = adicionar_limit;
module.exports.verificar_limit = verificar_limit;
module.exports.adicionar_dinheiro = adicionar_dinheiro;
module.exports.verificar_dinheiro = verificar_dinheiro;
module.exports.isLimit = isLimit;
module.exports.Totalregistrados = Totalregistrados;
module.exports.resetar_todos_limit = resetar_todos_limit;