const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`connected to mongodb Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Erroer in Mongodb ${error}`);
    }
}

exports.module = { connectDB };
