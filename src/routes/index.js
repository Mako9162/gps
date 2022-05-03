const {Router} = require('express');
const router = Router();
const jwt = require('jsonwebtoken')
const db = require('../lib/db.js');

const pass = require('../lib/jwt.js');
const regi = require('../controllers/registro');
const { rulesToMonitor } = require('nodemon/lib/monitor/match');

router.post('/reg', (req, res) => {
    const reg = {
        
        usuario: req.body.usuario,
        password: req.body.password

    };

    const usu = reg.usuario;

    const sqlu = `SELECT usuario FROM usuapi WHERE usuario= '${usu}'`;
    
    db.query(sqlu, (err, result) => {
        if(!result.length){
            const sql = 'INSERT INTO usuapi SET ?';
            db.query(sql, reg, (err, result) => {
                if(err){
                    res.status(500).send('Error en el servidor');
                }else{
                    res.status(200).send('Usuario creado');
                }
            });

        }else{
            res.status(404).send('Usuario ya existe');
        }
    });
 
    
});

router.post('/login', (req, res) => {
    const { usuario, password } = req.body;
    const sql = `SELECT * FROM usuapi WHERE usuario= '${usuario}' AND password= '${password}'`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const token = jwt.sign({ usuario: result[0].usuario }, 'smvssmvs', { expiresIn: '365d' });
            res.json({ token });
        } else {
            res.status(404).send('Usuario o contraseña erroneos!!!');
        };
    });
});


    //ruta de login que genera el token 
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
            res.json({
                message:"Token Valido",
                authData
            });
        }   
    });
});

//ruta de registros
router.get('/registro/:regi_id', pass, regi.regidController);
router.post('/registro', pass, regi.regController);
// router.post('/registros', pass, regi.insController);

// ruta de vehiculo


module.exports = router;