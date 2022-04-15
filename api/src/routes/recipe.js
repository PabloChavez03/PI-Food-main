const { Router } = require("express");
const axios = require("axios");
const {
  getAllFoods,
  getDbDetailFood,
  getApiDetailFood,
} = require("../controllers");
const { Diet, Recipe } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  const allFoods = await getAllFoods();

  if (name) {
    try {
      let nameFoods = allFoods?.filter((foodName) =>
        foodName.name?.toLowerCase().includes(name.toLowerCase())
      );

      nameFoods.length
        ? res.status(200).send(nameFoods)
        : res.status(404).json({
            msg: "No se encontraron las recetas solicitadas por Query",
          });
    } catch (error) {
      res.status(404).json({ msg: `El error fue: ${error}` });
    }
  } else {
    res.status(200).send(allFoods);
  }
});

//validator UUIDv4 --> defaultValue of Recipe model
const isUUID = (id) => {
  const regex =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
  return regex.test(id);
};

router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      if (isUUID(id)) {
        const foodDb = await getDbDetailFood(id);

        foodDb
          ? res.status(200).send(foodDb)
          : res
              .status(404)
              .json({ msg: "No se encontro la receta en base de datos" });
      } else {
        const foodApi = await getApiDetailFood(id);

        foodApi
          ? res.status(200).send(foodApi)
          : res.status(404).json({ msg: "No se encontro la receta en Api" });
      }
    } catch (error) {
      res.status(404).json({ msg: `El error fue: ${error}` });
    }
  } else {
    res.status(404).json({ msg: "El id ingresado no existe" });
  }
});

router.post("/recipe", async (req, res) => {
  let { name, summary, score, healthScore, steps, img, diets } = req.body;

  try {
    let [recipeCreated, created] = await Recipe.findOrCreate({
      where: {
        name,
        summary,
        score,
        healthScore,
        steps,
        img,
      },
    });

    let dietCreated = await Diet.findAll({
      where: {
        name: diets,
      },
    });

    await recipeCreated.addDiet(dietCreated);

    if (created) {
      res.status(201).send("La receta fue creada con exito");
    } else {
      res.sendStatus(304);
    }
  } catch (error) {
    console.log(Error(error));
  }
});

router.delete("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  try {
    let deleted = await Recipe.destroy({ where: { id } });
    res.status(200).send(`resource delete successfully ${deleted}`);
  } catch (error) {
    return new Error(error);
  }
});

router.patch("/recipes/:id", async (req, res) => {
  const id = req.params.id;
  let { name, summary, score, healthScore, steps, img, diets } = req.body;

  try {
    let modified = await Recipe.update(
      {
        name,
        summary,
        score,
        healthScore,
        steps,
        img,
        diets,
      },
      { where: { id } }
    );

    res.status(200).send(`resource update successfully ${modified}`);

  } catch (error) {
    return new Error(error);
  }
});

module.exports = {
  recipe: router,
  diet: require("./diet"),
};
