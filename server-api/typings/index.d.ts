import "egg"
import * as mongoose from "mongoose"

declare module "egg" {
  // extend app
  interface Application {
    model: IModel
  }
  // extend context
  interface Context {
    model: IModel
  }
}