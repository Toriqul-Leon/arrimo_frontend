import dbConnect from "../../../../db/connect";
import User from "../../../../db/models/UserModel";

export default async function handler(req, res) {
    const { id, email, name } = req.body;
    await dbConnect();

    if(!id) {
        return res.json({
            success: false,
            message: "Id is required",
        })
    }

    const newObject = {
        email,
        name,
    }

    try {
        const user = await User.findOneAndUpdate( { _id: id }, {
            $set : newObject
        }, { new: true });

        res.json({
            success: true,
            message: "User updated",
            user,
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        })
    }
}