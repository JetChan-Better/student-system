import { Effect } from 'dva';
import { Reducer } from 'redux';
import { message } from 'antd';
import * as studentService from '@/services/student';
import { ConnectState } from './connect.d';

export interface StudentModelStateType {
  list?: studentService.IStudentParamType[];
  pi?: number;
  ps?: number;
  totalCount?: number;
  searchName?: string;
}

export interface StudentModelType {
  namespace: 'student';
  state: StudentModelStateType;
  effects: {
    all: Effect;
    add: Effect;
    update: Effect;
    remove: Effect;
    search: Effect;
  };
  reducers: {
    saveList: Reducer<StudentModelStateType>;
    setPage: Reducer<StudentModelStateType>;
    setSearchKey: Reducer<StudentModelStateType>;
  };
}

const StudentModel: StudentModelType = {
  namespace: 'student',

  state: {
    list: [],
    pi: 1,
    ps: 10,
    totalCount: 0,
  },

  effects: {
    *all({ payload }, { call, put, select }) {
      const prePayload = yield select((state: ConnectState) => ({
        ps: state.student.ps,
        pi: state.student.pi,
        name: state.student.searchName,
      }));

      const response = yield call(studentService.query, { ...prePayload, ...payload });
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
    *add({ payload }, { call, put, select }) {
      const response = yield call(studentService.create, payload);
      if (response.status) {
        message.success('save success');
        const ps = yield select((state: ConnectState) => state.student.ps);
        yield put({
          type: 'setPage',
          payload: {
            pi: 1,
            ps,
          },
        });
        yield put({
          type: 'all',
        });
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(studentService.update, payload);
      if (response.status) {
        message.success('save success');
        yield put({
          type: 'all',
        });
      }
    },
    *remove({ payload }, { call, put }) {
      const response = yield call(studentService.remove, payload);
      if (response.status) {
        yield put({
          type: 'all',
        });
      }
    },
    *search({ payload }, { select, put }) {
      const { searchName } = payload;
      yield put({
        type: 'setSearchKey',
        payload: { searchName },
      });

      const ps = yield select((state: ConnectState) => state.student.ps);
      yield put({
        type: 'setPage',
        payload: {
          pi: 1,
          ps,
        },
      });
      yield put({
        type: 'all',
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload.list || [],
        totalCount: action.payload.totalCount || 0,
      };
    },
    setPage(state, action) {
      return {
        ...state,
        pi: action.payload.pi,
        ps: action.payload.ps,
      };
    },
    setSearchKey(state, action) {
      return {
        ...state,
        searchName: action.payload.searchName,
      };
    },
  },
};

export default StudentModel;
