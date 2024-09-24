const router = require('express').Router() //connectivity
const userController = require('../api/user/userController')
const categoryController = require('../api/category/categoryController')
const productController = require('../api/product/productController')



router.post('/user/add', userController.add)

// =====================category=========================
router.post('/category/add', categoryController.add)
router.post('/category/all', categoryController.all)
router.post('/category/single', categoryController.single)
router.post('/category/update', categoryController.update)
router.post('/category/delete', categoryController.deleteFun)
// =====================category=========================

router.all("**",(req,res)=>{             //wild card(*)
    res.send({
        success:false,
        status:404,
        message:'INVALID ADDRESS'
    })
})             //method
module.exports = router

