import dbConnect from "../../../db/connect";
import User from "../../../db/models/UserModel";

export default async function handler(req, res) {
    await dbConnect();

    try {
        const users = await User.find({});

        res.json({
            success: true,
            users,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}