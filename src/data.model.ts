// data.model.ts

import * as mongoose from 'mongoose';

export const DataSchema = new mongoose.Schema({
  fieldData: Object,
});

export interface Data extends mongoose.Document {
  fieldData: Object;
}
