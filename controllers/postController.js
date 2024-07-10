const postModel = require('../models/postModel.js');

exports.getpostById = async (req, res) => {
    try{
      const post = await postModel.findById({_id:req.params.id});
      if (!post)
      return res.status(404).send("post with given ID not found");
      res.send(post);
    }
    catch(err){
      return res.status(404).send("post with given ID not found");
    }
    
}
exports.getAllposts = async (req, res) => {
    try{
      const posts = await postModel.find({});
      if (posts==[])
      return res.status(404).send("No posts available");
      res.send(posts);
    }
    catch(err){
      return res.status(404).send("error in fetching posts");
    }
      
  }
exports.createpost = async (req, res) => {
    try{
      const body = req.body;
      if(!body.title || !body.content || !body.author)
        return res.status(404).send("Please enter all the details");
      const post = postModel.create({
          title: body.title,
          content: body.content,
          athor: body.author,
          tags: body.tags,
          image: body.image,
      });
      console.log('post created successfully');
      return res.status(201).json({message:'post created successfully'});
    }
    catch(err){ 
      return res.status(404).send("Some error occured while creating post");
    }    
}

 exports.updatepostById = async (req, res) => {
    try{
      const post = await postModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
      if (!post)
        return res.status(404).send("post with given ID not found");
      res.send(post);
    }
    catch(err){
      return res.status(404).send("post with given ID not found");
    }
      
}

exports.deletepostById =  async (req, res) => {
    try{
      const post = await postModel.deleteOne({_id:req.params.id});
      if (!post)
          return res.status(404).send("post with given ID not found");
      res.send(post);
    }
    catch(err){
      return res.status(404).send("post with given ID not found");
    } 
}