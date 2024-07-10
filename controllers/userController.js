const userModel = require('../models/userModel.js');

exports.getUserById = async (req, res) => {
    try{
      const user = await userModel.findById({_id:req.params.id});
      if (!user)
      return res.status(404).send("user with given ID not found");
      res.send(user);
    }
    catch(err){
      return res.status(404).send("user with given ID not found");
    }
    
}
exports.getAllUsers = async (req, res) => {
    try{
      const users = await userModel.find({});
      if (users==[])
      return res.status(404).send("No users available");
      res.send(users);
    }
    catch(err){
      return res.status(404).send("error in fetching users");
    }
      
  }
exports.createUser = async (req, res) => {
    try{
      const body = req.body;
      if(!body.user_name || !body.email || !body.password)
        return res.status(404).send("Please enter all the details");
      const user = userModel.create({
          user_name: body.user_name,
            email: body.email,
            password: body.password,
      });
      console.log('user created successfully');
      return res.status(201).json({message:'user created successfully'});
    }
    catch(err){ 
      return res.status(404).send("Some error occured while creating user");
    }    
}

 exports.updateUserById = async (req, res) => {
    try{
      const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if (!user)
        return res.status(404).send("user with given ID not found");
      res.send(user);
    }
    catch(err){
      return res.status(404).send("user with given ID not found");
    }
      
}

exports.deleteUserById =  async (req, res) => {
    try{
      const user = await userModel.deleteOne({_id:req.params.id});
      if (!user)
          return res.status(404).send("user with given ID not found");
      res.send(user);
    }
    catch(err){
      return res.status(404).send("user with given ID not found");
    } 
}