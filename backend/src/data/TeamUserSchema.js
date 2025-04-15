import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const teamUserSchema = new Schema({
  team_id: { type: mongoose.Schema.Types.ObjectId, ref: 'team', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

const TeamUser = mongoose.model('team_user', teamUserSchema);
export default TeamUser;