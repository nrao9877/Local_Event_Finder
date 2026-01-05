// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  imageUrl: {type: String, required: true},
  admin: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
