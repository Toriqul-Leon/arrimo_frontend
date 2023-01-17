import dbConnect from "../../../db/connect";
import User from "../../../db/models/UserModel";
import bcrypt from "bcrypt";


export default async function handler(req, res) {
    const { email, password } = req.body;

    await dbConnect();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.json({
                success: false,
                message: "User not found",
            });
        }


        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            res.json({
                success: false,
                message: "Invalid password",
            });
        } else {
            res.json({
                success: true,
                message: "User logged in",
                user,
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }

  }
  