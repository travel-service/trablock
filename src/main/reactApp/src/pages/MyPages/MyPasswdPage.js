import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MyPasswd from 'components/My/MySetting/MyPasswd';
import { useSelector } from 'react-redux';

const MyPasswdPage = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  return (
    <div>
      <MyTemplate>{userState && <MyPasswd />}</MyTemplate>
    </div>
  );
};

export default MyPasswdPage;
