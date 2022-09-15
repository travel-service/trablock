import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyInfoPage from './MyInfoPage';
import MySetting from './MySettingPage';
import MyPasswdPage from './MyPasswdPage';
import NotFoundPage from 'pages/OtherPages/NotFoundPage';

const MyMainPage = () => {
  return (
    <Routes>
      <Route element={<MyInfoPage />} path="MyInfo" />
      <Route element={<MySetting />} path="MySetting" />
      <Route element={<MyPasswdPage />} path="MySetting/MyPasswd" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
};

export default MyMainPage;
