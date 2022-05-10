const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const db = require('../lib/db.js');

const pass = require('../lib/jwt.js');
const regi = require('../controllers/registro');
const usuario = require('../controllers/usuario');
const { rulesToMonitor } = require('nodemon/lib/monitor/match');


// router.post('/login', (req, res) => {
//     const user = {
//         id: 1,
//         username: 'Marco Arancibia',
//         email: 'marancibia@outlook.com'
//     }

//     jwt.sign({user: user}, 'smvssmvs', {expiresIn: '365d'}, (err, token) => {
//         res.json({ 
//             token,
//         });
//     });
// });
//prueba para el token
router.post('/post', pass, (req, res) => {
    jwt.verify(req.token, "smvssmvs", (err, authData) => {
        if(err){
            res.status(403).send('Token no valido');
        }else{
            const {usuario, email} = authData;
            sql = `SELECT * FROM usuapi WHERE usuario= '${usuario}' and est=1`;
            db.query(sql, (err, result) => {
                if(!result.length){
                    res.status(404).send('Usuario Inactivo!!!');
                }else{
                    res.status(200).send('Usuario Activo!!!')
                    // res.json({
                    //     Mensaje: "Usuario Activo!!!",
                    //     authData : {usuario,
                    //                 email}
                    // });
                }
            });            
            
            // console.log(usuario);
        }   
    });
});

//ruta de usuarios
router.post('/usureg', usuario.usuController);
router.post('/usulogin', usuario.usuloginController);

//ruta de registros
router.get('/registro/:regi_id', pass, regi.regidController);
router.post('/registro', pass, regi.regController);
// router.post('/registros', pass, regi.insController);

// ruta de vehiculo


module.exports = router;