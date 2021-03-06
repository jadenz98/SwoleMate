const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://18.224.157.155:27017';
const DBName = "SwoleMate";

export default class Mongo {
    /**
     * An abstraction to the find function
     *
     * @param collection        The collection to search in
     * @param query             The query to execute
     * @param sort              The sort conditions of the resulting query (Optional)
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     */
    static find (collection, query, sort, callback) {
        MongoClient.connect(url, function(err, db) {
            const dbo = db.db(DBName);

            if (err)
                throw err;

            let result = dbo.collection(collection).find(query);

            if (sort) {
                result = result.sort(sort);
            }

            result.toArray(function(err, result) {
                if (err)
                    throw err;

                db.close();

                if (result.length === 1)
                    result = result[0];

                callback(result);
            });
        });
    }

    /**
     * An abstraction to the find function, diff between this and the one above
     * is this will return a array no matter how many things, (for example just 1)
     *
     * @param collection        The collection to search in
     * @param query             The query to execute
     * @param sort              The sort conditions of the resulting query (Optional)
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     */
    static findReal (collection, query, sort, callback) {
        MongoClient.connect(url, function(err, db) {
            const dbo = db.db(DBName);

            if (err)
                throw err;

            let result = dbo.collection(collection).find(query);

            if (sort) {
                result = result.sort(sort);
            }

            result.toArray(function(err, result) {
                if (err)
                    throw err;

                db.close();

                callback(result);
            });
        });
    }

    /**
     * An abstraction to the insert function
     *
     * @param collection    The collection to insert your new object into
     * @param object        The object to be inserted
     * @param callback      The function to be executed once the data has been put in the database
     */
    static insert (collection, object, callback) {
        MongoClient.connect(url, function(error, db){
            const dbo = db.db(DBName);

            if (error)
                throw error;

            dbo.collection(collection).insertOne(object, function(err, res){
                if(err)
                    throw err;

                db.close();

                if (callback)
                    callback(res);
            });
        });
    }

