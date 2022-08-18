import { Document } from 'mongoose';

export default interface IProjects extends Document {
    //items in project table
}

interface S extends IProjects {
    issue_date: Date;
    paid: boolean;
    overdue: boolean;
}