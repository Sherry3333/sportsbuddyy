import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const sportSchema = new Schema({
  name: { type: String, required: true, unique: true },
  info: { type: String }
});

const Sport = mongoose.model('sport', sportSchema);
export default Sport;