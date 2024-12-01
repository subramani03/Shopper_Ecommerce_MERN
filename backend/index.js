const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const ProductModel = require("./models/ProductModel");

//password mongodb-shopper --> Ps0zpelZ5YeSyEkP
app.use(express.json()); //==> to readbody content from request
app.use(cors());
const port = 3000;

mongoose.connect(
  "mongodb+srv://subramanimurugan420:Ps0zpelZ5YeSyEkP@shopper.y7q2s.mongodb.net/Shopper-Ecommerce"
);

//add products to the database
app.post("/addproduct", async (req, res) => {
  try {
    let products = await ProductModel.find({});
    let newly_entered_product_id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product_id = last_product_array[0].id;
      newly_entered_product_id = last_product_id + 1;
    } else {
      newly_entered_product_id = 1;
    }
    const { name, image, category, new_price, old_price, available } = req.body;
    const product = new ProductModel({
      id: newly_entered_product_id,
      name,
      image,
      category,
      new_price,
      old_price,
      available,
    });
    await product.save();
    res.json({
      success: true,
      message: `${req.body.name} product inserted successfully`,
    });
  } catch (err) {
    res.send("ERROR: " + err);
  }
});

//delete products from the daabase
app.delete("/removeproducts",async (req,res)=>{
  try {
    let removedProduct=await ProductModel.findOneAndDelete({id:req.body.id});
    console.log("deleted");
    res.json({
      success:true,
      message:`${removedProduct.name} is removed `,
    })
  } catch (err) {
    res.send("Error :"+err) 
  }
})


//get all the products
app.get("/allproducts",async (req,res)=>{
  try {
    let allproducts=await ProductModel.find({});
    console.log("all products fetched");
    res.json({
      success:true,
      products:allproducts,
    })
  } catch (err) {
    res.send("Error :"+err) 
  }
})
//Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});
//'product' --> fieldname

app.use("/images", express.static("upload/images"));
// creating upload Endpoint for images

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.listen(port, (err) => {
  if (!err) {
    console.log("Server Running on port " + port);
  } else {
    console.log("Error :" + err);
  }
});
