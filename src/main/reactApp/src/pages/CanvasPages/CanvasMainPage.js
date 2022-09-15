import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Spinner from 'lib/custom/Spinner';
import NotFoundPage from 'pages/OtherPages/NotFoundPage';

const DirectoryPage = lazy(() => import('./DirectoryPage'));
const TravelSettingPage = lazy(() => import('./TravelSettingPage'));
const SelectBlockPage = lazy(() => import('./SelectBlockPage'));
const BuildBlockPage = lazy(() => import('./BuildBlockPage'));
const TravelCheckPage = lazy(() => import('./TravelCheckPage'));

const CanvasMainPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route element={<DirectoryPage />} path="/" />
        <Route element={<DirectoryPage />} path="directory" />
        <Route element={<TravelSettingPage />} path="setting" />
        <Route element={<SelectBlockPage />} path="select" />
        <Route element={<BuildBlockPage />} path="build" />
        <Route element={<TravelCheckPage />} path="check" />
        <Route element={<TravelCheckPage />} path="check/:planId" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </Suspense>
  );
};

export default CanvasMainPage;
