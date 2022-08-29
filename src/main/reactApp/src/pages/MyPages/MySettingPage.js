import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MySetting from 'components/My/MySetting/MyEdit';
import MyInfo from 'components/My/MyInfo/MyInfo';

const MySettingPage = () => {
  return (
    <div>
      <MyTemplate>
        <MyInfo />
        <MySetting />
      </MyTemplate>
    </div>
  );
};

export default MySettingPage;
