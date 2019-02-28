// PrepaymentRequest - store info about a request
/*
interface PrepaymentModel extends Document {
    transaction_guid: string;
    payment_identifier: string; // Scottish Power's identifier
    payment_source: string;
    date: Date;
    amount: string;
}
*/

import * as mongoose from "mongoose";

const uri: string = process.env.MONGO_DATABASE_URL;

const mon = require("mongoose");
const schema = mon.Schema({
    path : {type: String , required: true},
    title: {type: String , required: true}
});
mon.model("game", schema);

// mongoose.connect("mongodb://localhost:27017");

