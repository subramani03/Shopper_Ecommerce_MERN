const mongoose= require("mongoose");
const validator= require("validator");

const userSchema =mongoose.Schema({    
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Invalid email address");
            }
          },

    },
    password:{
        type:String,
        required:true,
        minLength:8,
         validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Invalid email address");
        }
      },
    },
    cartdata:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    },
});

const UserModel = mongoose.model("UserDetails",userSchema);
module.exports=UserModel;