const productModel = require('./productModel')

const add = async (req, res)=>{
    let validations = ""

    if(!req.body.name){   //nhi hai
        validations += "Name is require "
    }
    if(!req.body.description){
        validations += "Description is required "  //+= : value overright n hogi append hogi
    }
    if(!req.body.price){
        validations += "price is required "  //+= : value overright n hogi append hogi
    }
    if(!req.body.categoryId){
        validations += "categoryId is required "  //+= : value overright n hogi append hogi
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
    req.body.status = true
    productModel.find(req.body)
    .populate('categoryId', 'name description image')
    .exec()
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