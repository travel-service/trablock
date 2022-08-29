import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MyPasswd from 'components/My/MySetting/MyPasswd';

const MyPasswdPage = () => {
  return (
    <div>
      <MyTemplate>
        <MyPasswd />
      </MyTemplate>
    </div>
  );
};

export default MyPasswdPage;
