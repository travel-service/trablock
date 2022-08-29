import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoticeViewerPage from './NoticeViewerPage';
import NoticeListPage from './NoticeListPage';

const NoticeMainPage = () => {
  return (
    <Routes>
      <Route element={<NoticeListPage />} path="/" />
      <Route element={<NoticeViewerPage />} path="/:numId" />
    </Routes>
  );
};

export default NoticeMainPage;
