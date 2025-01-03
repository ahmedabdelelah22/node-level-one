const express = require ('express')
const app = express()                   //basic
const port = 4000             

const mongoose = require('mongoose');   //  import mongooes
app.use(express.urlencoded({ extended: true }));      //  import mongooes


const User = require('./model/customerSchema.js');  //import  data
const Stock = require('./model/stockSchema.js');  //import  data
const Detail = require('./model/detailSchema.js');  //import  data


app.set('view engine', 'ejs');       //import ejs
app.use(express.static('public'));  //import public folder
var moment = require("moment");      // shape of date 
var methodOverride = require('method-override') //   delete data
app.use(methodOverride('_method'))         //   delete data

//auto refresh==========================================
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//========================get data==============================


app.get('/', (req, res) => {
  // result => array of objects
 User.find().then((result) => {
  res.render("index",{arr:result,moment:moment});
      console.log(result);
  }).catch((err)=>{console.log(err)});
 
})

app.get('/user/stock.html', (req, res) => {
  // result => array of objects
 Stock.find().then((result) => {
  res.render("user/stock",{arrStock:result,moment:moment});
      console.log(result);
  }).catch((err)=>{console.log(err)});
 
})
app.get('/user/detail.html', (req, res) => {
  // result => array of objects
  Detail.find().then((result) => {
  res.render("user/detail",{arrDetail:result,moment:moment});
      console.log(result);
  }).catch((err)=>{console.log(err)});
 
})




app.get('/user/add.html', (req, res) => {
  // result => array of objects
  res.render("user/add");
})

app.get('/user/addStock.html', (req, res) => {
  // result => array of objects
  res.render("user/addStock");
})
app.get('/user/addDetail.html', (req, res) => {
  // result => array of objects
  res.render("user/addDetail");
})

app.get('/edit/:id', (req, res) => {
  
  User.findById(req.params.id).then((result) => {
    res.render("user/edit",{obj:result,moment:moment});
    }).catch((err)=>{console.log(err)});
})

app.get('/view/:id', (req, res) => {
  // result => object
 User.findById(req.params.id).then((result) => {
  res.render("user/view",{obj:result,moment:moment});
  }).catch((err)=>{console.log(err)});
 
})
app.get('/viewDetail/:id', (req, res) => {
  // result => object
 Detail.findById(req.params.id).then((result) => {
  res.render("user/viewDetail",{obj:result,moment:moment});
  }).catch((err)=>{console.log(err)});
 
})


//==================connect to mongoose===================================


// mongoose.connect("mongodb+srv://ahmedabdelelah909493:5y30OLjc8au9gY24@cluster0.9sj5tt4.mongodb.net/all-data?retryWrites=true&w=majority")
// .then(()=>{
//     app.listen(port, () => {
//         console.log(`http://localhost:${port}/`);
//       });
// }).catch((err)=>{console.log(err)});
mongoose.connect("mongodb://localhost:27017/yarn")
.then(()=>{
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
      });
}).catch((err)=>{console.log(err)});

//========================POST_DATA==============================
//المسار لازم يكون نفس المسار اللي في الاكشن اللي في الفورم 
app.post('/user/add.html', (req, res) => {

User.create(req.body).then(() => {
  res.redirect('/')

}).catch((err)=>{console.log(err)});

});



app.post("/search", (req, res) => {
  console.log("*******************************");
 
  const searchText = req.body.searchText.trim();

  User.find({ $or: [  {lastName: searchText},{ phoneNumber: searchText } ,{firstName: searchText}, ] })
    .then((result) => {
      console.log(result);
      res.render("user/search", { arr: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/searchStock", (req, res) => {
  console.log("*******************************");
 
  const searchText = req.body.searchText.trim();

  Stock.find({ $or: [  {name: searchText},{ code: searchText } , ] })
    .then((result) => {
      console.log(result);
      res.render("user/searchStock", { arrStock: result, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
});


app.delete("/edit/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id }).then((result) => {
  res.redirect("/");
  });
}); 
app.delete("/editStock/:id", (req, res) => {
  const stockId = req.params.id;
  // Perform deletion logic using Stock model (assuming Mongoose)
  Stock.findByIdAndDelete(stockId).then((result) => {
  res.redirect("/user/stock.html");
  });
}); 
app.delete("/editDetail/:id", (req, res) => {
  const detailId = req.params.id;
  // Perform deletion logic using Stock model (assuming Mongoose)
  Detail.findByIdAndDelete(detailId).then((result) => {
  res.redirect("/user/detail.html");
  });
}); 
app.put("/edit/:id", (req, res) => {    
  console.log("Request body:", req.body);
  User.updateOne({ _id: req.params.id },req.body,) //id,opject will update
  .then((result) => {
  res.redirect("/");
  });
});



app.post('/user/addStock.html', (req, res) => {

  Stock.create(req.body).then(() => {
  
    res.redirect('/user/stock.html')
  
  }).catch((err)=>{

    if (err.code === 11000) {
      // Duplicate key error (code 11000) handling
     res.status(400).send('Code already exists. Please use a different code.');
    } else {
      // Handle other errors
      console.error('Error:', err);
      res.status(500).send('An error occurred while adding stock.');
    }
    console.log(err)});
  
  });

  app.post('/user/addDetail.html', (req, res) => {

    Detail.create(req.body).then(() => {
      res.redirect('/')
    
    }).catch((err)=>{
    
      console.log(err)});
    
    });

