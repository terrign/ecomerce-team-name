import React, { PropsWithChildren, useState } from 'react';
import { Button, Card, DatePicker, Form, Input, Skeleton } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  BIRTH_DATE_INPUT_RULES,
  EMAIL_INPUT_RULES,
  FIRST_NAME_INPUT_RULES,
  LAST_NAME_INPUT_RULES,
} from '../../constants/forms/registration-form/rules';

import dayjs from 'dayjs';
import { UserInfoCardType } from '../../models/UserInfoCardType';
import getUpdateActionByCardType from '../../helpers/ApiClient/customerUpdateRequests.ts/getUpdateActionByCardType';
import { customerSlice } from '../../store/customer.slice';
import { alertSlice } from '../../store/alert.slice';
import { DatePickerValue } from '../../models/DatePickerValue';
import { reduceDate } from '../../helpers/registrationRequestAdapter';

interface UserCardProps {
  type: UserInfoCardType;
}

const typeMap = {
  email: { title: 'E-mail', rules: EMAIL_INPUT_RULES },
  dateOfBirth: { title: 'Birth Date', rules: BIRTH_DATE_INPUT_RULES },
  firstName: { title: 'First Name', rules: FIRST_NAME_INPUT_RULES },
  lastName: { title: 'Last Name', rules: LAST_NAME_INPUT_RULES },
};

const UserCard = (props: UserCardProps & PropsWithChildren) => {
  const value = useAppSelector((state) => state.customer.info?.[props.type]);
  const version = useAppSelector((state) => state.customer.info?.version);
  const dispatch = useAppDispatch();
  const [isValuesSame, setIsValuesSame] = useState(true);
  const [form] = Form.useForm();

  const valueAdapter = (value: string | DatePickerValue) => {
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      return reduceDate(value);
    }
  };

  const onReset = () => {
    form.resetFields();
    setIsValuesSame(true);
  };

  const titleContols = (
    <div style={{ display: 'flex', gap: 5, marginRight: -16 }}>
      <Button type="dashed" icon={<SaveOutlined />} onClick={() => form.submit()} disabled={isValuesSame}>
        Save
      </Button>
      <Button type="dashed" icon={<SaveOutlined />} onClick={onReset}>
        Reset
      </Button>
    </div>
  );

  const onFinish = async () => {
    const updateValue = valueAdapter(form.getFieldValue(props.type));
    try {
      const res = await getUpdateActionByCardType(props.type)(version, updateValue);
      setIsValuesSame(true);
      dispatch(customerSlice.actions.set(res.body));
      dispatch(alertSlice.actions.success(`${typeMap[props.type].title} successfully changed!`));
    } catch (e) {
      dispatch(alertSlice.actions.error(e.message));
    }
  };

  return (
    <Card
      title={typeMap[props.type].title}
      bordered={true}
      extra={titleContols}
      bodyStyle={{ paddingBottom: 0 }}
      headStyle={{ backgroundColor: 'rgba(73, 119, 216, 0.1)' }}
    >
      {!value && <Skeleton.Input active block style={{ marginBottom: 24 }} />}
      {value && (
        <Form
          form={form}
          initialValues={{ [props.type]: props.type === 'dateOfBirth' ? dayjs(value) : value }}
          onFinish={onFinish}
          onValuesChange={(changedValues) => {
            if (valueAdapter(changedValues[props.type]) === valueAdapter(value)) {
              setIsValuesSame(true);
            } else {
              setIsValuesSame(false);
            }
          }}
        >
          <Form.Item name={props.type} rules={typeMap[props.type].rules} validateFirst>
            {props.type === 'dateOfBirth' ? <DatePicker style={{ width: '100%' }} inputReadOnly /> : <Input />}
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default UserCard;
