const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join(__dirname, "../../", ".env") });
const { API_KEY } = process.env;
const { Recipe,Diet } = require("../db");


//trae las recetas de api
const getApiFoods = () => {
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`;

  return Promise.all([
    axios.get(apiUrl, { params: { addRecipeInformation: true, number: 40 } }),
  ])
    .then(([food]) => {
      const data = [...food.data.results];
      return data?.map((f) => {
        return {
          id: f.id,
          name: f.title,
          summary: f.summary,
          score: f.spoonacularScore,
          healthScore: f.healthScore,
          steps: f.analyzedInstructions?.map((searchStep) => searchStep.steps),
          img: f.image,
          diets: f.diets?.map((diet) => diet),
        };
      });
    })
    .catch((error) => console.log(error));
};
// getApiFoods().then((data) => console.log(data));


//traigo las recetas de la base de datos
const getDbFoods = () => {
  return Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      }
    }
  })
  .then((response)=> {
    return response?.map(foodsDb => {
      return {
        id: foodsDb.id,
        name: foodsDb.name,
        summary: foodsDb.summary,
        score: foodsDb.score,
        healthScore: foodsDb.healthScore,
        steps: foodsDb.steps?.map((searchStep) => searchStep),
        img: foodsDb.img,
        diets: foodsDb.diets?.map((diet) => diet.name),
        createdInDB: foodsDb.createdInDB,
      };
    })
  })
  .catch(error => new TypeError(error));
};
// getDbFoods().then(data => console.log(data));
