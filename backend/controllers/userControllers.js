import { model } from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { response } from "express";

const userController = {
  //GET ALL USER
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE USER
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      //await User.findByIdAndDelete(req.params.id)
      res.status(200).json("Delete successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },


};

export default userController;