    /**
     * An abstraction to the update function
     *
     * @param collection    The collection to update the object in
     * @param query         The query defining what to update
     * @param values        The values that are to be updated
     * @param callback      The function to be executed once the data has been put in the database
     */
    static update (collection, query, values, callback) {
        MongoClient.connect(url, function(error, db){
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
                    callback(res);
            });
        });
    }

    /**
     * An abstraction on the delete function
     * THIS WILL DELETE EVERY MATCH TO THE SPECIFIED QUERY
     * BE VERY CAREFUL
     *
     * @param collection        The collection to delete from
     * @param query             The query to select the object to be deleted
     * @param callback          The function to be executed upon successful deletion
     */
    static delete (collection, query, callback) {
        MongoClient.connect(url, function(err, db) {
            const dbo = db.db(DBName);

            if (err)
                throw err;

            dbo.collection(collection).deleteMany(query, function(err, obj) {
                if (err)
                    throw err;

                db.close();

                if (callback)
                    callback(obj);
            });
        });
    }

    /**
     * Method used to update a user's location
     *
     * @param email      The username of the user to update
     * @param latitude      The latitude
     * @param longitude     The longitude
     * @param callback      The function to be executed after update
     */
    static updateLocation (email, latitude, longitude, callback) {
        MongoClient.connect(url, function(error, db){
            const dbo = db.db(DBName);
            const query = {
                email: email
            };

            // location is a GeoJSON object describing the location of the user
            // it must follow in the order of longitude, latitude
            // https://docs.mongodb.com/manual/reference/geojson/#geojson-point
            const value = {
                $set: {
                    location : {
                        type: "Point",
                        coordinates: [
                            longitude,
                            latitude
                        ]
                    }
                }
            };

            //check for connection error
            if(error){
                console.error(error);
                process.exit(1);
            }

            //put methods to modify database here
            dbo.collection("Users").updateOne(query, value, function(err, res) {
                if (err)
                    throw err;

                //close database
                db.close();

                if (callback)
                    callback(res);
            });
        });
    }

    /**
     * An abstraction to the nearbyUsers function. This will find the users around 
     * a certain location and return them in array form. 
     * 
     * @param email        The email to find the users around
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     */
    static getNearbyUsers (email, callback) {
        // Get the coordinates of the user
        this.find("Users", {email: email}, undefined, (user) => {
            const distance = user.searchDistance * 1000;      // Range of distance to search in meters
            const coordinates = user.location.coordinates;
            MongoClient.connect(url, function(error, db){
                const dbo = db.db(DBName);
                dbo.collection("Users").createIndex({location:"2dsphere"});
                const query = {
                    location: {
                        $nearSphere: {
                            $geometry: {
                                type: "Point",
                                coordinates: coordinates
                            },
                            $minDistance: 1,
                            $maxDistance: distance
                        }
                    }
                };

                Mongo.find("Users", query, undefined, (result) => {
                    let userList = [];
                    let swiped = false;
                    let likes = [];
                    Mongo.find("Matches", {email: email}, undefined, (matches) => {
                        likes = matches.likes;
                        for(let i = 0; i < result.length; i++) {
                            for(let j = 0; j < likes.length; j++) {
                                if(result[i].email === likes[j].email) {
                                    swiped = true;
                                }
                            }
                            if(!swiped && !result[i].isGhost) {
                                userList.push(result[i]);
                            }
                            swiped = false;
                        }

                        let filteredList = [];
                        if(user.interests.length !== 0) {
                            for(let i = 0; i < user.interests.length; i++) {
                                for(let j = 0; j < userList.length; j++) {
                                    if(userList[j].interests.includes(user.interests[i])) {
                                        filteredList.push(userList[j]);
                                        userList.splice(j, 1);
                                    }
                                }
                            }
                        }

                        for(let i = 0; i < userList.length; i++) {
                            filteredList.push(userList[i]);
                        }

                        for (let i = 0; i < filteredList.length; i++) {
                            if (filteredList[i].email === user.email) {
                                filteredList.splice(i, 1);
                            }
                        }

                        if(filteredList.length === 0) {
                            callback(filteredList);
                        } else {
                            filteredList = filteredList.slice(0, 10);
                            callback(filteredList);
                        }
                    });
                });
            });
        });
    }

    /**
     * An abstraction to the matches function. Checks the database for all the matches of 
     * a specfic email. 
     * 
     * @param email        The email to find the matches for
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     */
    static getMatches (email, callback) {
        const query = [];
        this.findReal("Conversations", {email1: email}, undefined, (matches1) => {
            for (let i = 0; i < matches1.length; i++) {
                query.push({email: matches1[i].email2});
            }

            this.findReal("Conversations", {email2: email}, undefined, (matches2) => {
                for (let i = 0; i < matches2.length; i++) {
                    query.push({email: matches2[i].email1});
                }

                if (query.length === 0) {
                    callback([]);
                    return;
                }

                this.findReal("Users", {$or: query}, undefined, (u) => {
                    callback(u)
                });
            });
        });
    }

    /**
     * An abstraction to the conversations function. This will return an array of all the 
     * messages that have been sent between two users.  
     * 
     * @param email1        The email to find the conversations for
     * @param email2        The email to find the conversations for
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     *                          This will be a array of email - message type json. 
     */
    static getConversation (email1, email2, callback) {
        this.findReal("Conversations", {email1 : email1}, undefined, (tryone) => {
            for (let i = 0; i < tryone.length; i++) {
                if(tryone[i].email2 === email2){
                    callback(tryone[i].conversation);
                    return;
                }
            }
        });

        this.findReal("Conversations", {email2 : email1}, undefined, (tryone) => {
            for (let i = 0; i < tryone.length; i++) {
                if(tryone[i].email1 === email2){
                    callback(tryone[i].conversation);
                    return;
                }
            }
        });
    }

    /**
     * An abstraction to the Conversations function. This will set a conversations (which is 
     * really just adding a message to a conversation between 2 people)
     * 
     * @param email1        The email to find the conversations for
     * @param email2        The email to find the conversations for
     * @param callback          The callback to be executed after the query. The results are passed in to this.
     *                          This will be a array of email - message type json. 
     */
    static setConversation (email1, email2, msg, callback) {
        let convo = [];
        this.findReal("Conversations", {email1 : email1}, undefined, (tryone) => {
            for (let i = 0; i < tryone.length; i++) {
                if(tryone[i].email2 === email2){
                    convo = tryone[i].conversation;

                    const newMessage = {
                        email: email1,
                        msg: msg,
                        _id: convo.length
                    };
                    convo.push(newMessage);

                    const insertNewConvo = {
                        email1: email1,
                        email2: email2,
                        conversation: convo
                    };
                    this.delete("Conversations", {_id:tryone[i]._id}, () => {
                        this.insert("Conversations", insertNewConvo, () => {
                            callback("R");
                            return;
                        });
                    });
                }
            }
        });
        this.findReal("Conversations", {email2 : email1}, undefined, (tryone) => {
            for (let i = 0; i < tryone.length; i++) {
                if(tryone[i].email1 === email2){
                    convo = tryone[i].conversation;

                    const newMessage = {
                        email: email1,
                        msg: msg,
                        _id: convo.length
                    };
                    convo.push(newMessage);

                    const insertNewConvo = {
                        email1: email1,
                        email2: email2,
                        conversation: convo
                    };
                    this.delete("Conversations", {_id:tryone[i]._id}, () => {
                        this.insert("Conversations", insertNewConvo, () => {
                            callback("R");
                        });
                    });
                }
            }
        });
    }
}
