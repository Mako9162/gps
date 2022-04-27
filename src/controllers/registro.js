const jwt = require('jsonwebtoken');

const db = require('../lib/db.js');

const moment = require('moment');

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
                    console.log(result);
                    res.json(result);
                }else{
                    res.status(404).send('Sin Resultados!!!');
                };
            });
        } ;       

    });

};

function regController( req, res) {
    
   const patente = req.body.patente;

   const sql = 'SELECT vehi_id FROM vehiculo WHERE vehi_patente= ?';

   db.query(sql, [patente],(error, result) =>{
    if (result.length > 0){
        
        const r_patente= JSON.parse(JSON.stringify(result[0].vehi_id));

        jwt.verify(req.token, "smvssmvs", (err) => {
            if(err){
                res.status(403).send('Token no valido');
            }else{
                
                const imei = req.body.imei;

                const sql2 = 'SELECT * FROM equipo WHERE equi_vehi_id= ? AND equi_imei= ?'; 

                db.query(sql2,[r_patente, imei], (error, result)=>{
                    if (result.length > 0){

                    const sql1 = 'INSERT INTO registro SET ?';

                    const fechap = req.body.fechaPos;
                    const fechar = req.body.fechaEnv;

                    const fechaPosi = moment(fechap, 'YYYY-MM-DD HH:mm:ss', true).isValid();
                    const fechaEnvi = moment(fechar, 'YYYY-MM-DD HH:mm:ss', true).isValid();

                    if (fechaPosi && fechaEnvi == true){
                        const pos= moment(fechap).unix();
                        const env= moment(fechar).unix();
                        // console.log(pos);
                        // console.log(env);
                        const refe= moment(new Date()).unix();
                        // console.log(refe);

                    const customerObj = {

                        regi_altitud: req.body.altitud,
                        regi_azimut: req.body.azimut,
                        regi_fecha: refe,
                        regi_fecha_insercion: refe,
                        regi_fecha_posicion: pos,
                        regi_fecha_recibido: env,
                        regi_fix: req.body.fix,
                        regi_ignicion: req.body.ignicion,
                        regi_latitud: req.body.latitud,
                        regi_longitud: req.body.longitud,
                        regi_velocidad: req.body.velocidad,
                        regi_vehi_id: r_patente,
                        regi_avl: req.body.avl,
                        regi_ori: req.body.orientacion,
                        regi_volt: req.body.voltaje,
                        regi_can: req.body.can,
                        regi_odo: req.body.odometro,
                        regi_acelerador: req.body.acelerador,
                        regi_consumo: req.body.consumo,
                        regi_combustible: req.body.combustible,
                        regi_horometro: req.body.horometro,
                        regi_rpm: req.body.rpm,
                        regi_tempMotor: req.body.tempMotor,
                    
                    };

                db.query(sql1, customerObj, (error, result) => {
                    if (error) throw error;
                    //console.log(customerObj);
                    res.status(200).send('Guardado correctamente !');
                });
                    }else{
                        res.status(403).send('Error en formato');
                    };

                    }else{
                        sql4 = 'INSERT INTO equipo SET ?';

                        const insertimei = {equi_vehi_id: r_patente, equi_imei: imei};

                        db.query(sql4, insertimei, (error, result) => {
                            
                        });

                            const sql5 = 'INSERT INTO registro SET ?';

                            const fechap1 = req.body.fechaPos;
                            const fechar1 = req.body.fechaEnv;
        
                            const fechaPosi1 = moment(fechap1, 'YYYY-MM-DD HH:mm:ss', true).isValid();
                            const fechaEnvi1 = moment(fechar1, 'YYYY-MM-DD HH:mm:ss', true).isValid();
        
                            if (fechaPosi1 && fechaEnvi1 == true){
                                const pos1= moment(fechap1).unix();
                                const env1= moment(fechar1).unix();
                                const refe1= moment(new Date()).unix();

                            const customerObj = {

                                regi_altitud: req.body.altitud,
                                regi_azimut: req.body.azimut,
                                regi_fecha: refe1,
                                regi_fecha_insercion: refe1,
                                regi_fecha_posicion: pos1,
                                regi_fecha_recibido: env1,
                                regi_fix: req.body.fix,
                                regi_ignicion: req.body.ignicion,
                                regi_latitud: req.body.latitud,
                                regi_longitud: req.body.longitud,
                                regi_velocidad: req.body.velocidad,
                                regi_vehi_id: r_patente,
                                regi_avl: req.body.avl,
                                regi_ori: req.body.orientacion,
                                regi_volt: req.body.voltaje,
                                regi_can: req.body.can,
                                regi_odo: req.body.odometro,
                                regi_acelerador: req.body.acelerador,
                                regi_consumo: req.body.consumo,
                                regi_combustible: req.body.combustible,
                                regi_horometro: req.body.horometro,
                                regi_rpm: req.body.rpm,
                                regi_tempMotor: req.body.tempMotor,
                    
                            };

                            db.query(sql5, customerObj, (error, result) => {
                                if (error) throw error;
                                //console.log(customerObj);
                                res.status(200).send('Guardado correctamente !');
                            });

                        }else{
                            res.status(400).send('Error en formato');
                        };


                    };
                });

            };

        });

    }else{
        res.status(404).send(`El Movil: ${patente}, no esta registrado`);
    };

    });
  
};

module.exports = {
    regidController,
    regController
};