import mongoose from "mongoose";

const connect = async () => {
    mongoose.connect(process.env.DB_STRING).then(() => console.log("DB Connected")).catch(() => console.log("Connection Error"))
}

export default connect