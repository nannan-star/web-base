import { BugOutlined, SafetyOutlined } from '@ant-design/icons';
import { Alert, Card, Col, Divider, Row, Space, Table, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Paragraph, Text } = Typography;

// 类型定义
// interface FallbackProps {
//   error: Error;
//   resetErrorBoundary: (...args: Array<unknown>) => void;
// }

// interface ErrorBoundaryProps {
//   FallbackComponent?: React.ComponentType<FallbackProps>;
//   fallbackRender?: (props: FallbackProps) => React.ReactNode;
//   onError?: (error: Error, info: { componentStack: string }) => void;
//   onReset?: () => void;
//   resetKeys?: Array<any>;
//   children: React.ReactNode;
// }

// // 模拟 ErrorBoundary 组件（实际使用时需要导入真实的库）
// const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
//   return <div>{children}</div>;
// };

// // 模拟 useErrorBoundary Hook
// const useErrorBoundary = () => {
//   return {
//     showBoundary: (error: Error) => {
//       console.error('Error boundary triggered:', error);
//     },
//   };
// };

const ErrorBoundaryGuide: React.FC = () => {
  // 功能特性对比
  const featureComparison = [
    {
      key: '1',
      feature: '错误捕获',
      nativeErrorBoundary: '仅捕获子组件错误',
      reactErrorBoundary: '增强的错误捕获机制',
      winner: 'react-error-boundary',
    },
    {
      key: '2',
      feature: '错误恢复',
      nativeErrorBoundary: '需要手动实现恢复逻辑',
      reactErrorBoundary: '内置 resetErrorBoundary 方法',
      winner: 'react-error-boundary',
    },
    {
      key: '3',
      feature: '重置机制',
      nativeErrorBoundary: '无内置重置功能',
      reactErrorBoundary: '支持 resetKeys 自动重置',
      winner: 'react-error-boundary',
    },
    {
      key: '4',
      feature: '错误上报',
      nativeErrorBoundary: '需要额外配置',
      reactErrorBoundary: '内置 onError 回调',
      winner: 'react-error-boundary',
    },
    {
      key: '5',
      feature: 'TypeScript',
      nativeErrorBoundary: '需要自定义类型定义',
      reactErrorBoundary: '完整的 TypeScript 支持',
      winner: 'react-error-boundary',
    },
    {
      key: '6',
      feature: '开发体验',
      nativeErrorBoundary: '配置复杂，代码冗长',
      reactErrorBoundary: 'API 简洁，开箱即用',
      winner: 'react-error-boundary',
    },
  ];

  const columns = [
    {
      title: '功能特性',
      dataIndex: 'feature',
      key: 'feature',
      width: 120,
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: '原生 ErrorBoundary',
      dataIndex: 'nativeErrorBoundary',
      key: 'nativeErrorBoundary',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'nativeErrorBoundary' && <SafetyOutlined style={{ color: '#52c41a' }} />}
          {record.winner === 'react-error-boundary' && <BugOutlined style={{ color: '#ff4d4f' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'react-error-boundary',
      dataIndex: 'reactErrorBoundary',
      key: 'reactErrorBoundary',
      render: (text: string, record: any) => (
        <Space>
          {record.winner === 'react-error-boundary' && <SafetyOutlined style={{ color: '#52c41a' }} />}
          {record.winner === 'nativeErrorBoundary' && <BugOutlined style={{ color: '#ff4d4f' }} />}
          <span>{text}</span>
        </Space>
      ),
    },
  ];

  // 核心 Props 说明
  const propsData = [
    {
      prop: 'FallbackComponent',
      type: 'React.ComponentType<FallbackProps>',
      description: '错误时显示的组件',
      required: false,
    },
    {
      prop: 'fallbackRender',
      type: '(props: FallbackProps) => ReactNode',
      description: '替代组件的渲染函数',
      required: false,
    },
    {
      prop: 'onError',
      type: '(error: Error, info: { componentStack: string }) => void',
      description: '错误捕获回调函数',
      required: false,
    },
    {
      prop: 'onReset',
      type: '() => void',
      description: '重置时触发的回调',
      required: false,
    },
    {
      prop: 'resetKeys',
      type: 'Array<any>',
      description: '变化时会触发重置的依赖数组',
      required: false,
    },
  ];

  const propsColumns = [
    {
      title: '属性名',
      dataIndex: 'prop',
      key: 'prop',
      width: 150,
      render: (text: string) => <Text code>{text}</Text>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 200,
      render: (text: string) => <Text type="secondary">{text}</Text>,
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '必填',
      dataIndex: 'required',
      key: 'required',
      width: 80,
      render: (required: boolean) => <Tag color={required ? 'red' : 'green'}>{required ? '是' : '否'}</Tag>,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={1}>
        <BugOutlined style={{ marginRight: 8 }} />
        React Error Boundary 完整指南
      </Title>

      <Alert
        message="官方推荐"
        description="react-error-boundary 是 React 官方推荐的错误边界解决方案，相比自定义实现更完善且易用。"
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      {/* 功能对比 */}
      <Card title="📊 功能特性对比" style={{ marginBottom: 24 }}>
        <Table dataSource={featureComparison} columns={columns} pagination={false} size="middle" />
      </Card>

      {/* 安装和基础用法 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="📦 安装" style={{ height: '100%' }}>
            <Title level={4}>NPM</Title>
            <Paragraph>
              <Text code>npm install react-error-boundary</Text>
            </Paragraph>

            <Title level={4}>Yarn</Title>
            <Paragraph>
              <Text code>yarn add react-error-boundary</Text>
            </Paragraph>

            <Title level={4}>PNPM</Title>
            <Paragraph>
              <Text code>pnpm add react-error-boundary</Text>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="🚀 基础用法" style={{ height: '100%' }}>
            <Title level={4}>基本封装</Title>
            <Paragraph>
              <Text code>import ErrorBoundary from react-error-boundary;</Text>
            </Paragraph>

            <Title level={4}>核心特性</Title>
            <ul>
              <li>增强的错误捕获机制</li>
              <li>内置错误恢复功能</li>
              <li>支持自动重置</li>
              <li>完整的 TypeScript 支持</li>
              <li>简洁的 API 设计</li>
            </ul>
          </Card>
        </Col>
      </Row>

      {/* 核心 Props */}
      <Card title="⚙️ 核心 Props 详解" style={{ marginBottom: 24 }}>
        <Table dataSource={propsData} columns={propsColumns} pagination={false} size="middle" />
      </Card>

      {/* 详细分析 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="🎯 基础实现" style={{ height: '100%' }}>
            <Title level={4}>错误回退组件</Title>
            <Paragraph>
              <Text code>
                {`function ErrorFallback({ error, resetErrorBoundary }: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <h3>出错了</h3>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>重试</button>
    </div>
  );
}`}
              </Text>
            </Paragraph>

            <Title level={4}>基本使用</Title>
            <Paragraph>
              <Text code>
                {
                  'function App() {\n  return (\n    <ErrorBoundary\n      FallbackComponent={ErrorFallback}\n      onReset={() => window.location.reload()}\n    >\n      <YourComponent />\n    </ErrorBoundary>\n  );\n}'
                }
              </Text>
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="🔄 错误恢复机制" style={{ height: '100%' }}>
            <Title level={4}>局部恢复</Title>
            <Paragraph>
              <Text code>
                {
                  'function Example() {\n  const [shouldFail, setShouldFail] = useState(false);\n  \n  return (\n    <ErrorBoundary\n      FallbackComponent={ErrorFallback}\n      onReset={() => setShouldFail(false)}\n      resetKeys={[shouldFail]}\n    >\n      {shouldFail ? <BuggyComponent /> : \n       <button onClick={() => setShouldFail(true)}>触发错误</button>}\n    </ErrorBoundary>\n  );\n}'
                }
              </Text>
            </Paragraph>

            <Title level={4}>自动重置</Title>
            <Paragraph>
              通过 <Text code>resetKeys</Text> 实现依赖变化时的自动重置，无需手动调用重置函数。
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      {/* UmiMax 集成方案 */}
      <Card title="🔧 UmiMax 集成方案" style={{ marginBottom: 24 }}>
        <Row gutter={[24, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>全局错误边界</Title>
            <Paragraph>
              <Text code>
                {
                  '// app.tsx\nexport function rootContainer(container: React.ReactNode) {\n  return (\n    <ErrorBoundary FallbackComponent={GlobalErrorFallback}>\n      {container}\n    </ErrorBoundary>\n  );\n}'
                }
              </Text>
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>路由级错误边界</Title>
            <Paragraph>
              <Text code>
                {
                  "// config/routes.ts\nexport default [\n  {\n    path: '/user',\n    component: '@/pages/User',\n    errorBoundary: '@/components/UserErrorBoundary'\n  }\n]"
                }
              </Text>
            </Paragraph>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>API 请求错误处理</Title>
            <Paragraph>
              <Text code>
                {
                  "import { useErrorBoundary } from 'react-error-boundary';\n\nfunction UserProfile() {\n  const { showBoundary } = useErrorBoundary();\n\n  const fetchData = async () => {\n    try {\n      await fetch('/api/user');\n    } catch (err) {\n      showBoundary(err);\n    }\n  };\n}"
                }
              </Text>
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 高级用法 */}
      <Card title="🚀 高级用法" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card title="🔗 嵌套边界" size="small">
              <Paragraph>
                <Text code>
                  {
                    '<ErrorBoundary FallbackComponent={ParentFallback}>\n  <ComponentA />\n  <ErrorBoundary FallbackComponent={ChildFallback}>\n    <ComponentB />\n  </ErrorBoundary>\n</ErrorBoundary>'
                  }
                </Text>
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="📊 错误上报集成" size="small">
              <Paragraph>
                <Text code>
                  {
                    "<ErrorBoundary\n  onError={(error, info) => {\n    Sentry.captureException(error, { extra: { info } });\n    fetch('/log-error', { \n      method: 'POST',\n      body: JSON.stringify({ error: error.stack, componentStack: info.componentStack })\n    });\n  }}\n>\n  <App />\n</ErrorBoundary>"
                  }
                </Text>
              </Paragraph>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col xs={24} lg={12}>
            <Card title="🔄 重置依赖示例" size="small">
              <Paragraph>
                <Text code>
                  {
                    'function ProductPage({ productId }: { productId: string }) {\n  return (\n    <ErrorBoundary\n      FallbackComponent={ErrorFallback}\n      resetKeys={[productId]}\n    >\n      <ProductDetails productId={productId} />\n    </ErrorBoundary>\n  );\n}'
                  }
                </Text>
              </Paragraph>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="🎣 异步错误捕获 Hook" size="small">
              <Paragraph>
                <Text code>
                  {
                    'export function useAsyncTask() {\n  const { showBoundary } = useErrorBoundary();\n\n  const runSafe = async <T,>(task: Promise<T>): Promise<T | undefined> => {\n    try {\n      return await task;\n    } catch (error) {\n      showBoundary(error);\n    }\n  };\n\n  return { runSafe };\n}'
                  }
                </Text>
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 实用工具 */}
      <Card title="🛠️ 实用工具函数" style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Title level={4}>通用错误回退组件</Title>
            <Paragraph>
              <Text code>
                {
                  'export function ErrorFallback({\n  error,\n  resetErrorBoundary,\n  customMessage\n}: {\n  error: Error;\n  resetErrorBoundary: () => void;\n  customMessage?: string;\n}) {\n  return (\n    <div className="error-fallback">\n      <Alert type="error" \n        message={customMessage || \'发生错误\'} \n        description={<pre>{error.message}</pre>}\n      />\n      <Space>\n        <Button onClick={resetErrorBoundary}>重试</Button>\n        <Button onClick={() => window.location.reload()}>刷新页面</Button>\n      </Space>\n    </div>\n  );\n}'
                }
              </Text>
            </Paragraph>
          </Col>

          <Col xs={24} lg={12}>
            <Title level={4}>TypeScript 类型定义</Title>
            <Paragraph>
              <Text code>
                {
                  'interface FallbackProps {\n  error: Error;\n  resetErrorBoundary: (...args: Array<unknown>) => void;\n}\n\ninterface ErrorBoundaryProps {\n  FallbackComponent?: React.ComponentType<FallbackProps>;\n  fallbackRender?: (props: FallbackProps) => ReactNode;\n  onError?: (error: Error, info: { componentStack: string }) => void;\n  onReset?: () => void;\n  resetKeys?: Array<any>;\n}'
                }
              </Text>
            </Paragraph>
          </Col>
        </Row>
      </Card>

      {/* 最佳实践 */}
      <Card title="💡 最佳实践建议">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Title level={4}>分层处理</Title>
            <ul>
              <li>全局边界处理意外崩溃</li>
              <li>路由边界处理页面级错误</li>
              <li>组件边界处理关键UI部分</li>
            </ul>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>错误恢复</Title>
            <ul>
              <li>简单场景：resetErrorBoundary 局部恢复</li>
              <li>复杂状态：通过 resetKeys 自动重置</li>
              <li>彻底失败：引导用户刷新页面</li>
            </ul>
          </Col>

          <Col xs={24} md={8}>
            <Title level={4}>开发体验</Title>
            <ul>
              <li>开发环境显示详细错误</li>
              <li>生产环境提供用户友好的错误信息</li>
              <li>集成错误监控和上报</li>
            </ul>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>环境适配示例</Title>
        <Paragraph>
          <Text code>
            {
              "<ErrorBoundary\n  FallbackComponent={process.env.NODE_ENV === 'development' ? \n    DevErrorFallback : ProdErrorFallback}\n>\n  <App />\n</ErrorBoundary>"
            }
          </Text>
        </Paragraph>

        <Alert
          message="总结"
          description="通过合理配置，react-error-boundary 可以覆盖 90% 以上的 React 错误处理场景，比原生 ErrorBoundary 更灵活强大。建议在项目中统一使用此库来处理错误边界。"
          type="success"
          showIcon
          style={{ marginTop: 16 }}
        />
      </Card>
    </div>
  );
};

export default ErrorBoundaryGuide;
