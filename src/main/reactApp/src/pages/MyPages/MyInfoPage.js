import React from 'react';
import MyTemplate from 'components/My/MyTemplate';
import MyInfo from 'components/My/MyInfo/MyInfo';
import MyTravel from 'components/My/MyInfo/MyTravel';

const MyInfoPage = () => {
  return (
    <MyTemplate>
      <MyInfo />
      <MyTravel />
    </MyTemplate>
  );
};

export default MyInfoPage;
