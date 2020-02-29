import { Controller } from "egg"

export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this
    console.log("ctx.model")
    ctx.body = await ctx.service.test.sayHi("egg")
  }
}
