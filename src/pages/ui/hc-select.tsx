import React from 'react';

import { HcSelect } from '@/components/ui';

const HcSelectPage: React.FC = () => {
  return (
    <>
      <HcSelect style={{ width: 200 }} options={[{ label: '123', value: '123' }]} />
    </>
  );
};

export default HcSelectPage;
