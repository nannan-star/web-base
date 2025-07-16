/**
 * @file 国际化模块 - 全量加载方式
 * @description 全量加载国际化使用说明
 * @date 2025-05-20
 */
import { saveRefAsImage } from '@/utils/screenshot';
import { DownloadOutlined, GlobalOutlined } from '@ant-design/icons';
import { FormattedMessage, getLocale, setLocale, useIntl } from '@umijs/max';
import { Button, Card, Divider, Select, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styled from 'styled-components';

import styles from './indx.less';

const StyledTitle = styled.h2`
  span {
    margin-right: 8px;
    color: ${({ theme }) => theme.titleColor};
  }
`;

export default function I18nFull() {
  const { formatMessage } = useIntl();
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentLocale, setCurrentLocale] = useState(getLocale());
  const [messageCount] = useState(5);
  const [userName, setUserName] = useState('张三');

  // 监听语言变化
  useEffect(() => {
    setCurrentLocale(getLocale());
    // 根据语言切换用户名示例
    setUserName(getLocale() === 'zh-CN' ? '张三' : 'John');
  }, []);

  // 代码高亮配置
  const codeStyle = {
    fontSize: '14px',
    borderRadius: '6px',
    margin: '0',
  };

  // 语言切换处理
  const handleLanguageChange = (lang: string) => {
    setLocale(lang, false);
    setCurrentLocale(lang);
    setUserName(lang === 'zh-CN' ? '张三' : 'John');
  };

  // 保存为图片的函数
  const saveAsImage = () => {
    saveRefAsImage(contentRef, {
      filename: 'i18n-full-guide.png',
      customMessages: {
        loading: '正在生成全量加载国际化指南截图...',
        success: '全量加载国际化指南截图已保存',
        error: '截图生成失败，请检查是否包含跨域资源',
      },
    });
  };

  return (
    <div className={styles.i18nContainer} ref={contentRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>Umi Max 国际化 - 全量加载方式</h1>
        <Button type="primary" icon={<DownloadOutlined />} onClick={saveAsImage} className={styles.downloadButton}>
          保存为图片
        </Button>
      </div>

      {/* 实际演示案例 */}
      <div className={styles.section}>
        <StyledTitle>
          <GlobalOutlined />
          <span>多语言切换实际演示</span>
        </StyledTitle>

        <Card
          title="语言切换演示区域"
          style={{ marginBottom: 24 }}
          extra={
            <Select
              value={currentLocale}
              onChange={handleLanguageChange}
              style={{ width: 120 }}
              options={[
                { value: 'zh-CN', label: '中文' },
                { value: 'en-US', label: 'English' },
              ]}
            />
          }
        >
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            {/* 基础文本演示 */}
            <div>
              <Tag color="blue">基础文本</Tag>
              <div style={{ marginTop: 8 }}>
                <p>{formatMessage({ id: 'common.base' })}</p>
              </div>
            </div>

            <Divider />

            {/* 带参数文本演示 */}
            <div>
              <Tag color="green">带参数文本</Tag>
              <div style={{ marginTop: 8 }}>
                <p>
                  <FormattedMessage id="common.message" values={{ name: userName, count: messageCount }} />
                </p>
              </div>
            </div>

            <Divider />

            {/* 按钮组演示 */}
            <div>
              <Tag color="orange">按钮组</Tag>
              <div style={{ marginTop: 8 }}>
                <Space>
                  <Button type="primary">{formatMessage({ id: 'common.save' })}</Button>
                  <Button>{formatMessage({ id: 'common.cancel' })}</Button>
                  <Button type="dashed">{formatMessage({ id: 'common.confirm' })}</Button>
                </Space>
              </div>
            </div>
          </Space>
        </Card>

        <div className={styles.tips}>
          <div className={styles.tipsTitle}>演示说明</div>
          <p>
            上方演示区域展示了全量加载模式下的多语言切换效果。 切换语言选择器后，所有文本会立即更新，无需等待加载。
            这正是全量加载模式的核心优势 - 所有语言资源在应用启动时已准备就绪。
          </p>
        </div>
      </div>

      {/* 全量加载简介 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>全量加载简介</h2>
        <p className={styles.paragraph}>
          全量加载是最常见的国际化实现方式，在应用启动时一次性加载所有语言资源。
          这种方式简单直接，适合中小型项目，能够确保所有文本都能立即显示，无需等待异步加载。
        </p>

        <a
          href="https://umijs.org/docs/max/i18n"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.officialLink}
        >
          <span className={styles.linkIcon}>📖</span>
          查看 Umi Max 国际化官方文档
        </a>
      </div>

      {/* 全量加载的优势与适用场景 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>全量加载的优势与适用场景</h2>

        <div className={styles.card}>
          <div className={styles.cardTitle}>优势</div>
          <ul className={styles.list}>
            <li>实现简单，无需复杂的异步加载逻辑</li>
            <li>所有文本立即可用，无加载延迟</li>
            <li>语言切换响应迅速，用户体验好</li>
            <li>便于调试和维护</li>
            <li>适合团队协作，结构清晰</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>适用场景</div>
          <ul className={styles.list}>
            <li>中小型项目，语言资源总量不大</li>
            <li>对首屏加载时间要求不严格的应用</li>
            <li>需要频繁切换语言的应用</li>
            <li>团队开发经验相对较少的项目</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>注意事项</div>
          <ul className={styles.list}>
            <li>随着项目增长，语言包体积会逐渐增大</li>
            <li>所有语言资源都会影响初始加载时间</li>
            <li>需要合理组织语言包结构，避免重复定义</li>
            <li>建议定期清理未使用的语言条目</li>
          </ul>
        </div>
      </div>

      {/* 使用方式介绍分割线 */}
      <div className={styles.section} style={{ textAlign: 'center', margin: '40px 0' }}>
        <Divider>
          <h2 style={{ color: '#1890ff', margin: 0 }}>
            <GlobalOutlined style={{ marginRight: 8 }} />
            使用方式详细介绍
          </h2>
        </Divider>
      </div>

      {/* 使用方式介绍 - 配置说明 */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>配置说明</h2>
        <p className={styles.paragraph}>
          Umi Max 的国际化配置位于 <code>config/config.ts</code> 文件中，通过 <code>locale</code> 字段进行配置：
        </p>
        <div className={styles.configExample}>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
            {`locale: {
  default: 'zh-CN',   // 默认语言
  baseNavigator: true, // 是否根据浏览器语言自动切换
  baseSeparator: '-',  // 语言分隔符
}`}
          </SyntaxHighlighter>
        </div>
        <div className={styles.tips}>
          <div className={styles.tipsTitle}>提示</div>
          <p>
            如果 <code>baseNavigator</code> 设置为 <code>true</code>
            ，则会优先使用浏览器语言设置；若设为 <code>false</code>，则仅使用 <code>default</code> 指定的默认语言。
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>全量加载目录结构</h2>
        <p className={styles.paragraph}>全量加载推荐的目录结构如下：</p>
        <div className={styles.configExample}>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={codeStyle}>
            {`src/locales/
  ├── zh-CN.ts         # 中文语言包（包含所有模块）
  ├── en-US.ts         # 英文语言包（包含所有模块）
  └── core/            # 核心语言定义
      ├── common.ts    # 通用词汇
      ├── dashboard.ts # 仪表盘模块词汇
      ├── user.ts      # 用户模块词汇
      ├── station.ts   # 业务模块词汇
      └── transform.ts # 转换工具函数`}
          </SyntaxHighlighter>
        </div>
        <p className={styles.paragraph}>这种结构将所有语言资源集中管理，在应用启动时一次性加载完成。</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>定义语言包</h2>
        <p className={styles.paragraph}>语言包定义示例：</p>

        <div className={styles.card}>
          <div className={styles.cardTitle}>核心词汇定义</div>
          <div className={styles.configExample}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
              {`// src/locales/core/common.ts
export const common = {
  'common.save': {
    'zh-CN': '保存',
    'en-US': 'Save',
  },
  'common.cancel': {
    'zh-CN': '取消',
    'en-US': 'Cancel',
  },
  'common.confirm': {
    'zh-CN': '确认',
    'en-US': 'Confirm',
  },
};

// src/locales/core/dashboard.ts
export const dashboard = {
  'dashboard.title': {
    'zh-CN': '仪表盘',
    'en-US': 'Dashboard',
  },
  'dashboard.overview': {
    'zh-CN': '概览',
    'en-US': 'Overview',
  },
};

// src/locales/core/user.ts
export const user = {
  'user.profile': {
    'zh-CN': '用户资料',
    'en-US': 'User Profile',
  },
  'user.settings': {
    'zh-CN': '用户设置',
    'en-US': 'User Settings',
  },
};`}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>语言文件导出</div>
          <div className={styles.configExample}>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
              {`// src/locales/zh-CN.ts
import { common, dashboard, user, station } from './core';
import { getLocaleRes } from './core/transform';

// 合并所有模块的语言资源
export default {
  ...getLocaleRes({
    ...common, 
    ...dashboard, 
    ...user, 
    ...station
  }, 'zh-CN'),
};

// src/locales/en-US.ts
import { common, dashboard, user, station } from './core';
import { getLocaleRes } from './core/transform';

// 合并所有模块的语言资源
export default {
  ...getLocaleRes({
    ...common, 
    ...dashboard, 
    ...user, 
    ...station
  }, 'en-US'),
};`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>在组件中使用国际化</h2>
        <p className={styles.paragraph}>全量加载模式下，所有语言资源在应用启动时已加载完成，可以直接使用：</p>

        <div className={styles.card}>
          <div className={styles.cardTitle}>1. 使用 useIntl Hook</div>
          <div className={styles.configExample}>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={codeStyle}>
              {`import { useIntl } from '@umijs/max';

function MyComponent() {
  const { formatMessage } = useIntl();
  
  return (
    <div>
      <h1>{formatMessage({ id: 'dashboard.title' })}</h1>
      <button>{formatMessage({ id: 'common.save' })}</button>
      <button>{formatMessage({ id: 'common.cancel' })}</button>
    </div>
  );
}`}
            </SyntaxHighlighter>
          </div>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>2. 使用 FormattedMessage 组件</div>
          <div className={styles.configExample}>
            <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={codeStyle}>
              {`import { FormattedMessage } from '@umijs/max';

function MyComponent() {
  return (
    <div>
      <h1><FormattedMessage id="dashboard.title" /></h1>
      <button><FormattedMessage id="common.save" /></button>
      <button><FormattedMessage id="common.cancel" /></button>
    </div>
  );
}`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>带参数的国际化文本</h2>
        <p className={styles.paragraph}>可以在国际化文本中使用占位符，以支持动态内容：</p>
        <div className={styles.configExample}>
          <SyntaxHighlighter language="jsx" style={vscDarkPlus} customStyle={codeStyle}>
            {`// 语言包定义
'welcome.message': {
  'zh-CN': '欢迎您，{name}！您有 {count} 条新消息',
  'en-US': 'Welcome, {name}! You have {count} new messages',
},

// 使用 formatMessage
const welcomeText = formatMessage(
  { id: 'welcome.message' },
  { name: 'John', count: 5 }
);

// 使用 FormattedMessage
<FormattedMessage 
  id="welcome.message" 
  values={{ name: 'John', count: 5 }} 
/>`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>语言切换</h2>
        <p className={styles.paragraph}>在全量加载模式下，切换语言非常简单，所有资源都已准备就绪：</p>
        <div className={styles.configExample}>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
            {`import { setLocale, getLocale } from '@umijs/max';

// 获取当前语言
const currentLocale = getLocale();

// 切换到英文
setLocale('en-US', false);

// 切换到中文
setLocale('zh-CN', false);

// 语言切换组件示例
function LanguageSwitcher() {
  const handleLanguageChange = (lang) => {
    setLocale(lang, false);
  };

  return (
    <div>
      <button onClick={() => handleLanguageChange('zh-CN')}>
        中文
      </button>
      <button onClick={() => handleLanguageChange('en-US')}>
        English
      </button>
    </div>
  );
}`}
          </SyntaxHighlighter>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>最佳实践</h2>
        <div className={styles.card}>
          <div className={styles.cardTitle}>命名规范</div>
          <ul className={styles.list}>
            <li>
              使用统一前缀，如 <code>common.xxx</code>、<code>user.xxx</code> 等，便于管理和定位
            </li>
            <li>
              采用小写加点的命名方式，如 <code>app.dashboard.title</code>
            </li>
            <li>相关联的词条放在一起，便于维护</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>模块划分</div>
          <ul className={styles.list}>
            <li>
              通用词汇（按钮、表格、操作提示等）放在 <code>common</code> 模块
            </li>
            <li>业务词汇按功能模块划分，独立定义</li>
            <li>避免重复定义相同含义的词条</li>
          </ul>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>技术提示</div>
          <ul className={styles.list}>
            <li>
              优先使用 <code>useIntl</code> Hook，它比 <code>FormattedMessage</code> 组件性能更好
            </li>
            <li>确保所有显示给用户的文本都使用国际化方案，避免硬编码</li>
            <li>使用工具提取未翻译的文本，确保翻译覆盖率</li>
            <li>定期审查和优化语言包结构</li>
          </ul>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>小结</h2>
        <p className={styles.paragraph}>
          全量加载是 Umi Max 国际化的经典实现方式，简单可靠，适合大多数中小型项目。
          通过合理组织语言包文件结构、遵循最佳实践，可以使项目的国际化工作更加高效和易于维护。
          当项目规模较大时，可以考虑迁移到按需加载模式以优化性能。
        </p>
      </div>
    </div>
  );
}
