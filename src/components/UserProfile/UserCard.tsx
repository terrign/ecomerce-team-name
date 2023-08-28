import React, { PropsWithChildren } from 'react';
import { Button, Card, DatePicker, Form, Input, Skeleton } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../store/hooks';
import {
  BIRTH_DATE_INPUT_RULES,
  EMAIL_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
} from '../../constants/forms/registration-form/rules';

import dayjs from 'dayjs';

type CardType = 'email' | 'dateOfBirth' | 'firstName' | 'lastName';

interface UserCardProps {
  type: CardType;
}

const typeMap = {
  email: { title: 'E-mail', rules: EMAIL_INPUT_RULES },
  dateOfBirth: { title: 'Birth Date', rules: BIRTH_DATE_INPUT_RULES },
  firstName: { title: 'First Name', rules: FIRST_NAME_INPUT_RULES },
  lastName: { title: 'Last Name', rules: LAST_NAME_INPUT_RULES },
};

const UserCard = (props: UserCardProps & PropsWithChildren) => {
  const value = useAppSelector((state) => state.customer.info?.[props.type]);
  const [form] = Form.useForm();

  const titleContols = (
    <div style={{ display: 'flex', gap: 5, marginRight: -16 }}>
      <Button type="dashed" icon={<SaveOutlined />} onClick={() => form.submit()}>
        Save
      </Button>
      <Button type="dashed" icon={<SaveOutlined />} onClick={() => form.resetFields()}>
        Reset
      </Button>
    </div>
  );

  const onFinish = () => {};

  return (
    <Card title={typeMap[props.type].title} bordered={true} extra={titleContols} bodyStyle={{ paddingBottom: 0 }}>
      {!value && <Skeleton.Input active block style={{ marginBottom: 24 }} />}
      {value && (
        <Form
          form={form}
          initialValues={{ [props.type]: props.type === 'dateOfBirth' ? dayjs(value) : value }}
          onFinish={onFinish}
        >
          <Form.Item name={props.type} rules={typeMap[props.type].rules} validateFirst>
            {props.type === 'dateOfBirth' ? <DatePicker style={{ width: '100%' }} /> : <Input />}
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default UserCard;
