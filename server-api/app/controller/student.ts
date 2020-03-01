import { Controller } from "egg"
import * as common from "../common"

export default class StudentController extends Controller {
  public async index() {
    const { ctx } = this
    const { pi = 1, ps = 10, name = null } = ctx.query
    console.log("resful get")
    ctx.body = await this.ctx.service.student.getPageList(Number(pi), Number(ps), name)
  }

  public async create() {
    const { ctx } = this
    const params = ctx.request.body

    const result = await this.ctx.service.student.create({
      studentId: params.studentId,
      name: params.name,
      birthday: common.datetarns(params.birthday),
      idCard: params.idCard,
      grade: params.grade,
      admissionDate: common.datetarns(params.admissionDate),
      graduateDate: common.datetarns(params.graduateDate),
      createTime: common.getNowTime(),
      updateTime: common.getNowTime()
    })
    ctx.body = result
  }

  public async show() {
    const { ctx } = this
    const result = await this.ctx.service.student.show(ctx.params.id)
    ctx.body = result
  }

  public async update() {
    const { ctx } = this
    const id = ctx.params.id
    const body = ctx.request.body
    const result = await this.ctx.service.student.update(id, {
      ...body,
      birthday: common.datetarns(body.birthday),
      admissionDate: common.datetarns(body.admissionDate),
      graduateDate: common.datetarns(body.graduateDate),
      updateTime: common.getNowTime()
    })
    ctx.body = result
  }

  public async destroy() {
    const { ctx } = this
    const id = ctx.params.id
    if (!id) {
      ctx.throw(404, "id not found")
    }
    const reuslt = await ctx.service.student.destroy(id)
    ctx.body = reuslt
  }

  public async namelist() {
    const { ctx } = this
    const { ps = 5, name = null } = ctx.query
    ctx.body = await this.ctx.service.student.getNameList(name, Number(ps))
  }
}
