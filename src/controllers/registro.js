const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');

function regidController(req, res) {
    
    const {regi_id} = req.params;

    const sql = `SELECT * FROM registro WHERE regi_id= ${regi_id}` ;

    jwt.verify(req.token, "smvssmvs", (err) => {
        if(err){
            res.status(403).send('Token no valido');
        }else{
            db.query(sql, (error, result) => {
                if (error) throw error;
                if (result.length > 0){
                    res.json(result);
                }else{
                    res.status(404).send('Sin Resultados!!!');
                }
            });
        }        

    });

};

function regController( req, res) {
    
    const sql = 'INSERT INTO registro SET ?';

    const customerObj = {

        
        regi_altitud: req.body.regi_altitud,
        regi_azimut: req.body.regi_azimut,
        regi_fecha: req.body.regi_fecha,
        regi_fecha_insercion: req.body.regi_fecha_insercion,
        regi_fecha_posicion: req.body.regi_fecha_posicion,
        regi_fecha_recibido: req.body.regi_fecha_recibido,
        regi_fix: req.body.regi_fix,
        regi_ignicion: req.body.regi_ignicion,
        regi_latitud: req.body.regi_latitud,
        regi_longitud: req.body.regi_longitud,
        regi_velocidad: req.body.regi_velocidad,
        regi_vehi_id: req.body.regi_vehi_id
                    
    };



    const vehi =req.body.regi_vehi_id;

    const sql1= `SELECT * FROM vehiculo WHERE vehi_id= ${vehi}` ;

    db.query(sql1, (error, result) => {
        if (error) throw error;
        if (result.length > 0){
            jwt.verify(req.token, "smvssmvs", (err) => {
                if(err){
                    res.status(403).send('Token no valido');
                }else{
        
                    db.query(sql, customerObj, error => {
                        if (error) throw error; 
                        //console.log(customerObj);
                        res.status(200).send('Guardado correctamente !');
                    });
                }
            });
        }else{
            //console.log(`El Movil id: "${vehi}", no esta ingresado`);
            res.status(404).send(`El Movil id: "${vehi}", no esta ingresado`);
        }
    });
   
};

module.exports = {
    regidController,
    regController
};