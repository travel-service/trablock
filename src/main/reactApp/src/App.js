import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import { useScroll } from 'lib/custom/useScroll';
import { createGlobalStyle, css } from 'styled-components';
import Modal from 'react-modal';
import ProtectedRoute from 'lib/router/ProtectedRoute';
import Spinner from 'lib/custom/Spinner';

// router lazy 적용

const SignUpPage = lazy(() => import('pages/AuthPages/SignupPage'));
const LoginPage = lazy(() => import('pages/AuthPages/LoginPage'));
const CanvasMainPage = lazy(() => import('pages/CanvasPages/CanvasMainPage'));
const MyMainPage = lazy(() => import('pages/MyPages/MyMainPage'));
const NoticeMainPage = lazy(() => import('pages/NoticePages/NoticeMainPage'));
const NotFoundPage = lazy(() => import('pages/OtherPages/NotFoundPage'));
const LandingPage = lazy(() => import('pages/OtherPages/LandingPage'));
const SearchPage = lazy(() => import('pages/OtherPages/SearchPage'));

const GlobalStyle = createGlobalStyle`
  body::-webkit-scrollbar {
    display: none;
    ${(props) =>
      props.isScroll &&
      css`
        display: block;
      `}
  }
`;

function App() {
  const { scrollY } = useScroll();

  return (
    <>
      <Suspense fallback={<Spinner />}>
        {useRoutes([
          { path: process.env.PUBLIC_URL + '/', element: <LandingPage /> },
          { path: process.env.PUBLIC_URL + '/signup', element: <SignUpPage /> },
          { path: process.env.PUBLIC_URL + '/login', element: <LoginPage /> },
          {
            path: process.env.PUBLIC_URL + '/canvas/*',
            element: (
              <ProtectedRoute>
                <CanvasMainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: process.env.PUBLIC_URL + '/notice/*',
            element: <NoticeMainPage />,
          },
          {
            path: process.env.PUBLIC_URL + '/mypage/*',
            element: (
              <ProtectedRoute>
                <MyMainPage />
              </ProtectedRoute>
            ),
          },
          {
            path: process.env.PUBLIC_URL + '/search',
            element: <SearchPage />,
          },
          {
            path: process.env.PUBLIC_URL + '*',
            element: <NotFoundPage />,
          },
        ])}
      </Suspense>
      <GlobalStyle isScroll={scrollY} />
    </>
  );
}

Modal.setAppElement('#root'); // Modal 사용을 위해 붙임

export default App;
