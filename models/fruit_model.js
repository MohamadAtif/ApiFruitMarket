const mongoose=require('mongoose');

  const Fruits = 
        mongoose.Schema({
              // id:String,
              title:{
              type :String, 
              required:true
            },
              description:{
                type :String, 
                required:true
              },
              image:{
                type :String, 
                default:''
              },
              price:{
                type :Number, 
                default:0
              },
              countinStock:{
                type :Number, 
                required:true,
                min:0,
                max:100
              },        
              isFeatured:{
                type:Boolean,
                 default:false
              },
              dateCreated:{
                type:Date,
                default:Date.now,
              },
            });
            Fruits.virtual('id').get(function(){
              return this._id.toHexString();
          });

          Fruits.set('toJSON', {
              virtuals: true
          });

module.exports=mongoose.model('FRUITS',Fruits);
