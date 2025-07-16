import {
  CheckCircleOutlined,
  CodeOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space, Table, Tabs, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text, Link } = Typography;

const CodeStandard: React.FC = () => {
  // 编码规范数据
  const codeStandardData = [
    {
      key: '1',
      tool: 'ESLint',
      purpose: '代码质量检查',
      config: '.eslintrc.js',
      usage: 'max lint --fix --eslint-only',
      status: 'active',
    },
    {
      key: '2',
      tool: 'Prettier',
      purpose: '代码格式化',
      config: '.prettierrc',
      usage: 'prettier --cache --write .',
      status: 'active',
    },
    {
      key: '3',
      tool: 'StyleLint',
      purpose: 'CSS/Less 样式检查',
      config: '.stylelintrc.js',
      usage: 'max lint --fix --stylelint-only',
      status: 'active',
    },
    {
      key: '4',
      tool: 'Husky',
      purpose: 'Git 钩子管理',
      config: '.husky/',
      usage: '自动执行 pre-commit 检查',
      status: 'active',
    },
    {
      key: '5',
      tool: 'lint-staged',
      purpose: '暂存文件检查',
      config: '.lintstagedrc',
      usage: '配合 Husky 使用',
      status: 'active',
    },
    {
      key: '6',
      tool: 'TypeScript',
      purpose: '类型检查',
      config: 'tsconfig.json',
      usage: 'tsc --noEmit',
      status: 'active',
    },
  ];

  /**
   * 开发工具 表头
   */
  const toolColumns = [
    {
      title: '工具名称',
      dataIndex: 'tool',
      key: 'tool',
      render: (text: string) => (
        <Space>
          <ToolOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '功能说明',
      dataIndex: 'purpose',
      key: 'purpose',
    },
    {
      title: '配置文件',
      dataIndex: 'config',
      key: 'config',
      render: (text: string) => (
        <Text code style={{ fontSize: '12px' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '使用命令',
      dataIndex: 'usage',
      key: 'usage',
      render: (text: string) => (
        <Text code style={{ fontSize: '12px' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>{status === 'active' ? '已启用' : '未启用'}</Tag>
      ),
    },
  ];

  /**
   * 命名规范 数据
   */
  const namingRules = [
    {
      key: '1',
      type: '文件/文件夹',
      rule: 'kebab-case',
      example: 'user-profile.tsx, api-service/',
      description: '小写字母，用短横线分隔',
    },
    {
      key: '2',
      type: '组件名',
      rule: 'kebab-case',
      example: 'user-profile, api-service',
      description: '小写字母，用短横线分隔',
    },
    {
      key: '3',
      type: '变量/函数',
      rule: 'camelCase',
      example: 'userName, getUserInfo',
      description: '小驼峰命名法',
    },
    {
      key: '4',
      type: '常量',
      rule: 'SCREAMING_SNAKE_CASE',
      example: 'API_BASE_URL, MAX_RETRY_COUNT',
      description: '全大写，下划线分隔',
    },
    {
      key: '5',
      type: '接口/类型',
      rule: 'PascalCase + 前缀',
      example: 'UserInfo, ApiResponse',
      description: '接口，类型别名',
    },
    {
      key: '6',
      type: 'CSS类名',
      rule: 'kebab-case + BEM',
      example: '.user-card__title--active',
      description: 'BEM 方法论命名',
    },
  ];

  /**
   * 命名规范 表头
   */
  const namingColumns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '命名规则',
      dataIndex: 'rule',
      key: 'rule',
      render: (text: string) => (
        <Tag color="blue" style={{ fontSize: '12px' }}>
          {text}
        </Tag>
      ),
    },
    {
      title: '示例',
      dataIndex: 'example',
      key: 'example',
      render: (text: string) => (
        <Text code style={{ fontSize: '12px' }}>
          {text}
        </Text>
      ),
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  /**
   * 代码规范 开发工具 最佳实践 项目配置
   */
  const tabItems = [
    {
      key: '1',
      label: '代码规范',
      children: (
        <div>
          <Title level={3}>🎯 核心原则</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <CodeOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                <div style={{ marginTop: 8 }}>
                  <Text strong>可读性</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  代码如文档
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <SafetyCertificateOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                <div style={{ marginTop: 8 }}>
                  <Text strong>一致性</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  统一风格
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <SettingOutlined style={{ fontSize: 24, color: '#faad14' }} />
                <div style={{ marginTop: 8 }}>
                  <Text strong>可维护</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  易于修改
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" style={{ textAlign: 'center' }}>
                <FileTextOutlined style={{ fontSize: 24, color: '#f5222d' }} />
                <div style={{ marginTop: 8 }}>
                  <Text strong>标准化</Text>
                </div>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  遵循规范
                </Text>
              </Card>
            </Col>
          </Row>

          <Title level={3}>📝 命名规范</Title>
          <Table
            key="type"
            dataSource={namingRules}
            columns={namingColumns}
            pagination={false}
            size="middle"
            style={{ marginBottom: 24 }}
          />

          <Title level={3}>📂 目录结构规范</Title>
          <Card style={{ marginBottom: 24 }}>
            <pre style={{ padding: 16 }}>
              {`src/
├── components/          # 公共组件
│   ├── ui/             # UI 基础组件
│   └── business/       # 业务组件
├── pages/              # 页面组件
│   ├── doc/           # 文档页面
│   ├── ui/            # UI 展示页面
│   └── [feature]/     # 功能页面
├── services/           # API 服务
├── utils/              # 工具函数
├── hooks/              # 自定义 Hooks
├── types/              # TypeScript 类型定义
├── assets/             # 静态资源
└── styles/             # 全局样式`}
            </pre>
          </Card>

          <Title level={3}>🔧 代码风格</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="✅ 推荐写法" size="small">
                <pre style={{ padding: 12 }}>
                  {`// 组件定义
interface UserProfileProps {
  userId: string;
  onEdit?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  userId, 
  onEdit 
}) => {
  // 使用解构赋值
  const { data, loading } = useUserInfo(userId);
  
  // 早期返回
  if (loading) return <Spin />;
  if (!data) return <Empty />;
  
  return (
    <Card>
      <Title level={3}>{data.name}</Title>
      {onEdit && (
        <Button onClick={onEdit}>编辑</Button>
      )}
    </Card>
  );
};`}
                </pre>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="❌ 不推荐写法" size="small">
                <pre style={{ padding: 12 }}>
                  {`// 避免的写法
const UserProfile = (props) => {
  // 避免直接使用 props
  const userData = useUserInfo(props.userId);
  
  // 避免嵌套过深
  if (userData.loading) {
    return <Spin />;
  } else {
    if (userData.data) {
      return (
        <Card>
          <Title level={3}>
            {userData.data.name}
          </Title>
          {props.onEdit ? (
            <Button onClick={props.onEdit}>
              编辑
            </Button>
          ) : null}
        </Card>
      );
    } else {
      return <Empty />;
    }
  }
};`}
                </pre>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '2',
      label: '开发工具',
      children: (
        <div>
          <Title level={3}>🛠️ 工具配置一览</Title>
          <Table
            key="tool"
            dataSource={codeStandardData}
            columns={toolColumns}
            pagination={false}
            size="middle"
            style={{ marginBottom: 24 }}
          />

          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="ESLint 配置" size="small">
                <Paragraph>ESLint 用于代码质量检查，已集成 Umi Max 官方规则。</Paragraph>
                <Title level={5}>配置文件：.eslintrc.js</Title>
                <pre style={{ padding: 12 }}>
                  {`module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
};`}
                </pre>
                <Title level={5}>常用命令</Title>
                <ul>
                  <li>
                    <Text code>max lint</Text> - 检查所有文件
                  </li>
                  <li>
                    <Text code>max lint --fix</Text> - 自动修复问题
                  </li>
                  <li>
                    <Text code>max lint --eslint-only</Text> - 仅 ESLint 检查
                  </li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Prettier 配置" size="small">
                <Paragraph>Prettier 用于代码格式化，保证代码风格一致。</Paragraph>
                <Title level={5}>配置文件：.prettierrc</Title>
                <pre style={{ padding: 12 }}>
                  {`{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "plugins": [
    "prettier-plugin-organize-imports",
    "prettier-plugin-packagejson"
  ]
}`}
                </pre>
                <Title level={5}>常用命令</Title>
                <ul>
                  <li>
                    <Text code>pnpm prettier --write . 或者 pnpm run format</Text> - 格式化所有文件
                  </li>
                  <li>
                    <Text code>pnpm prettier --check .</Text> - 检查格式
                  </li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Husky + lint-staged" size="small">
                <Paragraph>Git 钩子管理，在提交前自动执行代码检查和格式化。</Paragraph>
                <Title level={5}>配置文件：.lintstagedrc</Title>
                <pre style={{ padding: 12 }}>
                  {`{
  "*.{md,json}": ["prettier --cache --write"],
  "*.{js,jsx}": [
    "max lint --fix --eslint-only",
    "prettier --cache --write"
  ],
  "*.ts?(x)": [
    "max lint --fix --eslint-only", 
    "prettier --cache --parser=typescript --write"
  ]
}`}
                </pre>
                <Title level={5}>工作流程</Title>
                <ul>
                  <li>
                    执行 <Text code>git commit</Text>
                  </li>
                  <li>触发 pre-commit 钩子</li>
                  <li>对暂存文件执行检查和格式化</li>
                  <li>检查通过后完成提交</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="TypeScript 配置" size="small">
                <Paragraph>TypeScript 提供类型检查，提高代码质量和开发体验。</Paragraph>
                <Title level={5}>配置文件：tsconfig.json</Title>
                <pre style={{ padding: 12 }}>
                  {`{
  "extends": "@umijs/max/typings/config"
}`}
                </pre>
                <Title level={5}>类型定义</Title>
                <ul>
                  <li>
                    <Text code>typings.d.ts</Text> - 全局类型声明
                  </li>
                  <li>
                    <Text code>src/types/</Text> - 业务类型定义
                  </li>
                  <li>使用接口定义 Props 和 State</li>
                  <li>为 API 响应定义类型</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '3',
      label: '最佳实践',
      children: (
        <div>
          <Title level={3}>🚀 开发流程</Title>
          <Card style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>1️⃣</div>
                  <Title level={4}>创建分支</Title>
                  <Text code>git checkout -b feature/xxx</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>2️⃣</div>
                  <Title level={4}>开发功能</Title>
                  <Text>遵循编码规范开发</Text>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>3️⃣</div>
                  <Title level={4}>提交代码</Title>
                  <Text>自动执行检查和格式化</Text>
                </Card>
              </Col>
            </Row>
          </Card>

          <Title level={3}>📋 代码审查清单</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="功能性检查" size="small">
                <ul>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 功能是否符合需求
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 边界条件处理
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 错误处理机制
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 性能优化考虑
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 用户体验友好
                  </li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="代码质量检查" size="small">
                <ul>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 命名是否清晰
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 代码是否简洁
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 注释是否充分
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 类型定义完整
                  </li>
                  <li>
                    <CheckCircleOutlined style={{ color: '#52c41a' }} /> 无冗余代码
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>

          <Title level={3}>⚡ 开发技巧</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="组件开发" size="small">
                <ul>
                  <li>单一职责原则</li>
                  <li>合理使用 Props 和 State</li>
                  <li>善用 React Hooks</li>
                  <li>组件解耦和复用</li>
                  <li>性能优化（memo、useMemo）</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="样式管理" size="small">
                <ul>
                  <li>使用 CSS Modules 或 styled-components</li>
                  <li>遵循 BEM 命名规范</li>
                  <li>响应式设计</li>
                  <li>主题色和设计规范</li>
                  <li>避免内联样式</li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="状态管理" size="small">
                <ul>
                  <li>合理选择状态管理方案</li>
                  <li>本地状态 vs 全局状态</li>
                  <li>使用 Umi 的数据流</li>
                  <li>API 数据管理</li>
                  <li>状态持久化</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: '4',
      label: '项目配置',
      children: (
        <div>
          <Title level={3}>⚙️ Umi Max 配置</Title>

          <Card title="核心配置：config/config.ts" style={{ marginBottom: 24 }}>
            <pre style={{ padding: 16 }}>
              {`import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  // Ant Design 集成
  antd: {},
  
  // 数据流
  model: {},
  
  // 初始状态
  initialState: {},
  
  // 请求配置
  request: {},
  
  // styled-components 支持
  styledComponents: {},
  
  // 国际化配置
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
    baseSeparator: '-',
  },
  
  // 布局配置
  layout: {
    title: 'Umi Max基础框架',
  },
  
  // 路由配置
  routes: routes,
  
  // 包管理器
  npmClient: 'pnpm',
});`}
            </pre>
          </Card>

          <Title level={3}>📦 依赖管理</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="核心依赖" size="small">
                <Title level={5}>框架相关</Title>
                <ul>
                  <li>
                    <Text code>@umijs/max</Text> - Umi Max 框架
                  </li>
                  <li>
                    <Text code>antd</Text> - Ant Design 组件库
                  </li>
                  <li>
                    <Text code>@ant-design/icons</Text> - 图标库
                  </li>
                  <li>
                    <Text code>@ant-design/pro-components</Text> - Pro 组件
                  </li>
                </ul>

                <Title level={5}>工具库</Title>
                <ul>
                  <li>
                    <Text code>html2canvas</Text> - 截图功能
                  </li>
                  <li>
                    <Text code>react-syntax-highlighter</Text> - 代码高亮
                  </li>
                </ul>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="开发依赖" size="small">
                <Title level={5}>类型定义</Title>
                <ul>
                  <li>
                    <Text code>typescript</Text> - TypeScript 支持
                  </li>
                  <li>
                    <Text code>@types/react</Text> - React 类型
                  </li>
                  <li>
                    <Text code>@types/react-dom</Text> - React DOM 类型
                  </li>
                </ul>

                <Title level={5}>代码质量工具</Title>
                <ul>
                  <li>
                    <Text code>prettier</Text> - 代码格式化
                  </li>
                  <li>
                    <Text code>husky</Text> - Git 钩子
                  </li>
                  <li>
                    <Text code>lint-staged</Text> - 暂存文件检查
                  </li>
                </ul>
              </Card>
            </Col>
          </Row>

          <Title level={3}>🔧 VS Code 配置推荐</Title>
          <Card style={{ marginBottom: 24 }}>
            <Title level={4}>推荐插件</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ul>
                  <li>
                    <Text strong>ES7+ React/Redux/React-Native snippets</Text> - React 代码片段
                  </li>
                  <li>
                    <Text strong>Prettier - Code formatter</Text> - 代码格式化
                  </li>
                  <li>
                    <Text strong>ESLint</Text> - 代码检查
                  </li>
                  <li>
                    <Text strong>Auto Rename Tag</Text> - 标签自动重命名
                  </li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <ul>
                  <li>
                    <Text strong>GitLens</Text> - Git 增强
                  </li>
                  <li>
                    <Text strong>Thunder Client</Text> - API 测试
                  </li>
                  <li>
                    <Text strong>Color Highlight</Text> - 颜色高亮
                  </li>
                  <li>
                    <Text strong>Path Intellisense</Text> - 路径智能提示
                  </li>
                </ul>
              </Col>
            </Row>

            <Title level={4}>工作区配置：.vscode/settings.json</Title>
            <pre style={{ padding: 16 }}>
              {`{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  }
}`}
            </pre>
          </Card>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>Umi Max 脚手架开发编码规范</Title>

      <Alert
        message="规范说明"
        description="本规范基于 Umi Max 框架，结合 Ant Design、TypeScript、ESLint、Prettier 等工具，为团队提供统一的开发标准。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Tabs items={tabItems} size="large" />

      <Divider />

      <Card style={{ marginTop: 24 }}>
        <Title level={3}>📚 相关资源</Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Title level={5}>官方文档</Title>
            <ul>
              <li>
                <Link href="https://umijs.org/" target="_blank">
                  Umi 官方文档
                </Link>
              </li>
              <li>
                <Link href="https://ant.design/" target="_blank">
                  Ant Design 文档
                </Link>
              </li>
              <li>
                <Link href="https://www.typescriptlang.org/" target="_blank">
                  TypeScript 文档
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>工具文档</Title>
            <ul>
              <li>
                <Link href="https://eslint.org/" target="_blank">
                  ESLint 配置
                </Link>
              </li>
              <li>
                <Link href="https://prettier.io/" target="_blank">
                  Prettier 配置
                </Link>
              </li>
              <li>
                <Link href="https://typicode.github.io/husky/" target="_blank">
                  Husky 使用指南
                </Link>
              </li>
            </ul>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>最佳实践</Title>
            <ul>
              <li>
                <Link href="https://react.dev/" target="_blank">
                  React 最佳实践
                </Link>
              </li>
              <li>
                <Link href="https://github.com/airbnb/javascript" target="_blank">
                  Airbnb JavaScript 规范
                </Link>
              </li>
              <li>
                <Link href="https://github.com/typescript-eslint/typescript-eslint" target="_blank">
                  TypeScript ESLint
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default CodeStandard;
