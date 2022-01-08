import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://mongodb0.example.com:27017';
mongoose.connect(process.env.CRAWL_DB_URI).catch((err) => "canont log to database");
  
beforeEach((done) => {
    if (mongoose.connection.collections.crawl_histories_devs) {
        mongoose.connection.collections.crawl_histories_devs.drop(() => {
            done();
        });
    }
});