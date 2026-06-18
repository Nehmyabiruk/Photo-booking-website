import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  firstName:     { type: String, required: true },
  lastName:      { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String },
  eventType:     { type: String, required: true },
  eventDate:     { type: Date, required: true },
  location:      { type: String },
  package:       { type: String },
  budget:        { type: String },
  message:       { type: String },
  status:        { type: String, enum: ['pending', 'confirmed', 'declined', 'completed'], default: 'pending' },
  depositPaid:   { type: Boolean, default: false },
  depositAmount: { type: Number, default: 0 },
  stripePaymentIntentId: { type: String },
  notes:         { type: String },
  createdAt:     { type: Date, default: Date.now },
  updatedAt:     { type: Date, default: Date.now },
});

BookingSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
