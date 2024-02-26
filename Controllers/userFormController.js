import asynchandler from 'express-async-handler'
import Form from '../models/FormModel.js'




import asyncHandler from 'express-async-handler';

const submitform = asyncHandler(async (req, res) => {
  try {
    const { title, fields } = req.body;
    console.log('Incoming fields:', fields);

    const userId = req.user._id;

    if (!title || !fields || fields.length === 0) {
      return res.status(400).json({ message: 'title and fields are required' });
    }

    // Map fields to create an array of fields with the new structure
    const formattedFields = fields.map(field => {
      const options = field.options.map(option => {
        // If the option is a string, convert it to the expected object format
        if (typeof option === 'string') {
          return {
            value: option,
            isDefault: false,
          };
        }

        // If the option is an object, use the existing logic
        if (!option.value) {
          // Handle the case where 'value' is missing in the request payload
          throw new Error('Option value is required');
        }

        return {
          value: option.value,
          isDefault: option.isDefault || false,
        };
      });

      return {
        label: field.label,
        type: field.type,
        options,
        placeholder: field.placeholder || '',
      };
    });

    // Create a new form using the Form model
    const newForm = new Form({
      userId,
      title,
      fields: formattedFields,
    });

    // Save the new form to the database
    await newForm.save();

    res.status(201).json(newForm);
  } catch (error) {
    console.error(error);

    if (error.message === 'Option value is required') {
      return res.status(400).json({ message: 'Option value is required' });
    }

    res.status(500).json({ message: 'Internal Server Error' });
  }
});





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