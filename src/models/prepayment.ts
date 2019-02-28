import { Document, Schema, Model, model } from "mongoose";
import { IPrepayment } from "../interfaces/prepayment";

export interface IPrepaymentModel extends IPrepayment, Document {
    utrn: string;
    transaction_guid: string;
    amount: string;
    payment_identifier: string;
}

export const PrepaymentSchema: Schema = new Schema({
    createdAt: Date,
    utrn: String,
    transaction_guid: String,
    amount: String,
    payment_identifier: String
});

PrepaymentSchema.pre("save", function(next) {
    const now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

export const Prepayment: Model<IPrepaymentModel> = model<IPrepaymentModel>("Prepayment", PrepaymentSchema);
