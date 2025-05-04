import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: { type: String, required: true },
  loc_id: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
  start_time: { type: String, required: true }, //eg: "Every Saturday 9AM"
  end_time: { type: String, required: true },
  level: { type: String, required: true }, 
  image: { type: String }, 
  team_desc: { type: String },
  total_num: { type: Number, default: 0 }
});

const Team = mongoose.model('team', teamSchema);
export default Team;