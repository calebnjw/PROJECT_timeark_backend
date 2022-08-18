import mongoose, { Schema } from 'mongoose';

const InvoiceSchema: Schema = new Schema ({
    issue_date: {
        type: Date,
    },
    paid: {
        type: Boolean,
    },
    overdue: {
        type: Boolean,
    },
})