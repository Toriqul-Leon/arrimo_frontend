import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/UserModel";

export default async function handler(req, res) {
    const { id } = req.body;
    await dbConnect();

    try {
        const user = await User.findOneAndDelete({
            _id: id,
        });

        res.json({
            success: true,
            message: "User deleted",
            user,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}