var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res,next) => {

  models.biblioteca.findAll({attributes: ["id","nombre","id_alumno"],
      
      /////////se agrega la asociacion 
      include:[{as:'Alumno-Relacionada', model:models.alumno, attributes: ["id","nombre"]}]
      ////////////////////////////////

    }).then(bibliotecas => res.send(bibliotecas)).catch(error => { return next(error)});
});



router.post("/", (req, res) => {
  models.biblioteca
    .create({ nombre: req.body.nombre,id_alumno:req.body.id_alumno })
    .then(biblioteca => res.status(201).send({ id: biblioteca.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra materia con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findmateria = (id, { onSuccess, onNotFound, onError }) => {
  models.biblioteca
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(biblioteca => (biblioteca ? onSuccess(biblioteca) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findmateria(req.params.id, {
    onSuccess: biblioteca => res.send(biblioteca),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = biblioteca =>
  biblioteca
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra materia con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findmateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = biblioteca =>
  biblioteca
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findmateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
