const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../", ".env") });
const { API_KEY } = process.env;
const { Recipe, Diet } = require("../db");

//trae las recetas de api
const getApiFoods = () => {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

  return axios.get(apiUrl, { params: { addRecipeInformation: true, number: 40 } })  
    .then((food) => {
      const data = food.data.results;
      return data?.map((f) => {
        return {
          id: f.id,
          name: f.title,
          summary: f.summary.replace(/<[^>]*>?/g, ""),
          score: f.spoonacularScore,
          healthScore: f.healthScore,
          steps: f.analyzedInstructions?.map((searchStep) =>
            searchStep.steps?.map((el) => {
              return { number: el.number, step: el.step };
            })
          ),
          img: f.image,
          diets: f.diets?.map((diet) => diet).join(" "),
        };
      });
    })
    .catch((error) => console.log(error));
};
// getApiFoods().then((data) => console.log(data));

//almacenar la info de la api en db

//le falta poco pero no es asi
const pullApiFoodInDb = () => {
  return getApiFoods().then((response) => {
    return response?.map((el) => {
      return Recipe.create({
        id: el.id,
        name: el.name,
        summary: el.summary,
        score: el.score,
        healthScore: el.healthScore,
        steps: el.steps,
        img: el.img,
        diets: el.diets?.map((diet) => diet.name).join(" "),
        createdInDB: el?.createdInDB,
      })
    })
  })
};

// pullApiFoodInDb().then(data => data)

//traigo las recetas de la base de datos
const getDbFoods = () => {
  return Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  })
    .then((response) => {
      return response?.map((foodsDb) => {
        return {
          id: foodsDb.id,
          name: foodsDb.name,
          summary: foodsDb.summary,
          score: foodsDb.score,
          healthScore: foodsDb.healthScore,
          steps: foodsDb.steps,
          img: foodsDb.img,
          diets: foodsDb.diets?.map((diet) => diet.name).join(" "),
          createdInDB: foodsDb.createdInDB,
        };
      });
    })
    .catch((error) => new TypeError(error));
};
// getDbFoods().then(data => console.log(data));

//traigo todas las recetas juntas
const getAllFoods = async () => {
  const apiFoods = await getApiFoods();
  const dbFoods = await getDbFoods();
  const allFoods = apiFoods?.concat(dbFoods);

  return allFoods;
};
// getAllFood().then((data)=> console.log(data));


const getApiDetailFood = (id) => {
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

  const apiInfo = axios(apiUrl)
    .then((response) => response.data)
    .catch(error => new TypeError(error));
  
  const apiDetail = apiInfo
    .then((foodDetail) => {
      return {
        name: foodDetail.title,
        dishTypes: foodDetail.dishTypes?.map((type) => type),
        diets: foodDetail.diets?.map((diet) => diet).join(" "),
        summary: foodDetail.summary?.replace(/<[^>]*>?/g, ""),
        score: foodDetail.spoonacularScore,
        healthScore: foodDetail.healthScore,
        img: foodDetail.image,
        steps: foodDetail.instructions?.replace(/<[^>]*>?/g, ""),
      };
    })
    .catch(error => new TypeError(error));
  
    return apiDetail;
}
// getApiDetailFood(716426).then(data => console.log(data));

const getDbDetailFood = async (id) => {
  const foods = await Recipe.findByPk(id, {
    include: [{
      model: Diet,
      as: "diets",
      attributes: ["name"],
      through: { attributes: [] },
    }],
  })
  .then((foods)=> foods.toJSON())
  .catch(error => new TypeError(error));

  foods.diets = foods.diets?.map((diet) => diet.name).join(" ");

  return foods;
};

const getDiets = () => {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;
  const diets = axios(apiUrl, { params: { addRecipeInformation: true, number: 40 } })
    .then(response => response.data.results)
    .then(json => json?.map(diet => diet.diets)) //array de arrays de dietas repetidas
    .then(diet => diet.flat()) //array de dietas repetidas
    .then(flat => [...new Set(flat)]) //array unico de dietas
    .catch(error => new Error(error));

  return diets
}

// getDiets().then((data)=> console.log(da  ta))


module.exports = {
  getAllFoods,
  getApiDetailFood,
  getDbDetailFood,
  getDiets,
};
