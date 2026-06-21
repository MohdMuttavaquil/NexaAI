import mongoose from "mongoose";

const connect = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/ChatBot').then(() => console.log("DB Connected")).catch(() => console.log("Connection Error"))
}

export default connect