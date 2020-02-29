import "egg"
import { Mongoose, Model, Document } from "mongoose"

declare module "egg" {}

declare module "SystemDao" {
  interface IStudent {
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
  type Student = IStudent
}
