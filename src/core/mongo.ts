import mongoose, { ConnectOptions } from 'mongoose';
import { MissingMongoDBEnvironment } from './errors';
import Logger from './logger';

export default async () => {
    if (!process.env.MONGO_USER
    || !process.env.MONGO_PASS
    || !process.env.MONGO_HOST
    || !process.env.MONGO_DB
    )
    throw new MissingMongoDBEnvironment();

    await mongoose.connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
      {
          keepAlive: true,
          useNewUrlParser: true,
          useUnifiedTopology: true,
      } as ConnectOptions);
    Logger.get('Mongo').info('Connection to MongoDB established.');
    return mongoose;
};
