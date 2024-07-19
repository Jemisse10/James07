sayo = process.cwd()


/*******FUNÇÕES NECESSÁRIAS********/
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')
const fs = require('fs')
const axios = require('axios')
const paramtroerro = sayo + '/views/ErroLink.html' //400
//TODAS AS APIS/SCRAP
const { 
 styletext, //FONTE DAS LETRAS
 ytDonlodMp3, //YTMP3 BAIXAR ÁUDIOS DO YT VIA LINK
  ytDonlodMp4, //YTMP4 BAIXAR VÍDEOS DO YT VIA LINK
  ytPlayMp3, //PLAY BAIXAR ÁUDIOS DO YT VIA NOME
  ytPlayMp4, //PLAYVÍDEO BAIXAR VÍDEOS DO YT VIA NOME
 } = require("./funções/api");
global.api = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: apikey } : {}) })) : '')

const { 
 verificar_apikey, 
 adicionar_limit, 
 isLimit, 
 verificar_limit 
} = require("./db/db");


require("./edite");



/*******FIM DAS FUNÇÕES NECESSÁRIAS********/

const criador = ['@jemisse']; // Nome do criador

resposta = { //MSG DE ERRO NO SERVIDOR
    semkey: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'por favor faça login e consiga uma key aleatoria'
    },
    cdtxt: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'insira o texto na url'
    },
    cdimg: {
        status: false,
        criador: `${criador}`,
        código: 406,
        mensagem: 
        'Insira a imagem na url'
    },
    error: {
       status: false,
        criador: `${criador}`,
        mensagem: 
        'ops :/ deu erro no servidor interno'
    }
}

/*******ALGUMAS FUNÇÕES********/
async function getBuffer(url) {
  he = await fetch(url).then(c => c.buffer())
   return he
}
async function getJson(url) {
  he = await fetch(url).then(c => c.json())
   return he
}
function getRandom(nans) {
  he = nans[Math.floor(Math.random() * nans.length)]
   return he
}


const fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

/*****************************************
*                                                                 
*                                                                          
*╔══╗╔═╦╗  ╔══╗╔══╗╔═╦╗╔═╗   *
*║╔╗║╚╗║║  ║══╣║╔╗║╚╗║║║║║   *
*║╔╗║╔╩╗║  ╠══║║╠╣║╔╩╗║║║║   *
*╚══╝╚══╝  ╚══╝╚╝╚╝╚══╝╚═╝   *
*────────  ───────────────   *        
*                                                                         
******************************************/

/******************************************


**********************************/

//API REST....

