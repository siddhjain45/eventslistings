const express = require('express')
const route  = express.Router();
const userModel = require('/event listg/public/module/userModule')
const eventModel = require('/event listg/public/module/eventModule')
const jwt = require('jsonwebtoken')

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }

  function checkLogin(req,res,next)
  {
      var token = localStorage.getItem('login')
      try
      {
          if(req.session.uname)
       jwt.verify(token,'loginToken')

       else
         res.redirect('/')
      }catch(e)
      {
          res.redirect('/')
      }
      next();
  }
route.get('/signuppage',(req,res)=>{
    res.render('signup')
})

route.get('/loginpage',checkLogin,(req,res)=>{
    res.render('login',{suc:0})
})

route.post('/signup',(req,res)=>{
    var newUser = new userModel({
        name:req.body.name,
        mobile : req.body.mno,
        email:req.body.email,
        gender:req.body.gender,
        uname:req.body.uname,
        pass:req.body.pass,
    
    });
    newUser.save((err)=>{
        if(err) throw err;
        
        res.render('signup')
    })
    
    
});

route.post('/login',(req,res)=>{
    var uname = req.body.uname;
    var pass = req.body.pass;

    userModel.findOne({uname:uname},(err,data)=>{
        if(data==null)
        {
           res.render('login',{suc:1})
        }
         else{
             if(err) throw err

             if(data.pass==pass)
             {
                 var token = jwt.sign({uname:data.uname},'loginToken')
                 localStorage.setItem('login',token)
                 req.session.uname = data.uname;
                 console.log(token)
                eventModel.find({},(err2,data)=>{
                    if(err2) throw err2;
             
                    res.render('events',{events:data,suc:0})
             
                    })
                    
             }
             else
             res.render('login',{suc:1})
         }   
    })
})

route.post('/addevent',checkLogin,(req,res)=>{
  var event = new eventModel({
      name:req.body.name,
      about:req.body.about,
      organiser:req.body.organiser,
      mode:req.body.mode,
      start:req.body.start,
      end:req.body.end,
      link:req.body.link,
  })

  event.save((err)=>{
      if(err) throw err;
       eventModel.find({},(err2,data)=>{
       if(err2) throw err;

       res.render('events',{suc:1,events:data})

       })
       
  })


})
route.get('/logout' ,checkLogin, (req,res)=>{
    res.redirect('/')
    localStorage.removeItem('login')
    req.session.destroy(function(err) {
        // cannot access session here
        if (err) throw err;
        console.log('session destroy')
      })
})
module.exports = route;