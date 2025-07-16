import type { RequestParams } from '@/types/common';
import type { ProTableParams, StationInfo } from '@/types/station';

import { DeleteOutlined, EditOutlined, ImportOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ActionType, FooterToolbar, PageContainer, ProTable } from '@ant-design/pro-components';
import { Badge, Button, Input, Popconfirm, Space, Tag } from 'antd';
import React, { useRef, useState } from 'react';

import { NETWORK_MAP, STATUS_MAP } from '@/constants';
import services from '@/services';
import { message } from '@/utils/message';
import StationForm from './form/index';
import './index.less';

const { getStationList, addStation, editStation, deleteStation } = services.StationController;

const StationList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<StationInfo[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [currentRecord, setCurrentRecord] = useState<StationInfo | undefined>(undefined);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // 处理搜索
  const handleSearch = (value: string) => {
    setSearchText(value);
    actionRef.current?.reload();
  };

  /**
   * 获取测站列表数据
   * @param params 请求参数
   * @returns 返回数据
   */
  const fetchStationList = async (params: ProTableParams) => {
    const { current = 1, pageSize = 10 } = params;

    // 构建请求参数 - 将ProTable的参数转换为后端接口需要的格式
    const requestParams: RequestParams = {
      page: Number(current),
      size: Number(pageSize),
      ...(searchText && { stationName: searchText }),
    };
    let res = await getStationList(requestParams);
    return {
      data: res.records,
      total: res.total,
      success: true,
    };
  };

  /**
   * 状态渲染
   * @param status 状态
   * @returns 返回状态标签
   */
  const renderStatus = (status: string) => {
    const config = STATUS_MAP[status as keyof typeof STATUS_MAP] || { color: 'default', text: '未知' };
    return <Tag color={config.color}>{config.text}</Tag>;
  };

  /**
   * 网络状态渲染
   * @param network 网络状态
   * @returns 返回网络状态标签
   */
  const renderNetwork = (network: string) => {
    const config = NETWORK_MAP[network as keyof typeof NETWORK_MAP] || { status: 'default', text: '未知' };
    return <Badge status={config.status as any} text={config.text} />;
  };

  /**
   * 删除操作
   * @param record 删除的记录
   */
  const handleDelete = async (record: StationInfo) => {
    const res: any = await deleteStation({ ids: [Number(record.id)] });
    console.log(res, 'res');

    if (res?.code === 'SUCCESS') {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };

  /**
   * 编辑操作
   * @param record 编辑的记录
   */
  const handleEdit = (record: StationInfo) => {
    setCurrentRecord(record);
    setIsEdit(true);
    setFormVisible(true);
  };

  /**
   * 批量删除
   */
  const handleBatchDelete = async () => {
    message.loading('正在删除...', 0.5);
    message.success(`成功删除 ${selectedRowsState.length} 个测站`);
    setSelectedRows([]);
    actionRef.current?.reload();
  };

  /**
   * 新增操作
   */
  const handleAdd = () => {
    setCurrentRecord(undefined);
    setIsEdit(false);
    setFormVisible(true);
  };

  /**
   * 导入操作
   */
  const handleImport = () => {
    message.info('导入测站数据');
  };

  /**
   * 表单提交处理
   * @param values 表单值
   */
  const handleFormSubmit = async (values: any) => {
    const isEditMode = isEdit && currentRecord?.id;
    const apiCall = isEditMode ? editStation(currentRecord.id, values) : addStation(values);
    const res: any = await apiCall;
    if (res?.code === 'SUCCESS') {
      message.success(isEditMode ? '编辑成功' : '新增成功');
      actionRef.current?.reload();
    }
  };

  /**
   * 关闭表单
   */
  const handleFormClose = () => {
    setFormVisible(false);
    setCurrentRecord(undefined);
    setIsEdit(false);
  };

  const columns = [
    {
      title: '基站名称',
      dataIndex: 'stationName',
      key: 'stationName',
      width: 120,
      render: (dom: any, record: StationInfo) => <a className="station-name">{record.stationName}</a>,
    },
    {
      title: '标识名',
      dataIndex: 'identificationName',
      key: 'identificationName',
      width: 150,
    },
    {
      title: '接收机类型',
      dataIndex: 'receiverType',
      key: 'receiverType',
      width: 150,
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 100,
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (dom: any, record: StationInfo) => renderStatus(record.status),
    },
    {
      title: '网络',
      dataIndex: 'network',
      key: 'network',
      width: 80,
      render: (dom: any, record: StationInfo) => renderNetwork(record.network),
    },
    {
      title: '历元时间',
      dataIndex: 'epochTime',
      key: 'epochTime',
      width: 160,
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      fixed: 'right' as const,
      render: (dom: any, record: StationInfo) => (
        <Space size="small">
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个测站吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="station-list">
      <PageContainer header={{ title: false }} breadcrumb={{}}>
        <ProTable<StationInfo>
          headerTitle=""
          actionRef={actionRef}
          rowKey="id"
          search={false}
          toolBarRender={() => [
            <Space key="toolbar">
              <Input.Search
                placeholder="请输入基站名称"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearch}
                style={{ width: 300 }}
                allowClear
                enterButton="搜索"
              />
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                新增
              </Button>
              <Button icon={<ImportOutlined />} onClick={handleImport}>
                导入
              </Button>
            </Space>,
          ]}
          request={fetchStationList}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条数据`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />

        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              </div>
            }
          >
            <Popconfirm
              title={`确定要删除选中的 ${selectedRowsState.length} 个测站吗？`}
              onConfirm={handleBatchDelete}
              okText="确定"
              cancelText="取消"
            >
              <Button danger>批量删除</Button>
            </Popconfirm>
          </FooterToolbar>
        )}

        <StationForm
          visible={formVisible}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          initialValues={currentRecord}
          isEdit={isEdit}
        />
      </PageContainer>
    </div>
  );
};

export default StationList;
