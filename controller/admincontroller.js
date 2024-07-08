const collection = require("../models/mongodb")
// const bcrypt = require('bcrypt');



// const dashboard=  async (req, res) => {
//     try {
//         console.log('i am the login post');
//       const users = await collection.find();
//     //   console.log(users);
//       res.render('admin/dashboard', { users });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   }

const dashboard = async (req, res) => {
  if(req.session.admin){
    //here
    try {
      const searchQuery = req.query.search || ''; // Get the search query from the URL or set it to an empty string if not provided
  
      // Use a regular expression to perform a case-insensitive search
      const users = await collection.find({
        name: { $regex: searchQuery, $options: 'i' },
      });
  
      res.render('admin/dashboard', { users, searchQuery });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
    //here
  }
  else{
    res.redirect('/login')
  }
  
};






const login=(req,res)=>{
  if(req.session.admin){
    res.redirect('/admin/dashboard')
  }
    res.render('admin/login',{msg:''})
  
  }
   


const loginpost = (req,res)=>{
    
    const name = 'admin'
    const password = 1234

    if(name === req.body.username && password ==req.body.password){
 
        //adding session 
        req.session.admin = name;

        const msg1=req.body.name;
        res.redirect('/admin/dashboard')
    }else {
        console.log('here');
        res.render('admin/login',{msg:'invalid username or password :('})
    }
}


const displaycreate=(req,res)=>{
    res.render('admin/create',{msg:""})
}

 
const createpost = async (req,res)=>{
    console.log("i am creating data");
     const data={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
        // password: await bcrypt.hash(req.body.password, 10),

    }

    await collection.create(data);
res.redirect("/admin/dashboard")

 }

 const deleteid = async (req, res) => {
    console.log("hello i am here");
    try {
      const userId = req.params.id;
  
      await collection.findByIdAndDelete(userId);
  
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


const edit = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Fetch the user's details by ID
      const user = await collection.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.render('admin/edit', { user });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
const update = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Fetch the user's details by ID
      const user = await collection.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Update the user's details based on the form data
      user.name = req.body.name;
      user.email = req.body.email;
      // Add more fields to update if necessary
  
      // Save the updated user data
      await user.save();
  
      res.redirect('/admin/dashboard');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  

  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect('/admin/login');
    });
  };
  
  




module.exports={

     dashboard,
     login,
     loginpost,
     createpost,
     displaycreate,
     deleteid,
     edit,
     update,
     logout
    
}