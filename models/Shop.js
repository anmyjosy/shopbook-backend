const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: [Number], default: [] },
  totalAmount: { type: Number, default: 0 },
  date: { type: [Date], default: [] }
});

// Pre-save hook to update totalAmount whenever amounts are modified
ShopSchema.pre('save', function(next) {
  this.totalAmount = this.amount.reduce((sum, current) => sum + current, 0);
  next();
});

const ShopModel = mongoose.model('shops', ShopSchema);
module.exports = ShopModel;
