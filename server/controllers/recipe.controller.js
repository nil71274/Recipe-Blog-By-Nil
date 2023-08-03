require("../models/database.model");
const Category = require("../models/Category.model");
const Recipe = require("../models/Recipe.model")



/*
* GET /
* HOMEPAGE 
*/

exports.homepage = async(req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        const thai = await Recipe.find({'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find({'category': 'American'}).limit(limitNumber);
        const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNumber);
        // const indian = await Recipe.find({'category': 'Indian'}).limit(limitNumber);
        // const maxican = await Recipe.find({'category': 'Maxican'}).limit(limitNumber);

        const food = { latest, thai, american, chinese };


        res.render('index', {title: "Cooking Blog - Home", categories, food});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
} 

exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', {title: "Cooking Blog - Ctegories", categories});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
} 



exports.exploreCategoriesById = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber);
        res.render('categories', {title: "Cooking Blog - Categories", categoryById});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


exports.exploreRecipes = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', {title: "Cooking Blog - Recipe", recipe});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
} 


exports.searchRecipe = async(req, res)=>{
    try {
        let searchTerm = req.body.searchTerm;

        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}});
        res.render('search', {title: "Cooking Blog - Search", recipe});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}



exports.exploreLatest = async(req, res)=>{
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({_id: -1}).limit(limitNumber);
        res.render('explore-latest', {title: "Cooking Blog - Recipe", recipe});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}



exports.exploreRandom = async(req, res)=>{
    try {
        let count = await Recipe.find().countDocuments();
        let random = Math.floor(Math.random() * count);
        let recipe = await Recipe.findOne().skip(random).exec();
        res.render('explore-random', {title: "Cooking Blog - Recipe", recipe});   
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}


exports.submitRecipe = async(req, res)=>{
    const infoErrorsObj = req.flash('infoErrors');
    const infoSubmitObj = req.flash('infoSubmit');
    res.render('submit-recipe', {title: "Cooking Blog - Submit Recipe", infoErrorsObj, infoSubmitObj });
}

exports.submitRecipePost = async(req, res)=>{

    try {
        let uploadPath;
        if(req.files){
            var img = req.files.image;
            var imageName = Date.now() + img.name;
            console.log(imageName);

            uploadPath = require('path').resolve('./') + '/public/uploads/' + imageName;

            img.mv(uploadPath , function(err){
                if (err) {
                    res.send(err);
                }
            })
        }else{
            console.log("File is not uploaded.");
        }

        const newRecipe = Recipe({
            name: req.body.name,
            description: req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: imageName
        });
        await newRecipe.save();

        req.flash('infoSubmit', "Recipe has been added.");
        res.redirect('submit-recipe');
    } catch (error) {
        req.flash('infoErrors', error);
        res.redirect('submit-recipe');
    }
}


// exports.updateRecipe = async()=>{
//     try {
//         const res = await Recipe.updateOne({name: "Vaishnavi ka Bhadta",}, { name: "Vaishnavi"});
//         res.n; //matched documents
//         res.nModified; //modified documents
//     } catch (error) {
//         console.log(error);
//     }
// }

exports.aboutUs = function(req, res){
    try {
        res.render('about', {title: "Cooking Blog - About Us"});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}

exports.contactUs = function(req, res){
    try {
        res.render('contact', {title: "Cooking Blog - Contact Us"});
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"});
    }
}





























// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//       { 
//         "name": "Recipe Name Goes Here",
//         "description": `Recipe Description Goes Here`,
//         "email": "recipeemail@raddy.co.uk",
//         "ingredients": [
//           "1 level teaspoon baking powder",
//           "1 level teaspoon cayenne pepper",
//           "1 level teaspoon hot smoked paprika",
//         ],
//         "category": "American", 
//         "image": "southern-friend-chicken.jpg"
//       },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// insertDymmyRecipeData();
