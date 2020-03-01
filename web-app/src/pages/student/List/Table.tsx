/* eslint-disable no-underscore-dangle */

import React from 'react';
import { Table, Divider, Popconfirm, Button } from 'antd';
import { connect } from 'dva';
import { ConnectState, ConnectProps, StudentModelStateType } from '@/models/connect';
import { IStudentParamType as IStudent, findOptions } from '@/services/student';
import { useOnMount } from '@/utils/hooks';
import { PaginationConfig } from 'antd/lib/pagination';
import StudentModal from './Modal';
import StudentDetails from './Details';
import SearchLine, { IOption } from './Search';
import style from './style.less';

export interface StudentTableProps extends ConnectProps {
  student: StudentModelStateType;
}

function StudentTable({ student, dispatch }: StudentTableProps) {
  function dispatchList() {
    dispatch({
      type: 'student/all',
    });
  }
  useOnMount(() => {
    dispatchList();
  });

  const [modalVisible, setModalVisible] = React.useState(false);
  const [currentStudent, setCurrentStudent] = React.useState<IStudent | undefined>(undefined);

  const [detailsVisible, setDetailsModalVisible] = React.useState(false);
  const [currentDetialsStudent, setCurrentDetialsStudent] = React.useState<IStudent | undefined>(
    undefined,
  );

  const [searchOptions, setSearchOptions] = React.useState<IOption[]>([]);

  function modifyStudent(o: IStudent) {
    setCurrentStudent(o);
    setModalVisible(true);
  }
  function addStudent() {
    setCurrentStudent(undefined);
    setModalVisible(true);
  }

  function showDetails(o: IStudent) {
    setDetailsModalVisible(true);
    setCurrentDetialsStudent(o);
  }

  async function handleTableChange(pagination: PaginationConfig) {
    const { current, pageSize } = pagination;
    await dispatch({
      type: 'student/setPage',
      payload: { pi: current, ps: pageSize },
    });
    await dispatchList();
  }

  function searhFetch(k: string) {
    dispatch({
      type: 'student/search',
      payload: { searchName: k },
    });
  }
  async function fetchOptions(v: string) {
    const result = await findOptions({ name: v, ps: 10 });
    if (result.status) {
      setSearchOptions(result.data);
    }
  }

  return (
    <React.Fragment>
      <div>
        <SearchLine
          fetch={searhFetch}
          fetchOptions={fetchOptions}
          placeholder="搜索姓名..."
          options={searchOptions}
          style={{ width: '200px' }}
        />
        <Button className={style.addBtn} type="primary" size="small" onClick={() => addStudent()}>
          新增
        </Button>
      </div>
      <Table<IStudent>
        size="middle"
        dataSource={student.list}
        bordered
        rowKey="_id"
        pagination={{
          current: student.pi,
          showSizeChanger: true,
          pageSize: student.ps,
          pageSizeOptions: ['30', '20', '10'],
          total: student.totalCount,
        }}
        scroll={{ x: 1300 }}
        onChange={handleTableChange}
      >
        <Table.Column<IStudent> key="studentId" title="学号" dataIndex="studentId" />
        <Table.Column<IStudent> key="name" title="姓名" dataIndex="name" />
        <Table.Column<IStudent> key="birthday" title="出生年月" dataIndex="birthday" />
        <Table.Column<IStudent> key="idCard" title="身份证号码" dataIndex="idCard" />
        <Table.Column<IStudent> key="grade" title="班级" dataIndex="grade" />
        <Table.Column<IStudent> key="admissionDate" title="入学时间" dataIndex="admissionDate" />
        <Table.Column<IStudent> key="graduateDate" title="预计毕业时间" dataIndex="graduateDate" />
        <Table.Column<IStudent> key="createTime" title="创建时间" dataIndex="createTime" />
        <Table.Column<IStudent> key="updateTime" title="更新时间" dataIndex="updateTime" />
        <Table.Column<IStudent>
          key="action"
          title="操作"
          width={180}
          fixed="right"
          align="center"
          render={(_, record) => (
            <span>
              <a onClick={() => showDetails(record)}>详情</a>
              <Divider type="vertical" />
              <a onClick={() => modifyStudent(record)}>修改</a>
              <Divider type="vertical" />
              <Popconfirm
                placement="top"
                title="确认删除?"
                onConfirm={() => dispatch({ type: 'student/remove', payload: { _id: record._id } })}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" size="small">
                  删除
                </Button>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <StudentModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
        stud={currentStudent}
      />
      <StudentDetails
        visible={detailsVisible}
        onCancel={() => {
          setDetailsModalVisible(false);
        }}
        stud={currentDetialsStudent}
      />
    </React.Fragment>
  );
}
export default connect(({ student }: ConnectState) => ({
  student,
}))(StudentTable);
