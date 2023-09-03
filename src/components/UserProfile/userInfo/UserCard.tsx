import React, { PropsWithChildren, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Card, DatePicker, Form, Input, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { UserInfoCardType } from '../../../models/UserInfoCardType';
import { customerSlice } from '../../../store/customer.slice';
import { alertSlice } from '../../../store/alert.slice';
import { DatePickerValue } from '../../../models/DatePickerValue';
import { reduceDate } from '../../../helpers/forms/registrationRequestAdapter';
import { USER_CARD_TYPE_MAP as typeMap } from '../../../constants/user-card';
import './UserCard.css';

const UserCard = (props: { type: UserInfoCardType; formEnabled: boolean } & PropsWithChildren) => {
  const value = useAppSelector((state) => state.customer.info?.[props.type]);
  const version = useAppSelector((state) => state.customer.info?.version);
  const dispatch = useAppDispatch();
  const [isValuesSame, setIsValuesSame] = useState(true);
  const [form] = Form.useForm();

  const valueAdapter = (value: string | DatePickerValue) => (typeof value === 'string' ? value : reduceDate(value));

  const onReset = () => {
    form.resetFields();
    setIsValuesSame(true);
  };

  const onFinish = async () => {
    const updateValue = valueAdapter(form.getFieldValue(props.type));
    try {
      const res = await typeMap[props.type].action(version, updateValue);
      setIsValuesSame(true);
      dispatch(customerSlice.actions.set(res.body));
      dispatch(alertSlice.actions.success(`${typeMap[props.type].title} successfully changed!`));
    } catch (e) {
      dispatch(alertSlice.actions.error(e.message));
    }
  };

  return (
    <Card
      className="user-card"
      title={typeMap[props.type].title}
      bordered={true}
      extra={
        <Button onClick={onReset} disabled={!props.formEnabled}>
          Reset
        </Button>
      }
      bodyStyle={{ paddingBottom: 0 }}
      headStyle={{ backgroundColor: props.formEnabled ? 'rgba(22, 119, 255, 0.38)' : '#fafafa' }}
    >
      <Form
        form={form}
        onFinish={onFinish}
        onValuesChange={(changedValues) => {
          if (valueAdapter(changedValues[props.type]) === valueAdapter(value)) {
            setIsValuesSame(true);
          } else {
            setIsValuesSame(false);
          }
        }}
        disabled={!props.formEnabled}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Form.Item
            name={props.type}
            rules={typeMap[props.type].rules}
            validateFirst
            style={{ width: '100%' }}
            initialValue={props.type === 'dateOfBirth' ? dayjs(value) : value}
          >
            {props.type === 'dateOfBirth' ? <DatePicker inputReadOnly style={{ width: '100%' }} /> : <Input />}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              style={{ position: 'relative', left: '-1px' }}
              disabled={isValuesSame || !props.formEnabled}
              onClick={() => form.submit()}
            >
              Save
            </Button>
          </Form.Item>
        </Space.Compact>
      </Form>
    </Card>
  );
};

export default UserCard;
