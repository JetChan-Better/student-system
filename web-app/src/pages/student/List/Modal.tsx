/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Modal, Form, Input, DatePicker, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { connect } from 'dva';
import { ConnectProps } from '@/models/connect';
import { IStudentParamType as IStudent } from '@/services/student';
import moment from 'moment';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 },
  },
};

interface IProps extends FormComponentProps, ConnectProps {
  visible: boolean;
  onCancel: () => void;
  stud?: IStudent;
}

function StudentModal({ visible, onCancel, stud, form, dispatch }: IProps) {
  const [loading, setLoading] = React.useState(false);

  const typeIsAdd = stud === undefined;

  function toggleLoading() {
    setLoading(l => !l);
  }

  function submit(e?: React.FormEvent<any>) {
    if (e) {
      e.preventDefault();
    }
    form.validateFields(
      async (err, values): Promise<any> => {
        if (!err) {
          toggleLoading();
          const payload = {
            ...values,
            birthday: values.birthday.format('YYYY-MM-DD'),
            admissionDate: values.admissionDate.format('YYYY-MM-DD'),
            graduateDate: values.graduateDate.format('YYYY-MM-DD'),
          };
          try {
            if (typeIsAdd) {
              await dispatch({
                type: 'student/add',
                payload,
              });
            } else {
              await dispatch({
                type: 'student/update',
                payload: { ...payload, _id: stud ? stud._id : '' },
              });
            }
            form.resetFields();
            onCancel();
          } catch (error) {
            message.error(error.message);
          }
          toggleLoading();
        }
      },
    );
  }

  const { getFieldDecorator } = form;
  return (
    <Modal
      title={typeIsAdd ? 'Add' : 'Modify'}
      visible={visible}
      onOk={submit}
      onCancel={onCancel}
      okButtonProps={{ loading }}
    >
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="学号">
          {getFieldDecorator('studentId', {
            initialValue: stud ? stud.studentId : '',
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: stud ? stud.name : '',
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="出生年月">
          {getFieldDecorator('birthday', {
            initialValue: stud ? moment(stud.birthday) : moment(),
            rules: [{ required: true }],
          })(<DatePicker />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="身份证号码">
          {getFieldDecorator('idCard', {
            initialValue: stud ? stud.idCard : '',
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="班级">
          {getFieldDecorator('grade', {
            initialValue: stud ? stud.grade : '',
            rules: [{ required: true }],
          })(<Input />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="入学时间">
          {getFieldDecorator('admissionDate', {
            initialValue: stud ? moment(stud.admissionDate) : moment(),
            rules: [{ required: true }],
          })(<DatePicker />)}
        </FormItem>
      </Form>
      <Form onSubmit={submit}>
        <FormItem {...formItemLayout} label="预计毕业时间">
          {getFieldDecorator('graduateDate', {
            initialValue: stud ? moment(stud.graduateDate) : moment(),
            rules: [{ required: true }],
          })(<DatePicker />)}
        </FormItem>
      </Form>
    </Modal>
  );
}

export default connect()(Form.create<IProps>()(StudentModal));
