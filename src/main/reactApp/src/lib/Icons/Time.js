// 시간 추가, 변경 버튼
import React, { useState } from 'react';
import { MdMoreTime, MdOutlineModeEditOutline } from 'react-icons/md';
import styled, { css } from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';
// import TimeInput from 'components/Canvas/common/TimeInput';
import ReactTooltip from 'react-tooltip';
import { buildStore } from 'lib/zustand/CanvasBuildStore';

const TimeStyle = css`
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      pointer-events: none;
      opacity: 0.5;
    `}
`;

const TimePen = styled(MdOutlineModeEditOutline)`
  ${TimeStyle}
`;

const TimeBtn = styled(MdMoreTime)`
  ${TimeStyle}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  font-size: 20px;
`;

const Input = styled.input`
  margin-left: 10px;
  margin-bottom: 10px;
  height: 30px;
  font-size: 20px;
`;

const Time = ({ title, day, index, flag, type, check }) => {
  const { setTimeData } = buildStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [stayTime, setStayTime] = useState({
    hour: '',
    min: '',
  });
  const [startTime, setStartTime] = useState('00:00');
  const { hour, min } = stayTime;

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const onChangeStartTime = (e) => {
    setStartTime(e.target.value);
  };

  const onChangeStayTime = (e) => {
    const { name, value } = e.target;
    if (value.length > 2) {
      console.log(name);
      setStayTime({
        ...stayTime,
        [name]: value.substr(0, 2),
      });
      return;
    }
    if (parseInt(value) < 0) {
      setStayTime({
        ...stayTime,
        [name]: 0,
      });
    } else if (name === 'hour' && parseInt(value) >= 24) {
      setStayTime({
        ...stayTime,
        hour: '23',
      });
    } else if (name === 'min' && parseInt(value) >= 60) {
      setStayTime({
        ...stayTime,
        min: '59',
      });
    } else {
      setStayTime({
        ...stayTime,
        [name]: value,
      });
    }
  };

  const onSubmit = (e) => {
    if (index === 0) {
      setTimeData(day, index, startTime, 'time');
    } else {
      setTimeData(day, index, stayTime, 'time');
    }
    closeModal();
  };

  return (
    <>
      {type === 'pen' && (
        <TimePen
          disabled={check}
          size="15px"
          onClick={openModal}
          data-tip
          data-for="time"
        />
      )}
      {type !== 'pen' && (
        <TimeBtn
          disabled={flag}
          size="18"
          onClick={openModal}
          data-tip
          data-for="time"
        />
      )}
      <ReactTooltip id="time" place="right" type="info" effect="solid">
        <div>여행계획에 필요한 시간을 설정해주세요.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title={title}
        onSubmit={onSubmit}
        day={day}
      >
        <Container>
          {title === '출발 시간 설정' && (
            <Div>
              <Input
                type="time"
                value={startTime}
                onChange={onChangeStartTime}
              />
            </Div>
          )}
          {title === '체류 시간 설정' && (
            <>
              <Div>
                <Input
                  type="number"
                  onChange={onChangeStayTime}
                  placeholder="시간"
                  name="hour"
                  value={hour}
                  min="0"
                  max="23"
                />
                &nbsp;시간
                <Input
                  type="number"
                  onChange={onChangeStayTime}
                  placeholder="분"
                  name="min"
                  value={min}
                  min="0"
                  max="59"
                />
                &nbsp;분
              </Div>
              <div>
                {parseInt(hour) > 0 ? `${hour}시간` : ''}
                {parseInt(min) > 0 ? ` ${min}분` : ''}
                {parseInt(hour) > 0 || parseInt(min) > 0 ? ' 체류 예상' : ''}
              </div>
            </>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default Time;
