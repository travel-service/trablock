import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';

const ThumbnailSettingDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  font-family: 'Pretendard';
  font-style: normal;
  // @media only screen and (min-width: 800px) {
  //   margin-left: 10%;
  //   margin-top: 10px;
  //   margin-bottom: 10px;
  //   height: 180px;
  // }
`;
const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 15px;
  width: 100px;
  height: 20px;
`;
const TooltipButton = styled.button`
  margin-left: 10px;
  background: none;
  height: 12px;
  width: 12px;
  border: none;
  cursor: pointer;
`;
const ThumbnailboxDiv = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 15px;
  height: 150px;
`;
const PreviewboxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7e8;
  border-radius: 10px;
  width: 216px;
  height: 150px;
  margin-right: 10px;
`;
const StyledFile = styled.label`
  //height: 46px;
  margin: 0;
  padding: 15px 25px 15px 25px;
  margin-right: 10px;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 400;
  font-size: 13px;
  color: #000000;
  text-align: center;
  :hover {
    background: #000000;
    color: #ffffff;
  }
`;

export const ImageSetting = ({ userPlan, setThumbnail, Question }) => {
  const [imgData, setImgData] = useState(null);

  const insertImg = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgBase64 = reader.result;
      console.log(previewImgBase64);

      if (previewImgBase64) {
        const formData = new FormData();
        formData.append('file', e.target.files[0].name);
        //console.log(formData.getAll('file'));
        setThumbnail(formData);
        setImgData(previewImgBase64);
      }
    };
    console.log(userPlan.thumbnail);
  };
  /*const insertImg = (e) => {
    let reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      console.log(e.target.files[0].name);

      if (previewImgUrl) {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        //formData.append('file', previewImgUrl);
        setThumbnail(formData);
        setImgData(previewImgUrl);
      }
      console.log(userPlan.thumbnail);
    };
  };*/
  const deleteImg = () => {
    setImgData(null);
    setThumbnail('');
  };

  return (
    <ThumbnailSettingDiv>
      <TitleSpan>3. 커버 사진 </TitleSpan>
      <TooltipButton data-tip data-for="thumbnailsetting">
        <Question size="14" />
      </TooltipButton>
      <ReactTooltip
        id="thumbnailsetting"
        place="right"
        type="info"
        effect="solid"
      >
        <div>플랜을 원하는 사진으로 꾸며보세요.</div>
      </ReactTooltip>
      <ThumbnailboxDiv>
        <PreviewboxDiv uploading={false}>
          {imgData ? (
            <img
              src={userPlan.thumbnail ? userPlan.thumbnail : imgData}
              alt="미리보기"
              height="130"
            />
          ) : (
            <AiOutlinePicture size="30" />
          )}
        </PreviewboxDiv>
        <form encType="multipart/form-data" style={{ height: '35px' }}>
          {userPlan.thumbnail ? (
            <>
              <StyledFile htmlFor="delete-file">파일 삭제</StyledFile>
              <button
                id="delete-file"
                onClick={() => deleteImg()}
                style={{ display: 'none' }}
              />
            </>
          ) : (
            <>
              <StyledFile htmlFor="input-file">파일 찾기</StyledFile>
              <input
                type="file"
                id="input-file"
                accept="image/*"
                onChange={(e) => insertImg(e)}
                style={{ display: 'none' }}
              />
            </>
          )}
        </form>
      </ThumbnailboxDiv>
    </ThumbnailSettingDiv>
  );
};
