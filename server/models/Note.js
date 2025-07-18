import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  text: String,
  content: String,
  title: String,
  color: { type: String, default: 'lightyellow' },
  x: {type:Number, default: 0},
  y: {type:Number, default: 0},
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);
