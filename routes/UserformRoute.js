import express from 'express'
import { protect } from '../middleware/AuthMiddleware.js'

import { submitform ,getForms,deleteField,update }  from '../Controllers/userFormController.js'
const router=express.Router()


router.post('/submit',protect,submitform)
router.get('/getForm',protect,getForms)
router.delete('/deleteForm',deleteField)
router.put('/updateForm/:formId', update);

export default router