router.get('/verkey', async (req, res) => {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.json(resposta.semkey)
    const veri_key = await verificar_apikey(apikey);
     if (!veri_key) return res.json({ status : false, criador : `${criador}`, mensagem : "essa apikey não está registrada"})
    const limit = await verificar_limit(apikey);
    res.send({status: 200, apikey: apikey, limit: limit});
});



    router.get('/card/welcome', async (req, res) => {
    const cdapikey = req.query.apikey;
    const nome = req.query.nome;    
    const titulo = req.query.titulo;    
    const msg = req.query.msg;    
    const perfil = req.query.perfil;            
    const wallpaper = req.query.wallpaper;
    const cor1 = req.query.cor1;  
    const cor2 = req.query.cor2; 
    const cor3 = req.query.cor3; 
    if (!nome) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô nome"})
    if (!titulo) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô titulo"})
    if (!msg) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô msg"})
    if (!perfil) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô perfil"})
    if (!wallpaper) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô wallpaper"})
    if (!cor1) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô cor1"})
        if (!cor2) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô cor1"})
        if (!cor3) return res.json({ status : false, criador : `${criador}`, message : "coloque o parametrô cor1"})
    const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
adicionar_limit(cdapikey);
buff =
await 
getBuffer(api(
'tohka', 
'/api/'+
'canvas/' +
'bemvindod', 
{
texto: titulo,
texto3: nome,
texto2: msg,
img: perfil,
img2: wallpaper,
cor1: cor1,
cor2: cor2,
cor3: cor3
}
, 'apikey'
))
res.type('png')
res.send(buff)
});
   
   router.get('/card/welcome2', async (req, res) => {
       const cdapikey = req.query.apikey;
       const perfil = req.query.perfil;
       const perfil2 = req.query.perfil2;
       const texto = req.query.texto;
       const texto2 = req.query.texto2;
       const texto3 = req.query.texto3;
       const texto4 = req.query.texto4;
       const cor1 = req.query.cor1;
       const cor2 = req.query.cor2;
       const fundo = req.query.fundo;
        if (perfil === undefined || texto === undefined || texto2 === undefined || texto3 === undefined || texto4 === undefined || cor1 === undefined || cor2 === undefined || fundo === undefined || apikey === undefined || perfil2 === undefined) return res.sendFile(paramtroerro)

    const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
adicionar_limit(cdapikey);
buff =
await 
getBuffer(api(
'tohka', 
'/api/'+
'canvas/' +
'bemvindod2', 
{
texto: texto,
texto3: texto3,
texto2: texto2,
texto4: texto4,
img: perfil,
img2: perfil2,
cor1: cor1,
cor2: cor2,
fundo: fundo
}
, 'apikey'
))
res.type('png')
res.send(buff)
});

 router.get('/download/play', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
    const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
 if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome"})
 ytPlayMp3(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})

 router.get('/download/playv', async(req, res, next) => {
 var cdapikey = req.query.apikey;
 nome = req.query.nome
    const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
 if (!nome) return res.json({ status : false, criador : `criador`, mensagem : "Coloque o nome"})
 ytPlayMp4(nome).then((akk) => {
res.json({
status: true,
código: 200,
criador: `${criador}`,
resultado: akk
})}).catch(e => {
res.sendFile(error)})})


 router.get('/waifu', async (req, res) => {
 var cdapikey = req.query.apikey;
   try {
  if (cdapikey === undefined) return res.json(resposta.semkey)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       getBuffer(api(
       'tohka', 
       '/api/'+
       'anime/' +
       'waifu', 
       {}, 
       'apikey'
       ))
       res.type('png')
       res.send(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })


 router.get('/pesquisa/xvideos', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.nome;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'pesquisa/' +
       'xvideos', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })

 router.get('/pesquisa/pornhub', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.nome;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'pesquisa/' +
       'pornhubsrc', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })

 router.get('/pesquisa/playstore', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.nome;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'pesquisa/' +
       'playstore', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })


 router.get('/pesquisa/wallpaper', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.nome;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'pesquisa/' +
       'wallpaper', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })


 router.get('/pesquisa/pinterest', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.nome;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'pesquisa/' +
       'pinterest', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })


 router.get('/ferramenta/fontes', async (req, res) => {
 var cdapikey = req.query.apikey;
 var nome = req.query.texto;
   try {
  if (cdapikey === undefined || nome === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'ferramenta/' +
       'stilodetxt', 
       {nome}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })

 router.get('/ferramenta/metadinha', async (req, res) => {
 var cdapikey = req.query.apikey;
   try {
  if (cdapikey === undefined) return res.sendFile(paramtroerro)
        const check = await verificar_apikey(cdapikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${cdapikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(cdapikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou compre o premium...'});
   adicionar_limit(cdapikey);
       buff =
       await 
       fetchJson(api(
       'tohka', 
       '/api/'+
       'ferramenta/' +
       'metadinha', 
       {}, 
       'apikey'
       ))
       res.json(buff)
   } catch (e) {
   res.send(resposta.error)
   }
   })


module.exports = router


/******************************\
╭━━━╮╭━━╮╭━╮╭━╮
┃╭━━╯╰┫┣╯┃┃╰╯┃┃
┃╰━━╮╱┃┃╱┃╭╮╭╮┃
┃╭━━╯╱┃┃╱┃┃┃┃┃┃
┃┃╱╱╱╭┫┣╮┃┃┃┃┃┃
╰╯╱╱╱╰━━╯╰╯╰╯╰╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱
*******************************/