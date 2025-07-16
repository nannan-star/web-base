import type { LoginForm } from '@/types/login';

import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Col, Form, Image, Input, Row } from 'antd';
import { md5 } from 'js-md5';
import React, { useEffect, useState } from 'react';

import { TOKEN_KEY } from '@/constants';
import { message } from '@/utils/message';

import services from '@/services';
import './index.less';

const { login } = services.LoginController;

/**
 * 登录页面组件
 * 提供用户登录功能，包含用户名、密码、图片验证码输入
 * 具有炫酷的星空背景动画效果
 * @component
 * @returns {JSX.Element} 登录页面组件
 */
const LoginPage: React.FC = () => {
  /** 表单实例 */
  const [form] = Form.useForm();

  /** 登录加载状态 */
  const [loading, setLoading] = useState<boolean>(false);

  /** 验证码图片URL或Base64字符串 */
  const [captchaImage, setCaptchaImage] = useState<string>('');

  /** 验证码标识Key，用于后端验证 */
  const [captchaKey, setCaptchaKey] = useState<string>('');

  /**
   * 表单初始值配置
   * @constant
   */
  const initialValues = {
    username: 'lunannan',
    password: 'Lunannan123;',
    code: '',
  };

  /**
   * 获取图片验证码
   * 支持后端返回图片流（content-type: image/jpeg）的处理
   * 自动管理blob URL的内存释放
   * @async
   * @function refreshCaptcha
   * @returns {Promise<void>} 无返回值
   * @throws {Error} 当获取验证码失败时抛出错误
   */
  const refreshCaptcha = async (): Promise<void> => {
    try {
      // 先释放之前的blob URL内存，防止内存泄漏
      if (captchaImage && captchaImage.startsWith('blob:')) {
        window.URL.revokeObjectURL(captchaImage);
      }

      // 使用fetch直接请求图片验证码
      const response = await fetch('/api/app/code/image?width=125&height=33', {
        method: 'GET',
        headers: {
          Accept: 'image/jpeg, image/png, image/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // 检查响应的content-type
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.startsWith('image/')) {
        // 获取图片blob数据
        const blob = await response.blob();

        // 创建object URL用于图片显示
        const imageUrl = window.URL.createObjectURL(blob);
        setCaptchaImage(imageUrl);

        // 从响应头获取验证码Token
        const validateToken = response.headers.get('Validate-Code-Token') || '';
        setCaptchaKey(validateToken);
      }
    } catch (error) {
      message.error('获取验证码失败，请重试');
    }
  };

  /**
   * 组件挂载时获取验证码
   * @effect
   */
  useEffect(() => {
    refreshCaptcha();
  }, []);

  /**
   * 组件卸载时释放blob URL内存
   * 防止内存泄漏
   * @effect
   */
  useEffect(() => {
    return () => {
      if (captchaImage && captchaImage.startsWith('blob:')) {
        window.URL.revokeObjectURL(captchaImage);
      }
    };
  }, [captchaImage]);

  /**
   * 处理用户登录逻辑
   * 包含密码MD5加密、验证码验证、登录状态管理等
   * @async
   * @function handleLogin
   * @param {LoginForm} values - 表单提交的数据
   * @returns {Promise<void>} 无返回值
   */
  const handleLogin = async (values: LoginForm): Promise<void> => {
    setLoading(true);
    try {
      const data = await login(
        {
          ...values,
          password: md5(values.password),
        },
        captchaKey, // 验证码Key
      );
      // 到这里说明 code === 'SUCCESS'
      localStorage.setItem(TOKEN_KEY, JSON.stringify({ token: data.token, tokenHead: data.tokenHead }));
      history.push('/doc/umi');
    } catch (error) {
      refreshCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* 星空背景动画 */}
      <div className="stars-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      <div className="login-form-wrapper">
        <div className="login-form-container">
          <div className="login-title">
            <h1>用户登录</h1>
            <p>欢迎来到管理系统</p>
          </div>

          <Form
            form={form}
            name="login"
            size="large"
            initialValues={initialValues}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 3, message: '用户名至少3个字符!' },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" allowClear />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6个字符!' },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" allowClear />
            </Form.Item>

            <Form.Item
              name="code"
              rules={[
                { required: true, message: '请输入验证码!' },
                { len: 6, message: '验证码为6位!' },
              ]}
            >
              <Row gutter={8}>
                <Col span={14}>
                  <Input prefix={<SafetyOutlined />} placeholder="请输入验证码" allowClear maxLength={6} />
                </Col>
                <Col span={10}>
                  <div className="captcha-wrapper" onClick={refreshCaptcha}>
                    {captchaImage ? (
                      <Image
                        src={captchaImage.startsWith('blob:') ? captchaImage : `data:image/png;base64,${captchaImage}`}
                        alt="验证码"
                        preview={false}
                        style={{ cursor: 'pointer', width: '100%', height: '40px' }}
                      />
                    ) : (
                      <div className="captcha-placeholder">点击获取</div>
                    )}
                  </div>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block className="login-button">
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          <div className="login-footer">
            <p>点击验证码图片可刷新</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
