var express = require('express');
const {StatusCodes} = require('http-status-codes');
const { Model } = require('sequelize/lib/sequelize');
var router = express.Router();
const Models = require('../models')

//Buscar todos los usuarios
router.get('/', function(req, res, next) {
  Models.users.findAll({}).then((users)=>{
    res.status(StatusCodes.OK).json({data:users})
  }, (err) => {
    message = err
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
    next(err)
  })
});

//Buscar usuario por id
router.get('/:id', function(req, res, next) {
  Models.users.find({}).then((user)=>{
    res.status(StatusCodes.OK).json({data: user})
  }, (err) => {
    message = err
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
    next(err)
  })
});

//Crear user
router.post('/', (req, res, next)=>{
  console.log('llego');
  console.log('req.body',req.body);
  Models.users.create({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    avatar: req.body.avatar
  }).then((user)=>{
    res.status(StatusCodes.OK).json({data: user})
  }, (err) => {
    message = err
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
    next(err)
  })

})

//Actualizar user por id
router.put('/:id', function(req, res, next) {
 
  // console.log('id', req.params.id)
  Models.users.findOne({
    where:{ id : req.params.id }
  }).then((user)=>{
    if(user == null){
        res.status(StatusCodes.OK).json({message: 'Usuario no Existe',data: user})
    }else{
      user.update({
        email: (req.body.email != null) ? req.body.email : user.email,
        first_name: (req.body.first_name != null) ? req.body.first_name : user.first_name,
        last_name: (req.body.last_name != null) ? req.body.last_name : user.last_name,
        avatar: (req.body.avatar != null) ? req.body.avatar : user.avatar
      }).then((updatedUser)=>{
        res.status(StatusCodes.OK).json({message: 'Usuario Actualizado', data: updatedUser})
      }, (err) => {
        message = err
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        next(err)
      })
    }
    
  }, (err) => {
    message = err
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
    next(err)
  })
});



//Eliminar user por id
router.delete('/:id', function(req, res, next) {
 
  // console.log('id', req.params.id)
  Models.users.findOne({
    where:{ id : req.params.id }
  }).then((user)=>{
    if(user == null){
        res.status(StatusCodes.OK).json({message: 'Usuario no Existe',data: user})
    }else{
      user.destroy({
        where:{ id : user.id }
      }).then((userDeleted)=>{
        res.status(StatusCodes.OK).json({message: 'Usuario Eliminado', data: userDeleted})
      }, (err) => {
        message = err
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        next(err)
      })
    }
    
  }, (err) => {
    message = err
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
    next(err)
  })
});


module.exports = router;
