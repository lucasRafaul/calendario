const express = require ('express');

const respuestas = require('../../red/respuestas.js')
const controlador = require('./index.js')

const router = express.Router();

router.get('/',todos);
router.get('/:id',uno);
router.post('/', agregar);
router.put('/',eliminar);

async function todos(req, res, next){
    try{
        const items = await controlador.todos()
        respuestas.success(req, res, items, 200)
    }catch(err){
        next(err);
    }
    
        
};

async function uno(req, res, next){
    try{
        const items = await controlador.uno(req.params.id)
        respuestas.success(req, res, items, 200)
    }catch(err){
        next(error);
    }
        
};

async function agregar(req, res, next){
    try{
        const items = await controlador.agregar(req.body)
        if(req.body.id == 0){
            mensaje = 'Item guardado correctamente';
        }else{
            mensaje = 'Item actualizado con exito';
        }
        respuestas.success(req, res, mensaje, 201)
    }catch(err){
        next(err);
    }
    
        
};


async function eliminar(req, res, next){
    try{
        const items = await controlador.eliminar(req.body)
        respuestas.success(req, res, 'item eliminado', 200)
    }catch(err){
        next(err);
    }
    
        
};


module.exports = router;