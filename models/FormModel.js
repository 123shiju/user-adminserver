import mongoose from "mongoose"

const formSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type:String,
        required:true,
    },
    fields:[{
        label:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            enum:['text','dropdown','radio','multichoice'],
            required:true,
        },
        options:[{
            type:String,
        }],
        placeholder:{
            type:String,
            default:'',
        },
    }],
})

const Form=mongoose.model('Form',formSchema)

export default Form