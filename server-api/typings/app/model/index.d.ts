// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportStudent from '../../../app/model/student';
import ExportUser from '../../../app/model/user';

declare module 'egg' {
  interface IModel {
    Student: ReturnType<typeof ExportStudent>;
    User: ReturnType<typeof ExportUser>;
  }
}
