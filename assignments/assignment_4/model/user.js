const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
    name:{type: String, required:true},
    email:{type:String, required:true},
    isPromoted:{type:Boolean, default:null}
});

const Task = mongoose.model('Task', taskSchema);

module.exports=Task;