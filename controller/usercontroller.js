const collection = require("../models/mongodb")
const axios = require('axios');
// const bcrypt = require('bcrypt');

const base_url = 'https://yesyesloyalty.agatebc.in/api';

const login=(req,res)=>{
     if(req.session.user){
        res.redirect('/home')
     }else{
        res.render('user/login',{msg:''})
     }
}

 



const loginpost = async (req, res) => {
    try {
        const response = await axios.post(`${base_url}/user/login`, {
            email: req.body.email,
            password: req.body.password
        });

        if (response.data.status === 1) { 
            // Successful login

            console.error('Successful login Jk'); 

            // 1. Store user details
            const userData = response.data.data; 
            req.session.user = userData; 

            // 2. Store access token
            const authToken = response.data.misc.access_token;
            req.session.authToken = authToken; // Or use another storage mechanism if needed

            res.render("user/home", { 
                msg1: response.data.message, // Display the success message
                user: userData              // Pass user data to the template 
            });

        } else {
            // Login failed
            const errorMessage = response.data.message; 
            res.render('user/login', { 
                msg: errorMessage, 
                // You might want to display specific error details from response.data.data
            });
        }

    } catch (error) {
        console.error('Login Error:', error); 
        res.render('user/login', { msg: 'An error occurred during login.' });
    }
};



const signout=(req,res)=>{
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
}

const signup=(req,res)=>{
    res.render('user/signup',{msg:''})
}

 


// const signuppost =async (req,res)=>{
//      const data={
//         name:req.body.name,
//         email:req.body.email,
//         password:req.body.password  
//     }
//     await collection.create(data);
//  res.render('user/login',{msg:''})
// }

 
const signuppost = async (req, res) => {
    try {
        const response = await axios.post(`${base_url}/user/register`, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            password_confirm: req.body.password
        });

        if (response.data.status === 1) {
            
            console.error('Successful register Jk');
           
            const userData = response.data.data;
            req.session.user = userData;
           
            const authToken = response.data.misc.access_token;
            req.session.authToken = authToken;  
            res.render("user/home", {
                msg1: response.data.message, 
                user: userData             
            });
        } else {
            
            const errorMessage = response.data.message;
            res.render('user/signup', {
                msg: errorMessage,
               
            });
        }
    } catch (error) {
        console.error('Signup Error:', error);
        res.render('user/signup', { msg: 'An error occurred during signup.' });
    }
};


const home=(req,res)=>{
    if(req.session.user){
        res.render("user/home",{msg1:''})
    }
    else{
        res.redirect("/login")
    }
    
}


module.exports={
    login,
    loginpost,
    signout,
    signuppost,
    signup,
    home 
}