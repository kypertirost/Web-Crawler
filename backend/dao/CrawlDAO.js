import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;
import CrawlSchema from "./CrawlSchema.js";
export default class CrawlDAO {

    static async getHistory(userEmail) {
        try {
            const history = await CrawlSchema.find({email: userEmail});
            console.log(history);
            return history;
        } catch(err) {
            console.error(`Unable to find user History: ${err}`);
            return {error : `Unable to find user History: ${err}`};
        }
    }

    static async addHistory(userEmail, result) {
        try{
            const history = await CrawlSchema.create({
                email : userEmail,
                url: result.url,
                title : result.title,
                hrefs : result.hrefs,
                images : result.images,
            });
            console.log(history);
            return await history.save();
        } catch(err) {
            console.error(`Unable to save result to database: ${err}`);
            return {error : `Unable to save result to database: ${err}`};
        }
    }

    static async deleteHistory(userEmail, resultId) {
        try {
            const deleteResponse = await CrawlSchema.deleteOne({
                email: userEmail,
                _id : resultId
            });
            console.log(deleteResponse);

            return deleteResponse;
        } catch(err) {
            console.error(`Unable to delete result to database: ${err}`);
            return {error : `Unable to delete result to database: ${err}`};
        }
    }
}