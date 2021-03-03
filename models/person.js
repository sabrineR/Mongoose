const mongoose = require("mongoose");
const schema = mongoose.Schema;
//  definir la structure de schema
const personSchema = new schema({
    name:{type: String},
    age:{type: Number},
    favoriteFoods: [String]

});
const Person = mongoose.model("person",personSchema);
module.exports = Person;