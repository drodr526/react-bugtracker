const mongoose = require("mongoose");

const bugSchema = mongoose.Schema({
    title:String,
    description:String,
    team:Array,
    submittedBy:String,
    timeSubmitted:String,
    comments:Array,
})

const Bug = mongoose.model("bug", bugSchema);

module.exports = Bug;