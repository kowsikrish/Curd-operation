var Userdb = require("../model/model");
const multer = require('multer');
// define storage for the image
// const storage = multer.diskStorage({
//     destination:function(req, file, callback){
//         callback(null,'./assets/img');
//     },

//     //add back the extension
//     filename:function(req, file, callback){
//         callback(null, Date.now() + file.originalname)

//     },
// }) 

//upload parameter for multer
// const upload = multer({
//    storage: storage,
//    limits:{
//        fieldSize:1024 * 1024 * 3
//    }
   
// });

// create and save new user
// exports.create = upload.single('image'), (req,res) => {
    exports.create = (req,res) => {


    //validate request

if(!req.body){
    res.status(400).send({message:"Content can not be empty"});
    return;
}
//new user
const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    phone:req.body.phone
    // img: req.file.filename
});

// save user indb
user
.save(user)
.then(data=> {
    // res.send(data)
    res.redirect('/add-user')
})
.catch(err=>{
    res.status(500).send({
        message:err.message || "some error occurred while creating a create operation"
    })
})
}

//retrive and return all users/ retrive and return a single user

exports.find = (req,res) => {
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message: "Not found user with id" + id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: "Error retrivingg user with id" + id})
        })

    }else{

        Userdb.find()
        .then(user=> {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occurred while retriving user information"
            })
    
        })
    }

}

//update a new idetified user by user id
exports.update = (req, res) => {

    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update cannot be empty"})
    }

    const id=req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: "Cannot update user with"+id+".May be user not found"})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message: "Error update user information"})
    })
}

// Delete a user with specified user id in that request
exports.delete = (req, res) => {
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data => {
        if(!data){
            res.status(404).send({message: "Cannot delete with id"+id+".May be id is wrong"})
        }else{
            res.send({
                message: "User was deleted successfully"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Cannot delete with id"+id+".May be id is wrong"

        })
    })

}