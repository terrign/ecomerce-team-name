import React, { PropsWithChildren, useState } from 'react';
import dayjs from 'dayjs';
import { Button, Card, DatePicker, Form, Input, Skeleton } from 'antd';
import { SaveOutlined, RollbackOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { UserInfoCardType } from '../../models/UserInfoCardType';
import { customerSlice } from '../../store/customer.slice';
import { alertSlice } from '../../store/alert.slice';
import { DatePickerValue } from '../../models/DatePickerValue';
import { reduceDate } from '../../helpers/registrationRequestAdapter';
import { USER_CARD_TYPE_MAP as typeMap } from '../../constants/user-card';
import './UserCard.css';

const UserCard = (props: { type: UserInfoCardType } & PropsWithChildren) => {
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

  const title = (
    <div className="user-card__title">
      <p>{typeMap[props.type].title}</p>
      <div className="user-card__controls">
        <Button type="dashed" icon={<SaveOutlined />} onClick={() => form.submit()} disabled={isValuesSame}>
          Save
        </Button>
        <Button type="dashed" icon={<RollbackOutlined />} onClick={onReset}>
          Reset
        </Button>
      </div>
    </div>
  );

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
      title={title}
      bordered={true}
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
