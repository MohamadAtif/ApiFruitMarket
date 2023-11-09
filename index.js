const express=require ('express');
const app=express();
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const cors=require('cors');
const fruitsrouter=require('./router/fruits-router');
const errHandler=require('./errHandler');
 
app.use(express.json());
app.use('/uploads/images',express.static(__dirname+'/uploads/images'))
app.use([bodyparser.urlencoded({extended:true}),cors(),]);
app.options('*',cors());
app.use(errHandler);

mongoose.connect('mongodb+srv://mohamad:mohamad@cluster0.razkqoh.mongodb.net/').then(()=>{
    console.log('connected On DataBase succefully')
}).catch((error)=>{ console.log('error on connecting',error)});


app.use('/fruits',fruitsrouter);

const port=3000 || process.env.PORT;
app.listen(port,()=>{
console.log('Connected on the server');
})
module.exports=app;