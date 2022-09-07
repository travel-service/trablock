import React, { useEffect, useState } from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { AiOutlinePicture } from 'react-icons/ai';

const ThumbnailSettingDiv = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  font-family: 'Pretendard';
  font-style: normal;
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
`;
const PreviewboxDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5e7e8;
  border-radius: 10px;
  width: 216px;
  height: 162px;
  margin-right: 10px;
`;
const StyledFile = styled.label`
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

export const ImageSetting = ({ id, userPlan, setThumbnail, Question }) => {
  const [imgData, setImgData] = useState(null); // preview
  const [fileName, setFileName] = useState(null); // 파일 이름

  useEffect(() => {
    if (userPlan.thumbnail !== '' && id) {
      setImgData(userPlan.thumbnail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPlan.thumbnail, id]);

  const insertImg = (e) => {
    let reader = new FileReader();
    let formData = new FormData();
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
      formData.append('file', e.target.files[0]);
    } else {
      let formd = new FormData();
      formData.append('file', formd);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;
      if (previewImgUrl) {
        setThumbnail(formData);
        setImgData(previewImgUrl);
      }
    };
  };

  const deleteImg = () => {
    setImgData(null);
    setThumbnail(null);
    setFileName(null);
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
              src={imgData}
              alt="미리보기"
              style={{
                maxWidth: '216px',
                maxHeight: '162px',
                borderRadius: '10px',
              }}
            />
          ) : (
            <AiOutlinePicture size="30" />
          )}
        </PreviewboxDiv>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            color: '#7e7e7e',
            fontSize: '13px',
          }}
        >
          <div>
            {fileName && fileName.length > 20
              ? fileName.substr(0, 20) + '...'
              : fileName}
          </div>
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
        </div>
      </ThumbnailboxDiv>
    </ThumbnailSettingDiv>
  );
};
