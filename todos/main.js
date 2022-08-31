//express framework
let express = require("express");
const e = require("express");
//defining PORT
let PORT = 8080;
//create the application server object
let app = express();
//enable app to parse JSON
app.use(express.json());
//start the application and log the PORT it is listening on
app.listen(PORT, function (){
    console.log("Application has started on PORT:",PORT)
});
//Get pseudo random int
//This number will always return something between 0 - 999,999 but never 1,000,000
let getRandomInt = function (){
    let randomFloat = Math.random();
    let bigRandomFloat = randomFloat * 1000000;
    let randomInt = Math.floor(bigRandomFloat);
    return randomInt;
}
//This is our database of items
//when we learn SQL we will work with a real db
let db = [];
//GET all items
app.get("/todos", function (req, res){
    console.log("GET /todos");
    res.json(db); //irl this is a bad idea, but we wont have enough data to mess anything up
})
//GET a specific item based on id - loop through the array to find
app.get("/todos/:id", function (req, res){
    console.log("GET /todos/:id");
    //find id from route
    let myId = req.params.id;
    //find item in db that matches id - .find() is a higher order loop, there are tons of ways to do this
    let matchingItem = db.find(function (item,index){
        return item.id == myId;
    })
    if (matchingItem){
        res.json(matchingItem)}
    else {res.json(null)};
})
//DELETE a specific item based on id
app.delete("/todos/:id", function (req, res){
    console.log("DELETE /todos/:id");
    //find id from route
    let myId = req.params.id;
    //remove item from array

    let matchingIndex = db.findIndex(function (item,index){
        return item.id == myId;
    })
    // if the index is less than 0 that means no matching index was found so return null
    if(matchingIndex <0){
        res.json(null)
    } else { // remove the item from the db array and return it
        let deleted = db.splice(matchingIndex,1);
        res.json(deleted)
    }
})
//POST a new item
app.post("/todos", function (req, res){
    console.log("POST /todos");
    // read the description from the req body,
    // create an id with the randomInt function created earlier,
    // set completion status to false
    let description = req.body.description;
    let id = getRandomInt();
    let completed = false;
    //create new object
    let newItem = {}
    newItem.description = description;
    newItem.id = id;
    newItem.completed = completed;
    //add object to array
    db.push(newItem);
    //return new object in res
    res.json(newItem);
})
//PUT an update to a specific item
app.put("/todos/:id", function (req, res){
    console.log("PUT /todos/id")
    //get id from route that we will update
    //get new description from body
    //get new completed flag from body
    let myId = req.params.id;
    let description = req.body.description;
    let completed = req.body.completed == true;
    //get the item from db that we will update
    let matchingItem = db.find(function (item,index){
        return item.id === myId;
    });
    if (matchingItem){
        matchingItem.description = description;
        matchingItem.completed = completed;
        res.json(matchingItem)
    } else {
        res.json(null);
    }


});