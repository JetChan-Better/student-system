import { Application } from "egg"
import { Document, Model, Schema } from "mongoose"

export interface IStudent {
  studentId: string
  name: string
  birthday: number
  idCard: string
  grade: string
  admissionDate: number
  graduateDate: number

  createTime: number
  updateTime: number
}

const StudentSchema: Schema = new Schema({
  studentId: {
    type: String,
    unique: true,
    index: true
  },
  name: {
    type: String
  },
  birthday: {
    type: Number
  },
  idCard: {
    type: String,
    unique: true
  },
  grade: {
    type: String
  },
  admissionDate: {
    type: Number
  },
  graduateDate: {
    type: Number
  },
  createTime: {
    type: Number
  },
  updateTime: {
    type: Number
  }
})
export interface IStudentDocument extends IStudent, Document {}
export interface IStudentModel extends Model<IStudentDocument> {}

export default (app: Application): Model<IStudentDocument> => {
  const { mongoose } = app
  return mongoose.model<IStudentDocument>("student", StudentSchema)
}
