const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');

function usuController (req, res) {
    const reg = {
        
        usuario: req.body.usuario,
        email: req.body.email,
        password: req.body.password,
        est: 1

    };

    const usu = reg.usuario;

    // console.log(usu);

    const emaile = reg.email;

    const sqlu = `SELECT usuario FROM usuapi WHERE usuario= '${usu}' OR email= '${emaile}'`;
    
    db.query(sqlu, (err, result) => {
        if(!result.length){
            const sql = 'INSERT INTO usuapi SET ?';
            db.query(sql, reg, (err, result) => {
                if(err){
                    res.status(500).send('Error en el servidor!!!');
                }else{
                    res.status(200).send('Usuario creado!!!');
                    // console.log(result);
                }
            });

        }else{
            res.status(404).send('Nombre de usuario o email ya existentes');
        }
    });
}

function usuloginController (req, res) {
    const { usuario, password } = req.body;
    const sql = `SELECT * FROM usuapi WHERE usuario= '${usuario}' AND password= '${password}'`;
    db.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const token = jwt.sign({ usuario: result[0].usuario, email: result[0].email, password: result[0].password  }, 'smvssmvs', { expiresIn: '365d' });
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