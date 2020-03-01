/* eslint-disable no-underscore-dangle */
import request from '@/utils/request';

export interface IStudentParamType {
  _id?: string;
  studentId: string;
  name: string;
  birthday: string;
  idCard: string;
  grade: string;
  admissionDate: string;
  graduateDate: string;
  createTime: string;
  updateTime: string;
}

export async function create(data: IStudentParamType): Promise<any> {
  return request('/server-api/student', {
    method: 'post',
    data,
  });
}

export async function query(params: { pi: number; ps: number; name?: string }): Promise<any> {
  return request('/server-api/student', {
    method: 'get',
    params,
  });
}

export async function update(data: IStudentParamType): Promise<any> {
  return request.put(`/server-api/student/${data._id}`, {
    data,
    requestType: 'form',
  });
}

export async function remove(params: { _id: string }): Promise<any> {
  return request(`/server-api/student/${params._id}`, {
    method: 'delete',
  });
}

export async function details(params: { _id: string }): Promise<any> {
  return request(`/server-api/student/${params._id}`, {
    method: 'get',
  });
}

export async function findOptions(params: { name: string; ps: number }): Promise<any> {
  return request(`/server-api/studentNamelist`, {
    method: 'get',
    params,
  });
}
