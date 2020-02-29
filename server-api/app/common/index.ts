import * as moment from "moment"

export function timetrans(unix: number, formatStr: string = "YYYY-MM-DD") {
  return moment(unix).format(formatStr)
}

export function getNowTime(): number {
  return Number(moment().format("x"))
}

export function datetarns(date): number {
  return Number(moment(date).format("x"))
}
