import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { emailCheck } from 'lib/api/auth';
import PageTemplate from 'components/common/PageTemplate';
import styled from 'styled-components';
import Spinner from 'lib/custom/Spinner';
import palette from 'lib/styles/palette';

const Contents = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`;

const Img = styled.img`
  width: 200px;
`;

const Text = styled.div`
  margin: 20px;
  font-size: 25px;
  font-weight: 600;
`;

const StyleLink = styled(Link)`
  font-size: 20px;
  font-weight: 600;
  text-decoration: none;
  color: white;
  padding: 12px;
  border-radius: 5px;
  background: ${palette.red2};
`;

const AuthEmailPage = () => {
  const { email, uuid } = useParams();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [contents, setContents] = useState({
    characterImage: process.env.PUBLIC_URL + '/images/face3.png',
    text: '잘못된 접근입니다.',
  });

  const getAuthEmailInfo = async (_email, _uuid) => {
    const res = await emailCheck(_email, _uuid);
    if (res.data && res.data.status === 202) {
      // 이메일 인증 완료
      setStatus(true);
      setContents({
        characterImage: process.env.PUBLIC_URL + '/images/face2.png',
        text: '이메일 인증이 완료되었습니다 ! 트래블럭 서비스를 이용할 수 있습니다.',
      });
    }
    setLoading(true);
    console.log(res, email, uuid);
  };

  useEffect(() => {
    getAuthEmailInfo(email, uuid);
  }, [email, uuid]);

  return (
    <PageTemplate>
      {!loading && <Spinner />}
      {loading && (
        <Contents>
          <Img src={contents.characterImage} alt="faceImage" />
          <Text>{contents.text}</Text>
          {status && <StyleLink to="/login">로그인 하러가자!</StyleLink>}
          {!status && (
            <StyleLink to="/signup">트래블럭 회원가입 하러가기!!</StyleLink>
          )}
        </Contents>
      )}
    </PageTemplate>
  );
};

export default AuthEmailPage;
