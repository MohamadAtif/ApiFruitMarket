const FRUITS=require ('../models/fruit_model');
const mongoose=require('mongoose');

module.exports={
   
    getFruits : async (req,res) =>{
        const fruits= await FRUITS.find()//.populate('category');
        if(!fruits){ res.status(500).json({success:false});}
        res.json({
            fruits: fruits
        })
    },
    getOneFruit: async (req,res) =>{
        const fruit= await FRUITS.findById(req.params.id)//.populate('category');
        if(!fruit){ res.status(500).json({success:false});}
        res.send(fruit);
    },

    deleteFruit: async (req,res)=>{
       try {
         await FRUITS.findByIdAndDelete(req.params.id).then((result) => {
                if(result){
                  return  res.status(200).json({success:true,message:'the Fruit was deleted'});
                }else{return res.status(404).json({success:false,error:'Fruit Not Found'});}
                
              }).catch((err) => {
                return res.status(400).json({success:false,error:`Check this Erorr ${err} `});
                
            });
       } catch (error) {
        console.log(`error on delete item is ${error}`);
        
       }
       },
       updateFruit: async(req,res)=>{
        if(!mongoose.isValidObjectId(req.params.category)){
            return res.status(400).send('invalid Product Id');
        }

    
           const fruit= FRUITS.findByIdAndUpdate(
               req.params.id,
               {
                title:req.body.title,
                description:req.body.description,
                image:req.body.image,
                price:req.body.price,
                countinStock:req.body.countinStock,                
                isFeatured:req.body.isFeatured,
               }
               ).then((result) => {
                   if(result){
                     return  res.status(200).send(result);
                   }else{return res.status(404).json({success:false,error:'Fruit Not Found'});}
                 }).catch((err) => {
                   return res.status(500).json({success:false,error:`Check this Erorr ${err} `}); 
               });
       },

       FruitsCount : async (req,res) =>{
        const fruitsCount= await FRUITS.countDocuments().then((result) => {
            res.send({
                FruitCount:result
            });
        }).catch((err) => {
            return res.status(400).json({
                success:false,
                error:err});
        }); 
    },
        FruitsFeatured : async (req,res) =>{
        const fruits= await FRUITS.find({isFeatured:true}).then((result) => {
            res.send({
                fruits:result
            });
        }).catch((err) => {
            return res.status(400).json({
                success:false,
                error:err});
        }); 
    },
     // // uploadOptions.single('image')
    // insertFruits :  async (req, res)=>{
    //    const file= req.file;
    //    if(!file)
    //   return res.status(400).send('No Image in the Request');
    //     const fileName=req.file.filename;
    //     const basBase=`${req.protocol}://${rq.get('host')}/uploads/images/`
    //     const fruits=  new FRUITS({
    //         title:req.body.title,
    //         description:req.body.description, 
    //         image:fileName,
    //      image:`${basBase}${fileName}` ,
    //         price:req.body.price,
    //         countinStock:req.body.countinStock,
    //         isFeatured:req.body.isFeatured,
    //     })
    //  let fruit= fruits.save();
    //     if(!fruit)
    //     {
    //         return res.status(500).send('The Fruit cannot be created');
    //     }
    //     res.send(fruit);
    // },
}


// .save().then((result) => {
//     res.status(201).json({result});
    
// }).catch((err) => {
//     res.status(500).json({
//         error:err,
//         success:false,
//     });
    
// });





//upload file 
// const FILE_TYPE_MAP={
//     'image/png':'png',
//     'image/jpg':'jpg',
//     'image/jpeg':'jpeg',

// }
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // const isValid=FILE_TYPE_MAP[file.mimetype];
//         // let uploadError= new Error('invalid image type');
//         // if (isValid){
//         //     uploadError=null
//         // }
    
//       cb(uploadError, '/uploads/images')
//     },
//     filename: function (req, file, cb) {
//     //   const fileName=file.originalname.spilit(' ').join('-');
//     //   const extension=FILE_TYPE_MAP[file.mimetype]
//       cb(null, file.fieldname + '-' + Date.now()  +'.png')
//     }
//   })
  
//   const uploadOptions = multer({ storage: storage })


//simple upload file

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {

//       cb(uploadError, 'uploads/images')
//     },
//     filename: function (req, file, cb) {

//       cb(null, file.fieldname + '-' + Date.now()  + '.png')
//     }
//   })
  
//   const uploadOptions = multer({ storage: storage }).single('image')