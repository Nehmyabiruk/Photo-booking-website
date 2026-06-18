import mongoose from 'mongoose';

const PortfolioSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  category:    { type: String, enum: ['weddings', 'events', 'portraits', 'corporate', 'ethiopia'], required: true },
  imageUrl:    { type: String, required: true },
  cloudinaryId:{ type: String, required: true },
  alt:         { type: String },
  featured:    { type: Boolean, default: false },
  tall:        { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', PortfolioSchema);
