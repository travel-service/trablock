import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MyInfo from 'components/My/MyInfo/MyInfo';
import MyTravel from 'components/My/MyInfo/MyTravel';
import { useSelector } from 'react-redux';

const MyInfoPage = () => {
  const { userState } = useSelector(({ user }) => ({
    userState: user.userState,
  }));

  return (
    <MyTemplate>
      {userState && (
        <>
          <MyInfo />
          <MyTravel />
        </>
      )}
    </MyTemplate>
  );
};

export default MyInfoPage;
