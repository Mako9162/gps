const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');

const moment = require('moment');

function usuController (req, res) {
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
}

function usuloginController (req, res) {
    const { usuario, password } = req.body;
    const sql = `SELECT * FROM usuapi WHERE usuario= '${usuario}' AND password= '${password}'`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const token = jwt.sign({ usuario: result[0].usuario }, 'smvssmvs', { expiresIn: '365d' });
            res.json({ token });
        } else {
            res.status(404).send('Usuario o contraseña erroneos!!!');
        }
    });
}

module.exports = {
    usuController,
    usuloginController
};