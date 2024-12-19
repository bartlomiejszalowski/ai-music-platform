import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { uploadToCloudinary } from "../helpers/uploadToCloudinary.ts";
import { Album } from "../models/album.model.ts";
import { Song } from "../models/song.model.ts";

export const checkAdmin = (req: Request, res: Response) => {
  res.status(200).json({ admin: true });
};

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files || !req.files.audioFiles || !req.files.imageFiles) {
      res.status(400).json({ message: "Please upload all files" });
      return;
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFiles = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile as UploadedFile);
    const imageUrl = await uploadToCloudinary(imageFiles as UploadedFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    //if song belong to an album, update the album's songs array
    if (albumId) {
      Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong", error);
    next(error);
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await Song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully" });

    //if song belong to an album, update the album's songs array
  } catch (error) {
    console.log("Error in deleteSong", error);
    next(error);
  }
};

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, artist, relaseYear } = req.body;

    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile as UploadedFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      relaseYear,
    });

    await album.save();

    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum", error);
    next(error);
  }
};

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);

    if (album) {
      await Song.deleteMany({ albumId: id });
      await Album.findByIdAndDelete(id);
      res.status(200).json({ message: "Album deleted successfully" });
    }
  } catch (error) {
    console.log("Error in deleteAlbum", error);
    next(error);
  }
};
