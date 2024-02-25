import asynchandler from 'express-async-handler'
import Form from '../models/FormModel.js'




const submitform=asynchandler(async(req,res)=>{
    try {
        const { title , fields }=req.body
    
        const userId=req.user._id

        if(!title || !fields || fields.length===0){
            return res.status(400).json({message:'title and fields are required'})
        }
        const newForm=new Form({userId,title,fields})
        await newForm.save()
        res.status(201).json(newForm)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Internal Server Error'})
    }
})

const getForms = async (req, res) => {
    try {
      const { userId } = req.query;
      const forms = await Form.find({userId:userId});
  
      res.status(200).json({ success: true, forms });
    } catch (error) {
      console.error('Error fetching forms:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };



  const deleteField = async (req, res) => {
    try {
      const { formId } = req.body;

      await Form.deleteOne({ _id: formId });
  
      res.status(200).json({ success: true, message: 'Form deleted successfully' });
    } catch (error) {
      console.error('Error deleting form:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  

  const update = async (req, res) => {
    try {
      const { formId } = req.params;
      console.log("formid of updated :", formId);
  
      const { updatedForm } = req.body;
      console.log("data from frontend:", updatedForm);
  
      if (!formId || !updatedForm) {
        return res
          .status(400)
          .json({ success: false, error: 'Invalid input data' });
      }
  
      const updatedFormDocument = await Form.findByIdAndUpdate(
        formId,
        { $set: { fields: updatedForm.fields } }, // Update the entire 'fields' array
        { new: true }
      );
  
      if (!updatedFormDocument) {
        return res.status(404).json({ success: false, error: 'Form not found' });
      }
  
      res.status(200).json({ success: true, updatedForm: updatedFormDocument });
    } catch (error) {
      console.error('Error updating form:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  
  


export {
    submitform,
    getForms,
    deleteField,
    update
}