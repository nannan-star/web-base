import { CheckCircleOutlined, CloseCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space, Table, Tabs, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

const UmiDoc: React.FC = () => {
  // 版本对比数据
  const comparisonData = [
    {
      key: '1',
      aspect: '构建工具',
      umi3: 'Webpack 5',
      umi4: 'Vite',
      umiMax: 'Vite + 企业级配置',
      winner: 'umi4',
    },
    {
      key: '2',
      aspect: '开发体验',
      umi3: '传统 Webpack 开发体验',
      umi4: '极速热更新',
      umiMax: '极速 + 企业级工具',
      winner: 'umiMax',
    },
    {
      key: '3',
      aspect: '插件生态',
      umi3: '丰富且成熟',
      umi4: '全新架构，逐步完善',
      umiMax: '内置企业级插件',
      winner: 'umi3',
    },
    {
      key: '4',
      aspect: '稳定性',
      umi3: '久经考验，稳定可靠',
      umi4: '相对较新，持续优化',
      umiMax: '基于UMI4，企业级稳定',
      winner: 'umi3',
    },
    {
      key: '5',
      aspect: '学习成本',
      umi3: '中等',
      umi4: '较低',
      umiMax: '中等偏高',
      winner: 'umi4',
    },
    {
      key: '6',
      aspect: '适用场景',
      umi3: '中小型项目',
      umi4: '现代化项目',
      umiMax: '企业级应用',
      winner: 'tie',
    },
  ];

  const columns = [
    {
      title: '对比维度',
      dataIndex: 'aspect',
      key: 'aspect',
      width: 120,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'UMI 3.x',
      dataIndex: 'umi3',
      key: 'umi3',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'umi3' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {(record.winner === 'umi4' || record.winner === 'umiMax') && (
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
          )}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'UMI 4.x',
      dataIndex: 'umi4',
      key: 'umi4',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'umi4' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {(record.winner === 'umi3' || record.winner === 'umiMax') && (
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
          )}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'UMI Max',
      dataIndex: 'umiMax',
      key: 'umiMax',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'umiMax' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {(record.winner === 'umi3' || record.winner === 'umi4') && (
            <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
          )}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: 'UMI 3.x',
      children: (
        <Card>
          <Title level={4}>🛠️ 主要特点</Title>
          <ul>
            <li>
              <Text strong>构建工具：</Text>基于 Webpack 5 构建
            </li>
            <li>
              <Text strong>语言支持：</Text>支持 TypeScript
            </li>
            <li>
              <Text strong>路由系统：</Text>内置路由系统
            </li>
            <li>
              <Text strong>架构设计：</Text>插件化架构
            </li>
            <li>
              <Text strong>渲染方式：</Text>支持 SSR
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>约定式路由：</Text>基于文件系统的路由约定
            </li>
            <li>
              <Text strong>插件系统：</Text>丰富的插件生态
            </li>
            <li>
              <Text strong>数据流方案：</Text>内置 dva 数据流
            </li>
            <li>
              <Text strong>国际化方案：</Text>完整的 i18n 支持
            </li>
            <li>
              <Text strong>权限管理：</Text>内置权限控制系统
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="orange">稳定项目</Tag>
            <Tag color="orange">中小型应用</Tag>
            <Tag color="orange">传统企业项目</Tag>
            <Tag color="orange">对稳定性要求高</Tag>
          </Space>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'UMI 4.x',
      children: (
        <Card>
          <Title level={4}>🚀 主要特点</Title>
          <ul>
            <li>
              <Text strong>构建工具：</Text>基于 Vite 构建
            </li>
            <li>
              <Text strong>开发体验：</Text>更快的开发体验
            </li>
            <li>
              <Text strong>包体积：</Text>更小的包体积
            </li>
            <li>
              <Text strong>TypeScript：</Text>更好的 TypeScript 支持
            </li>
            <li>
              <Text strong>插件系统：</Text>全新的插件系统
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>构建系统：</Text>基于 Vite 的构建系统
            </li>
            <li>
              <Text strong>插件生态：</Text>全新的插件系统（@umijs/plugins）
            </li>
            <li>
              <Text strong>路由改进：</Text>改进的路由系统
            </li>
            <li>
              <Text strong>开发工具：</Text>更好的开发体验
            </li>
            <li>
              <Text strong>工具链：</Text>更现代的构建工具链
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="blue">现代化项目</Tag>
            <Tag color="blue">快速开发</Tag>
            <Tag color="blue">新项目首选</Tag>
            <Tag color="blue">性能优先</Tag>
          </Space>
        </Card>
      ),
    },
    {
      key: '3',
      label: 'UMI Max',
      children: (
        <Card>
          <Title level={4}>🏢 主要特点</Title>
          <ul>
            <li>
              <Text strong>定位：</Text>企业级开发框架
            </li>
            <li>
              <Text strong>实践：</Text>内置最佳实践
            </li>
            <li>
              <Text strong>工具链：</Text>完整的开发工具链
            </li>
            <li>
              <Text strong>功能：</Text>丰富的企业级功能
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>数据流：</Text>数据流方案（@umijs/max/dva）
            </li>
            <li>
              <Text strong>权限管理：</Text>权限管理（@umijs/max/access）
            </li>
            <li>
              <Text strong>国际化：</Text>国际化方案（@umijs/max/locale）
            </li>
            <li>
              <Text strong>微前端：</Text>微前端方案（@umijs/max/qiankun）
            </li>
            <li>
              <Text strong>工具链：</Text>完整的开发工具链
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="green">企业级应用</Tag>
            <Tag color="green">复杂业务场景</Tag>
            <Tag color="green">团队协作</Tag>
            <Tag color="green">全栈解决方案</Tag>
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', margin: '0 auto' }}>
      <Title level={1}>UMI 框架版本对比与使用指南</Title>

      <Alert
        message="版本选择建议"
        description="选择合适的 UMI 版本需要考虑项目规模、团队技术栈、开发效率等多个因素，建议根据实际需求进行选择。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 核心对比 */}
      <Card title="📊 版本核心对比" style={{ marginBottom: 24 }}>
        <Table dataSource={comparisonData} columns={columns} pagination={false} size="middle" />
      </Card>

      {/* 详细介绍 */}
      <Card title="📋 详细版本介绍" style={{ marginBottom: 24 }}>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>

      <Divider />

      {/* 详细分析 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="🎯 UMI 3.x" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>生态成熟：</Text>插件生态丰富且稳定
              </li>
              <li>
                <Text strong>久经考验：</Text>大量项目使用，稳定可靠
              </li>
              <li>
                <Text strong>文档完善：</Text>详细的文档和社区支持
              </li>
              <li>
                <Text strong>工具链：</Text>完整的开发工具链
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">构建速度：</Text>基于 Webpack，构建较慢
              </li>
              <li>
                <Text type="secondary">开发体验：</Text>热更新效率相对较低
              </li>
              <li>
                <Text type="secondary">包体积：</Text>打包产物相对较大
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="⚡ UMI 4.x" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>极速构建：</Text>基于 Vite，构建速度极快
              </li>
              <li>
                <Text strong>开发体验：</Text>HMR 热更新体验优秀
              </li>
              <li>
                <Text strong>现代化：</Text>拥抱现代前端工具链
              </li>
              <li>
                <Text strong>轻量化：</Text>更小的运行时开销
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">生态建设：</Text>插件生态仍在完善中
              </li>
              <li>
                <Text type="secondary">稳定性：</Text>相对较新，持续迭代中
              </li>
              <li>
                <Text type="secondary">迁移成本：</Text>从 UMI 3 迁移需要适配
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="🏢 UMI Max" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>企业级：</Text>内置企业级最佳实践
              </li>
              <li>
                <Text strong>开箱即用：</Text>丰富的内置功能
              </li>
              <li>
                <Text strong>全栈能力：</Text>前后端一体化解决方案
              </li>
              <li>
                <Text strong>团队协作：</Text>适合大型团队开发
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">学习成本：</Text>
                功能丰富，需要学习更多概念
              </li>
              <li>
                <Text type="secondary">复杂度：</Text>对简单项目可能过于复杂
              </li>
              <li>
                <Text type="secondary">定制性：</Text>高度集成可能限制定制空间
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 技术对比 */}
      <Card title="⚙️ 技术特性对比" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>构建性能</Title>
            <Paragraph>
              <Text strong>UMI 3.x：</Text>
              <br />
              • Webpack 5 构建
              <br />
              • 成熟的构建优化
              <br />
              • 支持增量构建
              <br />
              <br />
              <Text strong>UMI 4.x：</Text>
              <br />
              • Vite 极速构建
              <br />
              • 原生 ESM 支持
              <br />
              • 开发时按需编译
              <br />
              <br />
              <Text strong>UMI Max：</Text>
              <br />
              • 基于 UMI 4.x
              <br />
              • 企业级构建优化
              <br />• 内置性能监控
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>开发体验</Title>
            <Paragraph>
              <Text strong>UMI 3.x：</Text>
              <br />
              • 传统热更新
              <br />
              • 丰富的插件支持
              <br />
              • 成熟的开发工具
              <br />
              <br />
              <Text strong>UMI 4.x：</Text>
              <br />
              • 极速热更新
              <br />
              • 现代化开发体验
              <br />
              • 更好的错误提示
              <br />
              <br />
              <Text strong>UMI Max：</Text>
              <br />
              • 企业级开发工具
              <br />
              • 内置调试工具
              <br />• 团队协作功能
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>功能特性</Title>
            <Paragraph>
              <Text strong>UMI 3.x：</Text>
              <br />
              • 约定式路由
              <br />
              • 插件化架构
              <br />
              • 内置数据流
              <br />
              <br />
              <Text strong>UMI 4.x：</Text>
              <br />
              • 全新插件系统
              <br />
              • 改进的路由系统
              <br />
              • 更好的 TypeScript 支持
              <br />
              <br />
              <Text strong>UMI Max：</Text>
              <br />
              • 企业级功能集成
              <br />
              • 微前端支持
              <br />• 完整解决方案
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 选择建议 */}
      <Card title="💡 选择建议">
        <Title level={4}>选择 UMI 3.x 如果：</Title>
        <ul>
          <li>项目对稳定性要求极高</li>
          <li>团队已熟悉 UMI 3.x 开发模式</li>
          <li>需要使用特定的 UMI 3.x 插件</li>
          <li>项目规模较大，需要久经考验的方案</li>
          <li>对构建速度要求不是特别高</li>
        </ul>

        <Title level={4}>选择 UMI 4.x 如果：</Title>
        <ul>
          <li>新项目，追求现代化开发体验</li>
          <li>对构建速度和开发体验要求较高</li>
          <li>团队对新技术接受度较高</li>
          <li>项目规模中等，注重开发效率</li>
          <li>希望使用最新的前端工具链</li>
        </ul>

        <Title level={4}>选择 UMI Max 如果：</Title>
        <ul>
          <li>开发企业级大型应用</li>
          <li>需要完整的前后端解决方案</li>
          <li>团队规模较大，需要统一的开发规范</li>
          <li>项目需要微前端、国际化等企业级功能</li>
          <li>希望开箱即用的最佳实践</li>
        </ul>

        <Alert
          message="最终建议"
          description="选择 UMI 版本应基于项目具体需求、团队技术能力和长期维护考虑。新项目推荐 UMI 4.x 或 UMI Max，现有项目可根据实际情况决定是否升级。"
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default UmiDoc;
