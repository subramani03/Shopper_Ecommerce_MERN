const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const ProductModel = require("./models/ProductModel");
const UserModel = require("./models/UserModel");

app.use(express.json()); //==> to readbody content from request
app.use(cors());
const port = 3000;

mongoose.connect(
  "mongodb+srv://subramanimurugan420:Ps0zpelZ5YeSyEkP@shopper.y7q2s.mongodb.net/Shopper-Ecommerce"
);

//! products routes
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
app.delete("/removeproducts", async (req, res) => {
  try {
    let removedProduct = await ProductModel.findOneAndDelete({
      id: req.body.id,
    });
    console.log("deleted");
    res.json({
      success: true,
      message: `${removedProduct.name} is removed `,
    });
  } catch (err) {
    res.send("Error :" + err);
  }
});

//get all the products
app.get("/allproducts", async (req, res) => {
  try {
    let allproducts = await ProductModel.find({});
    console.log("all products fetched");
    res.json({
      success: true,
      products: allproducts,
    });
  } catch (err) {
    res.send("Error :" + err);
  }
});

//get newly added the products
app.get("/newproducts", async (req, res) => {
  try {
    let allproducts = await ProductModel.find({});
    let newly_added_products = allproducts.slice(1).slice(-8);
    res.json({
      success: true,
      products: newly_added_products,
    });
  } catch (err) {
    res.send("Error :" + err);
  }
});

//get popular products among women
app.get("/popularproducts", async (req, res) => {
  try {
    let allproducts = await ProductModel.find({ category: "women" });
    let popular_products = allproducts.slice(0, 4);
    res.json({
      success: true,
      products: popular_products,
    });
  } catch (err) {
    res.send("Error :" + err);
  }
});

//! Images Routes
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

//! user routes
//signup api
app.post("/signup", async (req, res) => {
  try {
    let isUserExist = await UserModel.findOne({ email: req.body.email });
    if (isUserExist) {
      res.status(400).res.json({
        success: false,
        message: "user already exit with the same email id",
      });
    } else {
      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }

      let { username, email, password } = req.body;
      console.log(req.body);
      let user = new UserModel({
        username: username,
        email: email,
        password: password,
        cartdata: cart,
      });
      await user.save();

      const token = jwt.sign(user.id, "MANI@0301");

      res.json({
        success: true,
        token: token,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error :" + error,
    });
  }
});

//Login api
app.post("/login", async (req, res) => {
  try {
    let isUserExist = await UserModel.findOne({ email: req.body.email });
    if (isUserExist) {
      if (isUserExist.password === req.body.password) {
        const token = jwt.sign(isUserExist.id, "MANI@0301");
        res.json({
          success: true,
          token: token,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "invalid credentials",
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error :" + error,
    });
  }
});

//! user-auth middleswares

let fetchuser = async (req, res, next) => {
  try{
    const token = req.header("auth-token");
  if (!token) {
    res.status(400).json({
      success: false,
      message: "please login ,and try again",
    });
  } else {
    try {
      const userId = jwt.verify(token, "MANI@0301");
      req.userId = userId;
      next();
    } catch (err) {
      throw new Error(err);
    }
  }

  }catch (err) {
    res.status(400).json({
      success: false,
      message: "error :" + err,
    });
  }
  
};

//! cart routes
// add to carts
app.post("/addtocarts", fetchuser, async (req, res) => {
  try {
    console.log(req.userId);
    console.log(req.body);
    let user = await UserModel.findById(req.userId);
    user.cartdata[req.body.itemId] += 1;
    let updatedUserData = await UserModel.findByIdAndUpdate(
      req.userId,
      { cartdata: user.cartdata },
      { new: true }
    );
    console.log(updatedUserData);
    res.json({
      success: true,
      message: "Added to cart",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error :" + err,
    });
  }
});

// removed from carts
app.post("/removefromcarts", fetchuser, async (req, res) => {
  try {
    console.log(req.userId);
    console.log(req.body);
    let user = await UserModel.findById(req.userId);
    if (user.cartdata[req.body.itemId] > 0) {
      user.cartdata[req.body.itemId] -= 1;
      let updatedUserData = await UserModel.findByIdAndUpdate(
        req.userId,
        { cartdata: user.cartdata },
        { new: true }
      );
      console.log(updatedUserData);
      res.json({
        success: true,
        message: "removed from cart",
      });
    } else {
      res.json({
        success: false,
        message: "nothing to remove from cart",
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error :" + err,
    });
  }
});

//get cart data
app.get("/getcart", fetchuser, async (req, res) => {
  try {
    console.log(req.userId);
    let user = await UserModel.findById(req.userId);
    user.cartdata;
    res.json({
      success: true,
      cartdata: user.cartdata,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "error :" + err,
    });
  }
});

app.listen(port, (err) => {
  if (!err) {
    console.log("Server Running on port " + port);
  } else {
    console.log("Error :" + err);
  }
});
