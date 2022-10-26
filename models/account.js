import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, required:true},
    password: {type: String, required:true},
    createdAt: {type : Date, default : Date.now},
    fisrtName:String,
    lastName: String,
    dob:Date,
    gender: String,
    avatar: {type: String, default: 'https://i.pinimg.com/originals/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg'},
    isVerified:{type: Boolean, default: true},
    passcode: Number,
    contact: {
        address: String,
        city: String,
        state: String,
        zipcode: String,
        mobile:String
    }

});

export default mongoose.model('Account',accountSchema);