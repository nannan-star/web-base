import type { StationInfo } from '@/types/station';

import { Button, Drawer, Form, Input, Space } from 'antd';
import React, { useEffect } from 'react';

import styles from './index.less';

interface StationFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => Promise<void>;
  initialValues?: Partial<StationInfo>;
  isEdit?: boolean;
}

const stationInfo = {
  stationType: 0,
  stationName: 'aaaa',
  identificationName: 'aaaa',
  receiverType: 'CHC P5U',
  dataType: 1,
  highAngle: 5,
  antennaType: 'CHCC220GR       CHCD',
  antennaHigh: 0,
  coordType: 0,
  coordContent: {
    referenceTime: null,
    velocityEnable: 0,
    coord1: '-2489141.7000',
    coord2: '4798067.6650',
    coord3: '3374564.8910',
  },
  netMode: 1,
  netType: 0,
  netProtocols: [
    { ip: 'stream.wegnss.com', port: '8999', encryptType: 'NONE', user: 'chcnav', pwd: 'chcnac', source: 'AHAL' },
  ],
  coLocatedEnabled: 0,
};

const StationForm: React.FC<StationFormProps> = ({ visible, onClose, onSubmit, initialValues, isEdit = false }) => {
  const [form] = Form.useForm();

  // 当弹窗打开时重置表单
  useEffect(() => {
    if (visible) {
      if (isEdit && initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.resetFields();
      }
    }
  }, [visible, isEdit, initialValues, form]);

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const submitData = {
        ...stationInfo,
        stationName: values.stationName,
        identificationName: values.identificationName,
      };

      await onSubmit(submitData);
    } catch (error) {
      // console.error('表单验证失败:', error);
    }
  };

  // 取消操作
  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Drawer
      title={isEdit ? '编辑测站' : '新增测站'}
      width={600}
      onClose={handleCancel}
      open={visible}
      className={styles.stationForm}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Space>
            <Button onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={handleSubmit}>
              {isEdit ? '保存' : '创建'}
            </Button>
          </Space>
        </div>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="stationForm"
        initialValues={{
          status: 'stopped',
          network: 'offline',
        }}
      >
        <Form.Item
          name="stationName"
          label="基站名称"
          rules={[
            { required: true, message: '请输入基站名称' },
            { max: 50, message: '基站名称不能超过50个字符' },
          ]}
        >
          <Input placeholder="请输入基站名称" />
        </Form.Item>

        <Form.Item
          name="identificationName"
          label="标识名"
          rules={[
            { required: true, message: '请输入标识名' },
            { max: 50, message: '标识名不能超过50个字符' },
          ]}
        >
          <Input placeholder="请输入标识名" />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default StationForm;
