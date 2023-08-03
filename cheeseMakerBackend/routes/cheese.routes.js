const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');

const { postCategoria } = require('../controllers/categoria.controllers.js');
const { getCategorias} = require('../controllers/cheese.controllers.js');


const router = Router();

router.get("/", getCategorias)





// Crear categoria - privado - cualquier persona con un token válido
router.post('/', [ 
   validateJWT, 
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validateDocuments
], postCategoria );







module.exports = router;