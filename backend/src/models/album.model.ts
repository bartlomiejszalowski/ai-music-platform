import moongose from "mongoose";

const albumSchema = new moongose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  relaseYear: {
    type: Number,
    required: true,
  },
  songs: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Song",
    },
  ],
});

export const Album = moongose.model("Album", albumSchema);
