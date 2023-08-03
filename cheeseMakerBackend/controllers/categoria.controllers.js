const Categoria  = require('../models/Categoria.js'); 



// 17. getUsers
const getCategorias = async (req, res) => {
    const { hasta, desde } = req.query;
    const query = { estado: true };

    try {
        const { total, categorias } = await Promise.all([
            Categoria.countDocuments(query),
            Categoria.find(query)
            .populate('usuarios', ['nombre', 'email'])
            .skip( Number( desde ) )
            .limit(Number( hasta ))
        ]);

        res.json({
            total,
            categorias,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías.' });
    }
};


//post
const postCategoria = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

     const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }
   /*  console.log("usuario:",usuario); */
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    
    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

const deleteCategoria = async (req, res)=>{
    //19.  extraigo y respondo id pasado como parametro desde postman
    const {id} = req.params

    const usuario = await Categoria.findByIdAndUpdate( id, { estado: false } );

    res.json(usuario)
}

const putCategorias = async (req, res)=>{
  /* 1- http put ini*/
    const { id } = req.params;
    //Extraigo lo que NO necesito que se registre en MONGODB
    // incluyendo el object _id de mongodb
    const { _id, nombre, estado, ...resto } = req.body;
    //Busca documento por el id y actualiza lo deseado(resto) de la coleccion.
    const usuario = await Categoria.findByIdAndUpdate( id, resto );

    res.json({
        msg:"Usuario Actualizado",
        usuario : usuario
    });
     /* 1- http put fin */
}



module.exports = {
    getCategorias,
    postCategoria,
    deleteCategoria,
    putCategorias
 
}