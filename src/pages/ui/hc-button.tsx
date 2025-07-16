import React from 'react';

import { HcButton } from '@/components/ui';

const HcButtonPage: React.FC = () => {
  return (
    <div>
      <h2>按钮</h2>
      <hr />
      <h4 style={{ marginTop: 40 }}>按钮尺寸 主要按钮</h4>
      <div style={{ display: 'flex', gap: 48 }}>
        <HcButton customSize="large" customType="primary">
          Large Primary
        </HcButton>
        <HcButton customSize="regular" customType="primary">
          Regular Primary
        </HcButton>
        <HcButton customSize="small" customType="primary">
          Small Primary
        </HcButton>
        <HcButton customSize="mini" customType="primary" disabled>
          Mini Primary
        </HcButton>
      </div>
      <h4 style={{ marginTop: 40 }}>按钮尺寸 次要按钮</h4>
      <div style={{ display: 'flex', gap: 48 }}>
        <HcButton customSize="large" customType="secondary">
          Large Primary
        </HcButton>
        <HcButton customSize="regular" customType="secondary">
          Regular Primary
        </HcButton>
        <HcButton customSize="small" customType="secondary">
          Small Primary
        </HcButton>
        <HcButton customSize="mini" customType="secondary" disabled>
          Mini Primary
        </HcButton>
      </div>

      <h4 style={{ marginTop: 40 }}>原有的类型保留</h4>
      <div style={{ display: 'flex', gap: 48 }}>
        <HcButton customSize="large" type="primary">
          Large Primary
        </HcButton>
        <HcButton customSize="regular" type="default">
          Regular Primary
        </HcButton>
        <HcButton customSize="small" type="link">
          Small Primary
        </HcButton>
        <HcButton customSize="mini" type="text">
          Mini Primary
        </HcButton>
      </div>
    </div>
  );
};

export default HcButtonPage;
