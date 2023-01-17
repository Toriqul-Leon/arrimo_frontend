import dbConnect from "../../../db/connect";
import User from "../../../db/models/UserModel";

import { hash } from "bcrypt";


export default async function handler(req, res) {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);

    await dbConnect();

    try {
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.json({
            success: true,
            message: "User created",
            user,
        });

        
    } catch (error) {
        res.json({
            success: false,
            message: "User with this email already exists",
        })
    }

  }
  