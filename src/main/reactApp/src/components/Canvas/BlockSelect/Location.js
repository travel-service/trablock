import React, { memo, useState } from 'react';
import styled, { css } from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
import { sysLocStore } from '../../../lib/zustand/planStore';
import BlockInfo from '../BlockInfo/BlockInfo';
import { useLazyImageObserver } from 'lib/custom/hooks/useLazyImageObserver';

const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/face3.png';

const Block = styled.li`
  list-style: none;
  margin: 13px;
  border: 1px solid #e5e7e8;
  border-radius: 10px;
  padding: 12px;
  background: #ffffff;
  width: 252px;
  height: 134px;
  display: flex;
`;

const BlockDiv = styled.div`
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;
  .name {
    font-weight: 800;
    font-size: 13px;
    line-height: 16px;
  }
  .address {
    font-weight: 400;
    font-size: 9px;
    line-height: 11px;
    color: #7e7e7e;
    margin-top: 2px;
    height: 35px;
  }
`;

const Img = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 10px;
  cursor: pointer;
`;

const TextArea = styled.div`
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InfoButton = styled.button`
  width: 100px;
  height: 25px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  z-index: 0;
  background: #ffffff;
  border: 1px solid #e5e7e8;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background: black;
    color: white;
    transition: 0.3s linear;
  }
  ${(props) =>
    props.status &&
    css`
      background: black;
      color: white;
      :hover {
        background: white;
        color: black;
        transition: 0.3s linear;
      }
    `}
`;

const Location = ({ location, onClick, idx, isSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { image, locationId, type, name, address1 } = location;
  const { imageSrc, imageRef } = useLazyImageObserver({ src: image });

  const OpenModal = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const { setLatLng } = sysLocStore();

  const handleImgError = (e) => {
    e.target.src = DEFAULT_IMAGE;
  };

  return (
    <>
      {location && (
        <>
          <Block>
            <div
              onClick={() => {
                OpenModal();
                setLatLng(locationId, type.type);
              }}
            >
              <Img
                src={imageSrc}
                ref={imageRef}
                onError={(e) => handleImgError(e)}
                alt="img"
              />
            </div>
            <TextArea>
              <BlockDiv
                onClick={() => {
                  OpenModal();
                  setLatLng(locationId, type.type);
                }}
              >
                <div className="name">{name}</div>
                <div className="address">{address1}</div>
              </BlockDiv>
              <InfoButton
                status={isSelect}
                onClick={() => onClick(location, idx)}
              >
                {isSelect ? '취소' : '선택'}
              </InfoButton>
            </TextArea>
          </Block>
          <ModalModule
            modalIsOpen={modalOpen}
            closeModal={closeModal}
            header={name}
            title={name}
            blockSelect={() => onClick(location, idx)}
            isSel={isSelect ? '취소' : '선택'}
          >
            <BlockInfo type={type.type} id={locationId} />
          </ModalModule>
        </>
      )}
    </>
  );
};

export default memo(Location);
