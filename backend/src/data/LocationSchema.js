import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  sports_id: { type: mongoose.Schema.Types.ObjectId, ref: 'sport', required: true }
});

const Location = mongoose.model('location', locationSchema);
export default Location;