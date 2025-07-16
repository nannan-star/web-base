/**
 * @file 大屏适配方案对比
 * @description px 转 vw/vh 方案对比 - 手写函数 vs PostCSS 插件
 * @date 2025-01-27
 */
import { saveRefAsImage } from '@/utils/screenshot';
import { BulbOutlined, CheckCircleOutlined, CodeOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button, Card, Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

import styles from './indx.less';

const StyledTitle = styled.h2`
  span {
    margin-right: 8px;
    color: #1890ff;
  }
`;

const ComparisonCard = styled(Card)`
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .ant-card-head {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border-radius: 12px 12px 0 0;

    .ant-card-head-title {
      color: white;
      font-weight: 600;
    }
  }
`;

const CodeBlock = styled.div`
  background: #2d3748;
  border-radius: 8px;
  margin: 16px 0;
  overflow: hidden;
  border-left: 4px solid #3498db;
`;

const HighlightBox = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;

  strong {
    color: #856404;
  }
`;

const ProsConsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin: 20px 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProsCard = styled(Card)`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 8px;

  .ant-card-head {
    background: #28a745;
    color: white;
    border-radius: 8px 8px 0 0;

    .ant-card-head-title {
      color: white;
    }
  }
`;

const ConsCard = styled(Card)`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;

  .ant-card-head {
    background: #dc3545;
    color: white;
    border-radius: 8px 8px 0 0;

    .ant-card-head-title {
      color: white;
    }
  }
`;

const RecommendationBox = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 24px;
  border-radius: 12px;
  margin: 24px 0;
  text-align: center;

  h3 {
    margin-bottom: 12px;
    font-size: 18px;
  }
`;

export default function ScreenAdapter() {
  const contentRef = useRef<HTMLDivElement>(null);

  // 代码高亮配置
  const codeStyle = {
    fontSize: '14px',
    borderRadius: '6px',
    margin: '0',
  };

  // 保存为图片的函数
  const saveAsImage = () => {
    saveRefAsImage(contentRef, {
      filename: 'px-to-vw-comparison.png',
      customMessages: {
        loading: '正在生成大屏适配方案对比截图...',
        success: '大屏适配方案对比截图已保存',
        error: '截图生成失败，请检查是否包含跨域资源',
      },
    });
  };

  // 表格数据
  const conversionTimingData = [
    {
      key: '1',
      solution: '手写函数',
      timing: 'SCSS 编译时',
      stage: '构建过程早期',
    },
    {
      key: '2',
      solution: 'PostCSS 插件',
      timing: 'PostCSS 处理时',
      stage: '构建过程后期',
    },
  ];

  const usageComparisonData = [
    {
      key: '1',
      solution: '手写函数',
      simplicity: '需要手动调用',
      precision: '精确控制',
      learningCost: '中等',
    },
    {
      key: '2',
      solution: 'PostCSS 插件',
      simplicity: '自动转换',
      precision: '全局规则',
      learningCost: '低',
    },
  ];

  const performanceData = [
    {
      key: '1',
      solution: '手写函数',
      compileTime: '快',
      buildComplexity: '简单',
      debugConvenience: '好',
      cssVolume: '较小',
      runtimePerformance: '无计算开销',
    },
    {
      key: '2',
      solution: 'PostCSS 插件',
      compileTime: '中等',
      buildComplexity: '复杂',
      debugConvenience: '中等',
      cssVolume: '较小',
      runtimePerformance: '无计算开销',
    },
  ];

  const actualEffectData = [
    {
      key: '1',
      scenario: '16:10 屏幕\n(1920×1200)',
      solution: '手写函数',
      width: '100vw (1920px)',
      height: '100vh (1200px)',
      effect: '完美适配，无空白',
    },
    {
      key: '2',
      scenario: '16:10 屏幕\n(1920×1200)',
      solution: 'PostCSS 插件',
      width: '100vw (1920px)',
      height: '988px (固定)',
      effect: '底部 212px 空白',
    },
    {
      key: '3',
      scenario: '较小屏幕\n(1366×768)',
      solution: '手写函数',
      width: '100vw (1366px)',
      height: '100vh (768px)',
      effect: '按比例缩放',
    },
    {
      key: '4',
      scenario: '较小屏幕\n(1366×768)',
      solution: 'PostCSS 插件',
      width: '100vw (1366px)',
      height: '988px (固定)',
      effect: '高度超出，需要滚动',
    },
  ];

  return (
    <div className={styles.i18nContainer} ref={contentRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>px 转 vw/vh 方案对比</h1>
        <Button type="primary" icon={<DownloadOutlined />} onClick={saveAsImage} className={styles.downloadButton}>
          保存为图片
        </Button>
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <BulbOutlined />
          <span>概述</span>
        </StyledTitle>
        <p className={styles.paragraph}>
          在响应式开发中，将 px 单位转换为 vw/vh 单位是常见的适配方案。本文档对比两种实现方式：手写 Sass 函数和 PostCSS
          插件，特别针对大屏项目的实际应用场景。
        </p>
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <CodeOutlined />
          <span>两种方案对比</span>
        </StyledTitle>

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>1. 手写 Sass 函数方式</h3>
        <CodeBlock>
          <SyntaxHighlighter language="scss" style={vscDarkPlus} customStyle={codeStyle}>
            {`@use 'sass:math';

// 默认设计稿的宽度
$designWidth: 1920;
// 默认设计稿的高度
$designHeight: 1080;

// px 转为 vw 的函数
@function vw($px) {
  @return math.div($px, $designWidth) * 100vw;
}

// px 转为 vh 的函数
@function vh($px) {
  @return math.div($px, $designHeight) * 100vh;
}`}
          </SyntaxHighlighter>
        </CodeBlock>

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>2. PostCSS 插件方式</h3>
        <CodeBlock>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
            {`module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      unitToConvert: 'px',
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
    },
  },
};`}
          </SyntaxHighlighter>
        </CodeBlock>
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <CodeOutlined />
          <span>核心差异分析</span>
        </StyledTitle>

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>1. 转换时机</h3>
        <Table
          dataSource={conversionTimingData}
          columns={[
            { title: '方案', dataIndex: 'solution', key: 'solution' },
            { title: '转换时机', dataIndex: 'timing', key: 'timing' },
            { title: '处理阶段', dataIndex: 'stage', key: 'stage' },
          ]}
          pagination={false}
          size="small"
          style={{ marginBottom: 24 }}
        />

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>2. 使用方式对比</h3>
        <Table
          dataSource={usageComparisonData}
          columns={[
            { title: '方案', dataIndex: 'solution', key: 'solution' },
            { title: '代码简洁度', dataIndex: 'simplicity', key: 'simplicity' },
            { title: '控制精度', dataIndex: 'precision', key: 'precision' },
            { title: '学习成本', dataIndex: 'learningCost', key: 'learningCost' },
          ]}
          pagination={false}
          size="small"
          style={{ marginBottom: 24 }}
        />
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <BulbOutlined />
          <span>大屏项目适配问题</span>
        </StyledTitle>

        <HighlightBox>
          <strong>问题描述：</strong>在非 16:9 屏幕比例下，PostCSS
          插件方式容易出现内容显示不全、底部出现空白、需要滚动条等问题。
        </HighlightBox>

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>问题根源</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: 24 }}>
          <ComparisonCard title="手写函数：完美适配">
            <CodeBlock>
              <SyntaxHighlighter language="scss" style={vscDarkPlus} customStyle={codeStyle}>
                {`.screen-content {
  height: vh(988); // 988/1080 = 91.48% 的屏幕高度
}`}
              </SyntaxHighlighter>
            </CodeBlock>
          </ComparisonCard>
          <ComparisonCard title="PostCSS插件：可能有问题">
            <CodeBlock>
              <SyntaxHighlighter language="scss" style={vscDarkPlus} customStyle={codeStyle}>
                {`.screen-content {
  height: 988px; // 固定988px，在不同屏幕上比例不同
}`}
              </SyntaxHighlighter>
            </CodeBlock>
          </ComparisonCard>
        </div>

        <h3 style={{ fontSize: '20px', color: '#34495e', margin: '24px 0 16px 0' }}>实际效果对比</h3>
        <Table
          dataSource={actualEffectData}
          columns={[
            { title: '场景', dataIndex: 'scenario', key: 'scenario' },
            { title: '方案', dataIndex: 'solution', key: 'solution' },
            { title: '宽度', dataIndex: 'width', key: 'width' },
            { title: '高度', dataIndex: 'height', key: 'height' },
            { title: '效果', dataIndex: 'effect', key: 'effect' },
          ]}
          pagination={false}
          size="small"
          style={{ marginBottom: 24 }}
        />
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <CodeOutlined />
          <span>解决方案对比</span>
        </StyledTitle>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: 24 }}>
          <ComparisonCard title="手写函数方式（推荐）">
            <CodeBlock>
              <SyntaxHighlighter language="scss" style={vscDarkPlus} customStyle={codeStyle}>
                {`.screen-container {
  width: 100vw;
  height: 100vh;
  background: url('bg.png') no-repeat center center;
  background-size: 100% 100%;
}

.screen-left {
  width: vw(443);
  height: vh(326);
}`}
              </SyntaxHighlighter>
            </CodeBlock>
            <ProsCard title="✅ 优势" size="small">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>完美适配任何屏幕比例</li>
                <li>背景图自适应</li>
                <li>内容始终在可视区域内</li>
                <li>避免滚动条和空白</li>
              </ul>
            </ProsCard>
          </ComparisonCard>
          <ComparisonCard title="PostCSS 插件优化">
            <CodeBlock>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
                {`module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920,
      viewportHeight: 1080,
      unitToConvert: 'px',
      propList: ['*'],
      viewportUnit: 'vw',
      landscape: false,
    },
  },
};`}
              </SyntaxHighlighter>
            </CodeBlock>
            <ConsCard title="❌ 限制" size="small">
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>配置复杂</li>
                <li>可能产生意外转换</li>
                <li>调试困难</li>
              </ul>
            </ConsCard>
          </ComparisonCard>
        </div>
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <BulbOutlined />
          <span>性能考虑</span>
        </StyledTitle>

        <Table
          dataSource={performanceData}
          columns={[
            { title: '方案', dataIndex: 'solution', key: 'solution' },
            { title: '编译时间', dataIndex: 'compileTime', key: 'compileTime' },
            { title: '构建复杂度', dataIndex: 'buildComplexity', key: 'buildComplexity' },
            { title: '调试便利性', dataIndex: 'debugConvenience', key: 'debugConvenience' },
            { title: 'CSS 体积', dataIndex: 'cssVolume', key: 'cssVolume' },
            { title: '运行时性能', dataIndex: 'runtimePerformance', key: 'runtimePerformance' },
          ]}
          pagination={false}
          size="small"
          style={{ marginBottom: 24 }}
        />
      </div>

      <div className={styles.section}>
        <StyledTitle>
          <BulbOutlined />
          <span>适用场景</span>
        </StyledTitle>

        <ProsConsGrid>
          <ProsCard title="手写函数方式适合" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Tag color="success">大屏项目</Tag>
              <Tag color="success">可视化项目</Tag>
              <Tag color="success">需要精确控制的项目</Tag>
              <Tag color="success">团队熟悉 Sass 的项目</Tag>
              <Tag color="success">需要自定义转换逻辑的项目</Tag>
            </Space>
          </ProsCard>
          <ProsCard title="PostCSS 插件适合" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Tag color="blue">通用 Web 项目</Tag>
              <Tag color="blue">希望减少手动工作的项目</Tag>
              <Tag color="blue">团队更倾向于自动化工具的项目</Tag>
              <Tag color="blue">标准响应式布局项目</Tag>
            </Space>
          </ProsCard>
        </ProsConsGrid>
      </div>

      <RecommendationBox>
        <h3>🎯 最佳实践建议</h3>
        <p>
          <strong>大屏项目推荐使用手写函数方式</strong>，确保完美适配任何屏幕比例，避免空白和滚动条问题。
        </p>
      </RecommendationBox>

      <div className={styles.section}>
        <StyledTitle>
          <CheckCircleOutlined />
          <span>总结</span>
        </StyledTitle>
        <p className={styles.paragraph}>对于大屏项目，手写 Sass 函数方式在以下方面优于 PostCSS 插件：</p>
        <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
          <li>
            <strong>完美适配</strong>：支持任何屏幕比例，无空白和滚动条
          </li>
          <li>
            <strong>精确控制</strong>：可以分别控制宽度和高度的转换
          </li>
          <li>
            <strong>背景适配</strong>：配合 <code>background-size: 100% 100%</code> 完美适配
          </li>
          <li>
            <strong>维护性</strong>：逻辑清晰，易于理解和调试
          </li>
          <li>
            <strong>性能</strong>：编译时计算，运行时无额外开销
          </li>
        </ul>
        <p className={styles.paragraph}>
          因此，<strong>大屏项目推荐使用手写函数方式</strong>，而通用 Web 项目可以考虑 PostCSS 插件方式。
        </p>
      </div>

      <div
        style={{
          background: '#2c3e50',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          textAlign: 'center',
          marginTop: '32px',
        }}
      >
        <h3 style={{ marginBottom: '12px', color: '#3498db' }}>技术方案对比总结</h3>
        <p style={{ margin: 0 }}>选择合适的技术方案，让大屏项目在不同设备上都能完美展示</p>
      </div>
    </div>
  );
}
