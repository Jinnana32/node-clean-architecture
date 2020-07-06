import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(
    process.env.MONGODB_URL!!,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
(err) => {
    if (!err) {
        console.log('Successfully Established Connection with MongoDB')
    }
    else {
        console.log('Failed to Establish Connection with MongoDB with Error: ' + err)
    }
});

export default mongoose;