import React, { CSSProperties } from 'react';

import { Modal, Row, Col } from 'antd';
import { IStudentParamType as IStudent } from '@/services/student';

interface IProps {
  visible: boolean;
  onCancel: () => void;
  stud?: IStudent;
}

function StudentDetails({ stud, onCancel, visible }: IProps) {
  const rowStyle: CSSProperties = { marginBottom: '10px' };
  const colStyle: CSSProperties = { textAlign: 'right' };
  function labelItem(label: any, value: any) {
    return (
      <Row style={rowStyle}>
        <Col span={10} style={colStyle}>
          {label}：
        </Col>
        <Col span={14}>{value}</Col>
      </Row>
    );
  }

  return (
    <Modal title="数据详情" visible={visible} onCancel={onCancel} footer={null}>
      {labelItem('学号', stud?.studentId)}
      {labelItem('姓名', stud?.name)}
      {labelItem('出生年月', stud?.birthday)}
      {labelItem('身份证号码', stud?.idCard)}
      {labelItem('班级', stud?.grade)}
      {labelItem('入学时间', stud?.admissionDate)}
      {labelItem('预计毕业时间', stud?.graduateDate)}
      {labelItem('创建时间', stud?.createTime)}
      {labelItem('更新时间', stud?.updateTime)}
    </Modal>
  );
}

export default StudentDetails;
