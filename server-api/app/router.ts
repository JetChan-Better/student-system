import { Application } from "egg"

export default (app: Application) => {
  const { controller, router } = app

  router.resources("student", "/server-api/student", controller.student)
}
