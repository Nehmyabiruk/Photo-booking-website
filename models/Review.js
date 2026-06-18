import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  category:  { type: String, enum: ['wedding', 'events', 'corporate', 'portrait', 'other'], default: 'other' },
  quote:     { type: String, required: true },
  eventDate: { type: String },
  approved:  { type: Boolean, default: false },
  featured:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
