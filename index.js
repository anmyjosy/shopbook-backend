const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const ShopModel = require('./models/Shop');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ["https://shopbank.netlify.app/"],
  credentials: true
}));
mongoose.connect("mongodb+srv://anmyjosy:Anmy2003!@cluster0.1ksxdqo.mongodb.net/employee");

app.post("/new", async (req, res) => {
  const { name, amount } = req.body;
  const user = await ShopModel.findOne({ name });
  if (user) {
    return res.json({ message: "user already existed" });
  }
    const newUser = new ShopModel({
      name,
      amount: amount || [] // default to an empty array if amount is not provided
    });

  await newUser.save();
  return res.json({ status: true, message: "record registed" });
});

app.get("/shop-names", async (req, res) => {
  try {
    const shops = await ShopModel.find({}, 'name'); // Only select the 'name' field
    const shopNames = shops.map(shop => shop.name);
    res.status(200).json(shopNames);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});
app.post("/add-amount", async (req, res) => {
  try {
    const { name, amount } = req.body;
    const shop = await ShopModel.findOne({ name });

    if (shop) {
      shop.amount.push(amount);
      shop.date.push(new Date());
      shop.totalAmount = shop.amount.reduce((sum, current) => sum + current, 0); // Update totalAmount
      await shop.save();
      res.status(200).json({ message: 'Amount added successfully', totalAmount: shop.totalAmount });
    } else {
      res.status(404).json({ status: false, message: "Shop not found" });
    }
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
});

app.get('/get-amounts/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const shop = await ShopModel.findOne({ name });
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.json({ amounts: shop.amount,dates:shop.date,totamount:shop.totalAmount });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching amounts' });
  }
});


app.listen(3001, () => {
  console.log("server is running");
});
