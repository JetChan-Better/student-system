import { Service } from "egg"
import { IStudent } from "../model/student"
import { timetrans } from "../common"

export type Result<T> = {
  data?: Array<T> | T
  status: Boolean
  message?: String
}

export const convertModel = data => ({
  _id: data._id,
  studentId: data.studentId,
  name: data.name,
  idCard: data.idCard,
  grade: data.grade,
  admissionDate: timetrans(data.admissionDate),
  graduateDate: timetrans(data.graduateDate),
  birthday: timetrans(data.birthday),
  createTime: timetrans(data.createTime, "YYYY-MM-DD HH:mm"),
  updateTime: timetrans(data.updateTime, "YYYY-MM-DD HH:mm")
})

/**
 * Student Service
 */
export default class StudentService extends Service {
  public async getPageList(pi: number = 1, ps: number = 10, studentId?: string) {
    const { Student } = this.ctx.model

    const $where = {}
    if (studentId) {
      $where["studentId"] = { $regex: studentId }
    }
    const totalCount = await Student.find($where).countDocuments()

    const list = await Student.find($where)
      .sort({ createTime: -1 })
      .skip((pi - 1) * ps)
      .limit(ps)
      .exec()

    return {
      totalCount,
      list: list.map(item => {
        return convertModel(item)
      }),
      totalPages: Math.ceil(totalCount / ps)
    }
  }

  public async create(student: IStudent): Promise<Result<any>> {
    const { Student } = this.ctx.model
    try {
      const result = await Student.create(student)
      return { status: true, data: result }
    } catch (error) {
      return { status: false, message: error.message }
    }
  }

  public async show(_id: string): Promise<Result<any>> {
    const { Student } = this.ctx.model
    const student = await Student.findOne({ _id })
    return { status: student !== null, data: student ? convertModel(student) : null }
  }

  public async update(_id: string, payload: any): Promise<Result<any>> {
    const { Student } = this.ctx.model
    const student = await Student.findOne({ _id })
    if (!student) {
      return { status: false, message: "student not found" }
    }
    const updateStudent = await Student.update({ _id }, { $set: payload })
    return { status: true, data: updateStudent }
  }

  public async destroy(_id: string): Promise<Result<any>> {
    const { ctx } = this
    console.log("_id", _id)
    const student = await ctx.model.Student.findOne({ _id })
    if (!student) {
      return { status: false, message: "student not found" }
    }
    const result = await ctx.model.Student.remove({ _id })
    return { status: true, data: result }
  }
}
