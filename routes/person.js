const Person = require('../models/person');
const express = require('express');
const router = express.Router();
// create document : post 
router.post('/',(req,res)=>{
    const newPerson = new Person({ ...req.body});
    newPerson.save().then(()=>res.send("user added"))
    .catch((err)=>res.send(err))
})
// Find all the people having a given name
router.get('/',(req,res)=>{
    Person.find({name:{$exists: true}})
    .then((persons)=>res.send(persons))
.catch((err)=>res.send(err)); 
})

// Find just one person which has a certain food in the person's favorites, 
// using Model.findOne() -> Person. Use the function argument food as search key.
router.get('/favoritefood',(req,res)=>{
    Person.findOne({favoriteFoods:{$in: ["pizza"]}})
    .then((persons)=>res.send(persons))
.catch((err)=>res.send(err)); 
})
// Find the (only!!) person having a given _id, using Model.findById() -> 
// Person. Use the function argument personId as the search key.
router.get('/:_id',(req,res)=>{
    let {_id}= req.params;
    Person.findById({_id})
    .then((person)=>res.send(person))
    .catch((err)=>res.send(err));
});
// Find a person by _id ( use any of the above methods ) with the parameter personId as search key. Add "hamburger" to the list of the person's favoriteFoods (you can use Array.push()). 
// Then - inside the find callback - save() the updated Person.

router.put('/:_id',(req,res)=>{
    let {_id} = req.params;
    Person.findByIdAndUpdate({_id},
        { $push: { favoriteFoods:"hamburger" } })
    .then(()=>res.send("user updated"))
    .catch((err)=>res.send(err));
})

// Find a person by Name and set the person's age to 20.
//  Use the function parameter personName as search key.
router.put('/:name',(req,res)=>{
    
    Person.findOneAndUpdate({name},
        { $set: {age:20 } })
    .then(()=>res.send("user updated"))
    .catch((err)=>res.send(err));
})
// Delete One Document Using findByIdAndRemove
router.delete('/:_id',(req,res)=>{
    let {_id}= req.params;
    Person.findByIdAndRemove({_id})
    .then(()=>res.send("user deleted"))
    .catch((err)=>res.send(err));
});

//  Delete Many Documents with model.remove()

router.delete('/',(req,res)=>{
    Person.remove({name:{$eq:"Mary"}})
    .then(()=>res.send("user deleted"))
    .catch((err)=>res.send(err));
})

// Find people who like burrito. Sort them by name, limit the results to two documents, and hide their age. Chain .find(), .sort(), .limit(), .select(), and then .exec().
//  Pass the done(err, data) callback to exec().

module.exports = router;