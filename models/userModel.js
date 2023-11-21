import mongoose  from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin: {
        type: Boolean,
        default: false, 
      },
      isBlocked: {
        type: Boolean,
        default: false,
      },
      userImage: {
        type: String,
      },
},{
    timestamps:true
})



userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }


    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})


userSchema.methods.matchPasswords=async function(enteredPassword){

    const isMatch = await bcrypt.compare(enteredPassword, this.password);
    return isMatch;

}

const User=mongoose.model('users',userSchema)


export default User