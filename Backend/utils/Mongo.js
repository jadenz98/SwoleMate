const MongoClient = require('mongodb').MongoClient;

export default class Mongo {
    static url = 'mongodb://18.224.157.155:27017';
    static DBName = "SwoleMate";

    /**
     * An abstraction to the insert function
     *
     * @param collection    The collection to insert your new object into
     * @param object        The object to be inserted
     * @param callback      The function to be executed once the data has been put in the database
     */
    static insert (collection, object, callback) {
        const DBName = this.DBName;

        MongoClient.connect(this.url, function(error, db){
            const dbo = db.db(DBName);

            if (error)
                throw error;

            dbo.collection(collection).insertOne(object, function(err, res){
                if(err)
                    throw err;

                db.close();

                if (callback)
                    callback();
            });
        });
    }

    /**
     * An absctraction to the update function
     *
     * @param collection    The collection to insert your new object into
     * @param query         The query defining what to update
     * @param values        The values that are to be updated
     * @param callback      The function to be executed once the data has been put in the database
     */
    static update (collection, query, values, callback) {
        const DBName = this.DBName;

        MongoClient.connect(this.url, function(error, db){
            const dbo = db.db(DBName);

            //check for connection error
            if(error){
                console.error(error);
                process.exit(1);
            }

            //put methods to modify database here
            dbo.collection(collection).updateOne(query, values, function(err, res) {
                if (err)
                    throw err;

                //close database
                db.close();

                if (callback)
                    callback();
            });
        });
    }
}