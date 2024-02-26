import mongoose from 'mongoose';

const { Schema } = mongoose;

const optionSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
});

const fieldSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['text', 'dropdown', 'radio', 'multichoice'],
    required: true,
  },
  options: [optionSchema],
  placeholder: {
    type: String,
    default: '',
  },
});

const formSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fields: [fieldSchema],
});

const Form = mongoose.model('Form', formSchema);

export default Form;
