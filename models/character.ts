import mongoose, { Schema } from "mongoose";

const characterSchema = new Schema({
  serverId: String,
  characterId: String,
  characterName: String,
  jobGrowName: String,
  fame: Number,
  avatars: Object,
  avatarsImgSrc: String,
});

const Character = mongoose.models.Character || mongoose.model("Character", characterSchema);

export default Character;
