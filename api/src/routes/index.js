const { Router } = require('express');
const axios = require('axios');
const { getAllFoods } = require("../controllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req,res) => {
  const name = req.query.name;
  const allFoods = await getAllFoods();

  if (name) {
    try {
    let nameFoods = allFoods?.filter(foodName => foodName.name?.toLowerCase().includes(name.toLowerCase()));

    nameFoods.length
    ? res.status(200).send(nameFoods)
    : res.status(404).json({msg :"No se encontraron las recetas solicitadas por Query"})
    } catch (error) {
      res.status(404).json({msg: `El error fue: ${error}`});      
    };
  } else {
    res.status(200).send(allFoods);
  };
});


module.exports = router;
