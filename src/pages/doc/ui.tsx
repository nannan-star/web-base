import { CheckCircleOutlined, CloseCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space, Table, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

const UILibraryComparison: React.FC = () => {
  // 比较数据
  const comparisonData = [
    {
      key: '1',
      aspect: '设计理念',
      materialUI: 'Google Material Design 规范',
      antd: '企业级产品设计语言',
      winner: 'tie',
    },
    {
      key: '2',
      aspect: '组件数量',
      materialUI: '60+ 核心组件',
      antd: '50+ 高质量组件',
      winner: 'mui',
    },
    {
      key: '3',
      aspect: '主题定制',
      materialUI: '强大的主题系统，支持深度定制',
      antd: '内置多套主题，定制相对简单',
      winner: 'mui',
    },
    {
      key: '4',
      aspect: '国际化',
      materialUI: '支持多语言，需要额外配置',
      antd: '内置中文支持，国际化友好',
      winner: 'antd',
    },
    {
      key: '5',
      aspect: '文档质量',
      materialUI: '详细的英文文档和示例',
      antd: '中英文文档，示例丰富',
      winner: 'antd',
    },
    {
      key: '6',
      aspect: '社区活跃度',
      materialUI: 'GitHub 90k+ stars',
      antd: 'GitHub 90k+ stars',
      winner: 'tie',
    },
    {
      key: '7',
      aspect: '学习曲线',
      materialUI: '中等，需要理解 Material Design',
      antd: '相对平缓，符合国内使用习惯',
      winner: 'antd',
    },
    {
      key: '8',
      aspect: '移动端适配',
      materialUI: '原生支持响应式设计',
      antd: '需要额外配置移动端组件',
      winner: 'mui',
    },
  ];

  const columns = [
    {
      title: '比较维度',
      dataIndex: 'aspect',
      key: 'aspect',
      width: 120,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Material UI',
      dataIndex: 'materialUI',
      key: 'materialUI',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'mui' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {record.winner === 'antd' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Ant Design',
      dataIndex: 'antd',
      key: 'antd',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'antd' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {record.winner === 'mui' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>Material UI vs Ant Design 全面对比</Title>

      <Alert
        message="选择建议"
        description="选择UI库时应考虑项目需求、团队技术栈、设计要求等多个因素，没有绝对的好坏之分。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 概述对比 */}
      <Card title="📊 核心对比" style={{ marginBottom: 24 }}>
        <Table dataSource={comparisonData} columns={columns} pagination={false} size="middle" />
      </Card>

      {/* 详细分析 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="🎨 Material UI" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>设计一致性：</Text>严格遵循 Google Material Design 规范
              </li>
              <li>
                <Text strong>组件丰富：</Text>提供完整的组件生态系统
              </li>
              <li>
                <Text strong>主题系统：</Text>强大的主题定制能力
              </li>
              <li>
                <Text strong>TypeScript：</Text>完整的 TypeScript 支持
              </li>
              <li>
                <Text strong>国际化：</Text>全球化项目的首选
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">学习成本：</Text>需要理解 Material Design 概念
              </li>
              <li>
                <Text type="secondary">定制复杂：</Text>深度定制需要较多配置
              </li>
              <li>
                <Text type="secondary">包体积：</Text>相对较大的打包体积
              </li>
            </ul>

            <Title level={4}>适用场景</Title>
            <Space direction="vertical">
              <Tag color="blue">国际化产品</Tag>
              <Tag color="blue">移动优先设计</Tag>
              <Tag color="blue">Google 生态产品</Tag>
              <Tag color="blue">需要严格设计规范的项目</Tag>
            </Space>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="🐜 Ant Design" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>企业级：</Text>专为企业级应用设计
              </li>
              <li>
                <Text strong>开箱即用：</Text>丰富的业务组件
              </li>
              <li>
                <Text strong>中文友好：</Text>完善的中文文档和社区
              </li>
              <li>
                <Text strong>设计语言：</Text>符合国内用户使用习惯
              </li>
              <li>
                <Text strong>生态完整：</Text>配套工具链完善
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">设计风格：</Text>相对固定的视觉风格
              </li>
              <li>
                <Text type="secondary">移动端：</Text>移动端支持需要额外组件库
              </li>
              <li>
                <Text type="secondary">国际化：</Text>在海外项目中认知度较低
              </li>
            </ul>

            <Title level={4}>适用场景</Title>
            <Space direction="vertical">
              <Tag color="green">企业管理系统</Tag>
              <Tag color="green">中后台应用</Tag>
              <Tag color="green">数据可视化</Tag>
              <Tag color="green">国内项目</Tag>
            </Space>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 技术对比 */}
      <Card title="⚙️ 技术特性对比" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>性能表现</Title>
            <Paragraph>
              <Text strong>Material UI：</Text>
              <br />
              • 支持 Tree Shaking
              <br />
              • 按需加载组件
              <br />
              • 运行时主题切换
              <br />
              <br />
              <Text strong>Ant Design：</Text>
              <br />
              • 内置按需加载
              <br />
              • 优化的打包体积
              <br />• 服务端渲染友好
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>开发体验</Title>
            <Paragraph>
              <Text strong>Material UI：</Text>
              <br />
              • 完整的 TypeScript 定义
              <br />
              • 丰富的 Storybook 示例
              <br />
              • 活跃的社区支持
              <br />
              <br />
              <Text strong>Ant Design：</Text>
              <br />
              • 详细的中文文档
              <br />
              • 完善的设计资源
              <br />• 配套开发工具
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>生态系统</Title>
            <Paragraph>
              <Text strong>Material UI：</Text>
              <br />
              • MUI X 高级组件
              <br />
              • 丰富的第三方插件
              <br />
              • 设计系统工具
              <br />
              <br />
              <Text strong>Ant Design：</Text>
              <br />
              • Ant Design Pro
              <br />
              • Ant Design Mobile
              <br />• 完整的设计语言
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 选择建议 */}
      <Card title="💡 选择建议">
        <Title level={4}>选择 Material UI 如果：</Title>
        <ul>
          <li>项目需要国际化支持</li>
          <li>追求 Google Material Design 风格</li>
          <li>需要高度的主题定制能力</li>
          <li>移动端优先的响应式设计</li>
          <li>团队熟悉 Material Design 概念</li>
        </ul>

        <Title level={4}>选择 Ant Design 如果：</Title>
        <ul>
          <li>开发企业级中后台应用</li>
          <li>团队主要是中文环境</li>
          <li>需要快速开发和上线</li>
          <li>偏好开箱即用的解决方案</li>
          <li>项目主要面向国内用户</li>
        </ul>

        <Alert
          message="最终建议"
          description="两个库都是优秀的 React UI 框架，选择应该基于具体的项目需求、团队背景和目标用户群体。可以通过创建小型原型来测试哪个更适合您的使用场景。"
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default UILibraryComparison;
