import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MySetting from 'components/My/MySetting/MyEdit';
import MyInfo from 'components/My/MyInfo/MyInfo';
import { useSelector } from 'react-redux';

const MySettingPage = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));
  return (
    <div>
      <MyTemplate>
        {userState && (
          <>
            <MyInfo />
            <MySetting />
          </>
        )}
      </MyTemplate>
    </div>
  );
};

export default MySettingPage;
