const express = require('express');
const mongoose = require('mongoose');
const app= express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors(
    {
        origin:["https://sachin-suthar-portfolio.vercel.app"],
        methods:["POST","GET"],
        credentials:true
    }
));

mongoose.connect('mongodb+srv://mistrysachin185:Mongo%40123@cluster0.bwkyxxx.mongodb.net/Portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>{console.log("Connected to database")})
.catch((error) => handleError(error));

// Or:

let dataSchema = mongoose.Schema(
    {
    name:{
        type:String,
        require: true
    },
    email:{
        type:String,
        require:true
    },
    message:{
        type:String,
        require:true
    }
}   
)

let PortfolioData = mongoose.model("portfoliodata",dataSchema);

//Home API
app.post("/",async (req,res)=>{  
    try{
        let {name,email,message} = req.body;
        const data = {
            name:name,
            email:email,
            message:message
        }
        await PortfolioData.insertMany([data]);
        res.status(201).json({ message: "Data saved successfully" });
      }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
        
});

app.get("/admin",async (req,res)=>{  
    try {
        const results = await PortfolioData.find({});
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching results' });
      }
        
});



app.get("/",(req,res)=>{
    res.send("HELLO ");
})


app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})