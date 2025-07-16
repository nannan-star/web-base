import { CheckCircleOutlined, CloseCircleOutlined, StarOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space, Table, Tabs, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

const PackageManagerDoc: React.FC = () => {
  // 包管理器对比数据
  const comparisonData = [
    {
      key: '1',
      aspect: '安装速度',
      npm: '相对较慢',
      yarn: '中等',
      pnpm: '最快',
      winner: 'pnpm',
    },
    {
      key: '2',
      aspect: '磁盘空间',
      npm: '占用较多',
      yarn: '占用较多',
      pnpm: '节省显著',
      winner: 'pnpm',
    },
    {
      key: '3',
      aspect: '幽灵依赖',
      npm: '存在问题',
      yarn: '存在问题',
      pnpm: '完全解决',
      winner: 'pnpm',
    },
    {
      key: '4',
      aspect: '社区支持',
      npm: '最广泛',
      yarn: '广泛',
      pnpm: '快速增长',
      winner: 'npm',
    },
    {
      key: '5',
      aspect: 'Monorepo',
      npm: '基础支持',
      yarn: '良好支持',
      pnpm: '原生优秀',
      winner: 'pnpm',
    },
    {
      key: '6',
      aspect: '学习成本',
      npm: '最低',
      yarn: '较低',
      pnpm: '中等',
      winner: 'npm',
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
      title: 'NPM',
      dataIndex: 'npm',
      key: 'npm',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'npm' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {record.winner !== 'npm' && record.winner !== 'tie' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Yarn',
      dataIndex: 'yarn',
      key: 'yarn',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'yarn' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {record.winner !== 'yarn' && record.winner !== 'tie' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'PNPM',
      dataIndex: 'pnpm',
      key: 'pnpm',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'pnpm' && <CheckCircleOutlined style={{ color: '#52c41a' }} />}
          {record.winner !== 'pnpm' && record.winner !== 'tie' && <CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          {record.winner === 'tie' && <StarOutlined style={{ color: '#faad14' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: 'NPM',
      children: (
        <Card>
          <Title level={4}>📦 主要特点</Title>
          <ul>
            <li>
              <Text strong>默认包管理器：</Text>Node.js 自带，无需额外安装
            </li>
            <li>
              <Text strong>生态系统：</Text>拥有最大的 JavaScript 包仓库
            </li>
            <li>
              <Text strong>社区支持：</Text>社区支持度最高，文档丰富
            </li>
            <li>
              <Text strong>配置简单：</Text>易于上手，配置简单直观
            </li>
            <li>
              <Text strong>兼容性：</Text>与各种工具和平台兼容性最好
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>包管理：</Text>基础的包安装、更新、卸载功能
            </li>
            <li>
              <Text strong>脚本运行：</Text>npm scripts 运行项目脚本
            </li>
            <li>
              <Text strong>版本管理：</Text>语义化版本控制
            </li>
            <li>
              <Text strong>发布包：</Text>简单的包发布流程
            </li>
            <li>
              <Text strong>工作空间：</Text>基础的 workspaces 支持
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="red">新手入门</Tag>
            <Tag color="red">传统项目</Tag>
            <Tag color="red">简单应用</Tag>
            <Tag color="red">兼容性优先</Tag>
          </Space>
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Yarn',
      children: (
        <Card>
          <Title level={4}>🧶 主要特点</Title>
          <ul>
            <li>
              <Text strong>并行安装：</Text>多包并行下载，提升安装速度
            </li>
            <li>
              <Text strong>确定性安装：</Text>yarn.lock 确保环境一致性
            </li>
            <li>
              <Text strong>离线模式：</Text>支持从本地缓存安装包
            </li>
            <li>
              <Text strong>安全性：</Text>包完整性验证，提升安全性
            </li>
            <li>
              <Text strong>友好输出：</Text>更清晰的命令行输出信息
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>快速安装：</Text>优化的依赖解析和安装算法
            </li>
            <li>
              <Text strong>锁文件：</Text>yarn.lock 保证依赖版本一致
            </li>
            <li>
              <Text strong>工作空间：</Text>良好的 monorepo 支持
            </li>
            <li>
              <Text strong>PnP模式：</Text>Plug&apos;n&apos;Play 零安装模式
            </li>
            <li>
              <Text strong>缓存机制：</Text>全局缓存减少重复下载
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="blue">中型项目</Tag>
            <Tag color="blue">团队协作</Tag>
            <Tag color="blue">CI/CD 流程</Tag>
            <Tag color="blue">性能优化</Tag>
          </Space>
        </Card>
      ),
    },
    {
      key: '3',
      label: 'PNPM',
      children: (
        <Card>
          <Title level={4}>⚡ 主要特点</Title>
          <ul>
            <li>
              <Text strong>内容寻址：</Text>所有依赖只存储一次，硬链接复用
            </li>
            <li>
              <Text strong>严格依赖：</Text>彻底解决幽灵依赖问题
            </li>
            <li>
              <Text strong>极速安装：</Text>特别是在有缓存时速度最快
            </li>
            <li>
              <Text strong>节省空间：</Text>显著减少磁盘空间占用
            </li>
            <li>
              <Text strong>Monorepo：</Text>原生优秀的 monorepo 支持
            </li>
          </ul>

          <Title level={4}>⚡ 核心功能</Title>
          <ul>
            <li>
              <Text strong>符号链接：</Text>通过符号链接管理依赖关系
            </li>
            <li>
              <Text strong>工作空间：</Text>强大的 workspace 功能
            </li>
            <li>
              <Text strong>过滤运行：</Text>灵活的包过滤和运行机制
            </li>
            <li>
              <Text strong>依赖提升：</Text>智能的依赖提升策略
            </li>
            <li>
              <Text strong>版本管理：</Text>精确的版本锁定机制
            </li>
          </ul>

          <Title level={4}>适用场景</Title>
          <Space direction="vertical">
            <Tag color="green">大型项目</Tag>
            <Tag color="green">Monorepo</Tag>
            <Tag color="green">性能敏感</Tag>
            <Tag color="green">现代化项目</Tag>
          </Space>
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px', margin: '0 auto' }}>
      <Title level={1}>包管理器对比与选择指南</Title>

      <Alert
        message="选择建议"
        description="选择包管理器时应考虑项目规模、团队习惯、性能要求等多个因素，没有绝对的最佳选择，关键是找到最适合的工具。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 核心对比 */}
      <Card title="📊 核心特性对比" style={{ marginBottom: 24 }}>
        <Table dataSource={comparisonData} columns={columns} pagination={false} size="middle" />
      </Card>

      {/* 详细介绍 */}
      <Card title="📋 详细功能介绍" style={{ marginBottom: 24 }}>
        <Tabs defaultActiveKey="1" items={items} />
      </Card>

      <Divider />

      {/* 详细分析 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="📦 NPM" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>默认选择：</Text>Node.js 内置，无需额外安装
              </li>
              <li>
                <Text strong>生态最大：</Text>拥有最大的包仓库
              </li>
              <li>
                <Text strong>兼容性好：</Text>与所有工具和平台兼容
              </li>
              <li>
                <Text strong>学习成本：</Text>最容易上手
              </li>
              <li>
                <Text strong>社区支持：</Text>文档和教程最丰富
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">安装速度：</Text>相对较慢，尤其是大项目
              </li>
              <li>
                <Text type="secondary">空间占用：</Text>依赖重复安装，占用空间大
              </li>
              <li>
                <Text type="secondary">幽灵依赖：</Text>存在依赖地狱问题
              </li>
              <li>
                <Text type="secondary">锁文件：</Text>package-lock.json 容易冲突
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="🧶 Yarn" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>安装速度：</Text>并行安装，速度较快
              </li>
              <li>
                <Text strong>确定性：</Text>yarn.lock 确保环境一致
              </li>
              <li>
                <Text strong>离线安装：</Text>支持离线模式安装
              </li>
              <li>
                <Text strong>用户体验：</Text>命令行输出更友好
              </li>
              <li>
                <Text strong>安全性：</Text>包完整性校验
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">额外安装：</Text>需要单独安装和维护
              </li>
              <li>
                <Text type="secondary">版本差异：</Text>Yarn 1.x 和 2.x 差异较大
              </li>
              <li>
                <Text type="secondary">幽灵依赖：</Text>仍然存在幽灵依赖问题
              </li>
              <li>
                <Text type="secondary">兼容性：</Text>某些场景与 npm 不兼容
              </li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="⚡ PNPM" style={{ height: '100%' }}>
            <Title level={4}>优势</Title>
            <ul>
              <li>
                <Text strong>极速安装：</Text>最快的安装速度
              </li>
              <li>
                <Text strong>节省空间：</Text>硬链接机制大幅节省空间
              </li>
              <li>
                <Text strong>严格依赖：</Text>彻底解决幽灵依赖
              </li>
              <li>
                <Text strong>Monorepo：</Text>原生优秀的多包管理
              </li>
              <li>
                <Text strong>现代化：</Text>设计理念最先进
              </li>
            </ul>

            <Title level={4}>劣势</Title>
            <ul>
              <li>
                <Text type="secondary">兼容性：</Text>部分老项目可能不兼容
              </li>
              <li>
                <Text type="secondary">学习成本：</Text>概念相对复杂一些
              </li>
              <li>
                <Text type="secondary">社区规模：</Text>社区相对较小
              </li>
              <li>
                <Text type="secondary">符号链接：</Text>某些环境不支持符号链接
              </li>
            </ul>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* 技术对比 */}
      <Card title="⚙️ 技术特性详细对比" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>存储机制</Title>
            <Paragraph>
              <Text strong>NPM：</Text>
              <br />
              • 扁平化 node_modules
              <br />
              • 依赖可能重复安装
              <br />
              • 容易产生幽灵依赖
              <br />
              <br />
              <Text strong>Yarn：</Text>
              <br />
              • 扁平化 node_modules
              <br />
              • 优化的依赖解析
              <br />
              • 全局缓存机制
              <br />
              <br />
              <Text strong>PNPM：</Text>
              <br />
              • 内容寻址存储
              <br />
              • 硬链接 + 符号链接
              <br />• 严格的依赖隔离
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>性能表现</Title>
            <Paragraph>
              <Text strong>安装速度：</Text>
              <br />
              PNPM &gt; Yarn &gt; NPM
              <br />
              <br />
              <Text strong>磁盘占用：</Text>
              <br />
              PNPM &lt;&lt; Yarn ≈ NPM
              <br />
              <br />
              <Text strong>内存使用：</Text>
              <br />
              PNPM ≈ Yarn &lt; NPM
              <br />
              <br />
              <Text strong>网络请求：</Text>
              <br />
              PNPM ≈ Yarn &lt; NPM
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>功能特性</Title>
            <Paragraph>
              <Text strong>Monorepo 支持：</Text>
              <br />
              PNPM &gt; Yarn &gt; NPM
              <br />
              <br />
              <Text strong>锁文件机制：</Text>
              <br />
              • NPM: package-lock.json
              <br />
              • Yarn: yarn.lock
              <br />
              • PNPM: pnpm-lock.yaml
              <br />
              <br />
              <Text strong>工作空间：</Text>
              <br />
              PNPM &gt; Yarn &gt;&gt; NPM
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 选择建议 */}
      <Card title="💡 选择建议">
        <Title level={4}>选择 NPM 如果：</Title>
        <ul>
          <li>团队刚接触 Node.js 开发</li>
          <li>项目规模较小，依赖简单</li>
          <li>需要最大的兼容性保证</li>
          <li>希望使用最简单的工具</li>
          <li>CI/CD 环境限制，只能使用 NPM</li>
        </ul>

        <Title level={4}>选择 Yarn 如果：</Title>
        <ul>
          <li>项目需要确定性的依赖安装</li>
          <li>团队对安装速度有一定要求</li>
          <li>使用 Yarn workspaces 管理 monorepo</li>
          <li>需要离线安装功能</li>
          <li>从 NPM 迁移的过渡选择</li>
        </ul>

        <Title level={4}>选择 PNPM 如果：</Title>
        <ul>
          <li>大型项目，对性能和空间敏感</li>
          <li>使用 monorepo 架构</li>
          <li>希望彻底解决幽灵依赖问题</li>
          <li>团队追求最先进的技术方案</li>
          <li>磁盘空间有限制的环境</li>
        </ul>

        <Alert
          message="最终建议"
          description="对于新项目，推荐优先考虑 PNPM，它在性能、空间占用和依赖管理方面都有显著优势。对于现有项目，可以根据实际情况和团队接受度来选择是否迁移。"
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default PackageManagerDoc;
