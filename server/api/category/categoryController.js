const categoryModel = require('./categoryModel')

const add = async (req, res)=>{
    let validations = ""

    if(!req.body.name){   //nhi hai
        validations += "Name is require "
    }
    if(!req.body.description){
        validations += "Description is required "  //+= : value overright n hogi append hogi
    }

    if(!!validations){    //!!- string value into boolean
        res.send({
            success:false,
            status:420,       //find 420
            messaage:"validations error: "+validations
        })
    } else{
        let total= await categoryModel.countDocuments()
        let category = new categoryModel({
            autoId:total+1,
            name:req.body.name,
            description:req.body.description
        })
        category.save()
        .then((result)=>{
            res.send({
                success:true,
                status:200,
                messaage:"New category created",
                data:result
            })

        })
        .catch((err)=>{
            res.send({
                success:false,
                status:404,
                messaage:err.messaage
            })
        })
    }    
}

const all = (req, res)=>{
    categoryModel.find(req.body).exec()           //exe fucn- promise   //find() fucn gives array of objects
    .then((result)=>{
        res.send({
            success:true,
            status:200,
            messaage:"all document loaded",
            total:result.length,
            data:result
        })
    })
    .catch(()=>{
        res.send({
            success:false,
            status:500,
            messaage:"invalid",
        }) 
    })
}
const single = (req, res)=>{
    let validation = " "
    if(!req.body_id){
        validation += "_id is required"
    }
    if(!validation){
        res.send({
            success:false,
            status:422,
            messaage:"validation error"+validation
        })
    } 
    else{
        categoryModel.findOne({_id:req.body._id}).exec()
        .then((result)=>{
            if(result == null){
                res.send({
                    success:false,
                    status:404,
                    message:"Category Does not exist"
                })
            }
            else{
                res.send({
                    success:true,
                    status:200,
                    message:"Single Document Loaded",
                    data:result
                })
            }
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }
           
}

const update = (req, res)=>{
    let validation = ""
    if(!req.body._id){
        validation +="_id is required"
    }

    if(!!validation){
        res.send({
            success:false,
            status:422,
            message:"Validation Error : "+validation
        })
    } 
    else{
        categoryModel.updateOne({_id:req.body._id},{
            $set:{
                name:req.body.name,
                description:req.body.description
        }
    }).exec()
    .then((result)=>{
        if(result.modifiedCount == 1){
            res.send({
                success:true,
                status:200,
                message:"Document Updated",
                data:result
            })
        }
        else{
            res.send({
                success:false,
                status:404,
                message:"Category Not Found"
            })
        }
    })
    .catch((err)=>{
        res.send({
            success:false,
            status:500,
            message:err.message
        })
    })
  }
}

// dlete
const deleteFun= (req, res)=>{
    let validation = ""
    if(!req.body._id){
        validation += "_id is required"
    }
    if(!!validation){
        res.send({
            success:false,
            status:422,
            message:"Validation Error: "+validation
        })
    }
    else{
        categoryModel.deleteOne({_id:req.body._id}).exec()
        .then((result)=>{
            res.send({
                success:true,
                status:200,
                message:"Document Deleted",
                data:result
            })
        })
        .catch((err)=>{
            res.send({
                success:false,
                status:500,
                message:err.message
            })
        })
    }

}

    


module.exports= { add , all, single, update, deleteFun }