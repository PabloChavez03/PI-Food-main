const { Router } = require("express");
const axios = require("axios");
const {
  getDiets,
} = require("../controllers");
const { Diet } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/types", async (req, res) => {
  const allDiets = await getDiets();

  allDiets.forEach((diet) => {
    Diet.findOrCreate({
      where: {
        name: diet,
      },
    });
  });

  let dietDb = await Diet.findAll();

  res.status(200).send(dietDb);
});

module.exports = router;