const express=require('express');
const router=express.Router();
const{getFruits , getOneFruit, deleteFruit, updateFruit,
    FruitsCount, FruitsFeatured}=require('../logic/fruits_logic');
const FRUITS=require ('../models/fruit_model');
const mongoose=require('mongoose');
const multer=require('multer');

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg',
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid=FILE_TYPE_MAP[file.mimetype];
        let uploadError= new Error('invalid image type');
        if (isValid){
            uploadError=null
        }  
      cb(uploadError, 'uploads/images')
    },
    filename: function (req, file, cb) {
      const fileName=file.originalname.split(' ').join('-');
      const extension=FILE_TYPE_MAP[file.mimetype]
      cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
  })
  
  const uploadOptions = multer({ storage: storage })

  //simple upload file
router.post('/', uploadOptions.single('image') , async (req, res)=>{
    const file= req.file;
    if(!file)
   return res.status(400).send('No Image in the Request');
     const fileName=req.file.filename;
     const basBase=`${req.protocol}://${req.get('host')}/uploads/images/`
     const fruits=  new FRUITS({
         title:req.body.title,
         description:req.body.description, 
        //  image:fileName,
         image:`${basBase}${fileName}` ,
         price:req.body.price,
         countinStock:req.body.countinStock,
         isFeatured:req.body.isFeatured,
     })
  let fruit= fruits.save();
     if(!fruit)
     {
         return res.status(500).send('The Fruit cannot be created');
     }
     res.status(200).json({
        success:true,
        "fruits":fruits});
 }, );
router.get('/',getFruits);
router.get('/:id',getOneFruit);
router.get('/get/count',FruitsCount);
router.get('/get/featured',FruitsFeatured);
router.delete('/:id',deleteFruit);
router.put('/:id',updateFruit);

module.exports = router;
