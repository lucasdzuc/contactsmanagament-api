import mongoose from 'mongoose';
import 'dotenv/config';

const URI_DATABASE = process.env.MONGODB_URI;

mongoose.connect(URI_DATABASE as string, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
    // useFindAndModify: false,
}).then(() => {
    console.log("Database connection successful!")
}).catch((err: any) => {
    console.log("No connection database!", err);
});

mongoose.Promise = global.Promise;

export default mongoose;