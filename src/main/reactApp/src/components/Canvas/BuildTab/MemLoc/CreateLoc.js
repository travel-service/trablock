// 자체 로케이션 추가 버튼
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import ModalModule from 'components/common/modal/ModalModule';
import { useStore } from 'lib/zustand/planStore';
import { memLocStore } from 'lib/zustand/memberLocStore';
import InputComponent from './InputComponent';
import CustomRadio from 'lib/custom/CustomRadio';
import BlackCustomBtn from 'components/Canvas/common/BlackCustomBtn';

const Container = styled.div`
  /* padding-left: 50px; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  width: 450px;

  @media (max-width: 1024px) {
    width: 400px;
  }

  @media screen and (max-width: 767px) {
    width: 90vw;
    /* height: 40vh; */
  }
`;

const Select = styled.select`
  /* width: 100%; */
  /* margin-right: 10px; */
`;

const Option = styled.option`
  width: 100%;
`;

const Error = styled.div`
  text-align: center;
  color: red;
  margin-top: 10px;
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

const MoreInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;

  ${Select} {
    width: 110px;
    height: 45px;
    margin-right: 10px;
    /* margin-top: 5px; */
  }

  button {
    width: 50px;
    height: 40px;
    margin-left: 10px;
  }
`;

const commonSubData = [
  'address2',
  'image',
  'image1',
  'image2',
  'report',
  'tel',
];

const CreateLoc = ({ size, onClick }) => {
  const { category } = useStore();
  const { createMemberLoc, typeInfo } = memLocStore();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [check, setCheck] = useState(null); // default Attraction : 1
  const [coords, setCoords] = useState({
    latitude: null,
    longitude: null,
  });
  const [mainForm, setMainForm] = useState([
    {
      key: 'name',
      title: 'name',
      placeHolder: '블록명을 입력해주세요.',
      input: '',
    },
    {
      key: 'address1',
      title: 'address1',
      placeHolder: '여행지 주소를 검색해주세요.',
      input: '',
      map: true,
    },
    {
      key: 'summary',
      title: 'summary',
      placeHolder: '여행지의 짧은 설명을 작성해주세요',
      input: '',
    },
    {
      key: 'share',
      title: '공유 가능 여부',
      placeHolder: null,
      input: '',
    },
  ]);
  const [subForm, setSubForm] = useState({
    address2: ['여행지 세부 주소', 'ex. 418-2호'],
    image: ['기본 이미지', '링크'],
    image1: ['추가 이미지 1', '링크'],
    image2: ['추가 이미지 2', '링크'],
    report: ['자세한 설명', '좋니더'],
    tel: ['전화번호', '010-0000-1111'],
  });
  const [errMsg, setErrMsg] = useState(null);
  const [detail, setDetail] = useState([
    {
      key: 'etc',
      title: '항목',
      placeHolder: null,
      input: '',
    },
  ]);
  const [mapSearch, setMapSearch] = useState(false);

  useEffect(() => {
    const tmp = typeInfo[check];
    setSubForm({
      ...subForm,
      ...tmp,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  const initForm = () => {
    setErrMsg(null);
    setMainForm([
      {
        key: 'name',
        title: 'name',
        placeHolder: '블록명을 입력해주세요.',
        input: '',
      },
      {
        key: 'address1',
        title: 'address1',
        placeHolder: '여행지 주소를 검색해주세요.',
        input: '',
        map: true,
      },
      {
        key: 'summary',
        title: 'summary',
        placeHolder: '여행지의 짧은 설명을 작성해주세요',
        input: '',
      },
      {
        key: 'share',
        title: '공유 가능 여부',
        placeHolder: null,
        input: '',
      },
    ]);
    setSubForm({
      address2: ['여행지 세부 주소', 'ex. 418-2호'],
      image: ['기본 이미지', '링크'],
      image1: ['추가 이미지 1', '링크'],
      image2: ['추가 이미지 2', '링크'],
      report: ['자세한 설명', '자세한 설명'],
      tel: ['전화번호', '010-0000-1111'],
    });
    setDetail([
      {
        key: 'etc',
        title: '항목',
        placeHolder: null,
        input: '',
      },
    ]);
    setCoords({
      latitude: null,
      longitude: null,
    });
    setMapSearch(false);
  };

  const onChange = (e, flag, index) => {
    let obj = {};
    if (flag === 'main') {
      obj = {
        ...mainForm[index],
        input: e.target.value,
      };
      let tmp = mainForm.slice();
      tmp.splice(index, 1, obj);
      setMainForm(tmp);
      return;
    } else if (e.target.value === '항목') return;
    if (flag === 'input') {
      obj = {
        key: e.target.name,
        title: subForm[e.target.name][0],
        placeHolder: subForm[e.target.name][1],
        input: e.target.value,
      };
    } else if (flag === 'select') {
      for (let el of detail) {
        if (el.key === e.target.value) {
          setErrMsg('이미 설정된 항목입니다.');
          return;
        }
      }
      setErrMsg(null);
      obj = {
        key: e.target.value,
        title: subForm[e.target.value][0],
        placeHolder: subForm[e.target.value][1],
        input: '',
      };
    }
    let tmp = detail.slice();
    tmp.splice(index, 1, obj);
    setDetail(tmp);
  };

  const openModal = () => {
    initForm();
    setCheck('Attraction');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setCheck(null);
    setModalIsOpen(false);
  };

  const onSelect = (e) => {
    const { place_name, address_name, x, y } = e;
    let [nameObj] = mainForm.slice(0, 1);
    let [addressObj] = mainForm.slice(1, 2);
    let rest = mainForm.slice(2);
    nameObj.input = place_name;
    addressObj.input = address_name;
    setMainForm([nameObj, addressObj, ...rest]);
    setCoords({
      latitude: y,
      longitude: x,
    });
  };

  const onSubmit = async () => {
    let mainObj = {};
    let typeObj = {};
    let subObj = {};

    detail.forEach((e) => {
      if (e.input.length)
        if (commonSubData.includes(e.key)) {
          subObj[e.key] = e.input;
        } else {
          typeObj[e.key] = e.input;
        }
    });
    commonSubData.forEach((e) => {
      if (!subObj[e]) subObj[e] = '';
    });

    mainForm.forEach((e) => {
      if (e.input.length) mainObj[e.key] = e.input;
    });

    let res = await createMemberLoc(mainObj, coords, subObj, typeObj, check);
    if (res === 'success') {
      alert('여행지가 생성되었습니다!');
      closeModal();
    } else {
      setErrMsg(res);
    }
  };

  const onClickType = (n) => {
    if (
      window.confirm(
        '카테고리 변경시 작성한 내용이 모두 사라져요! 괜찮으신가요?',
      )
    ) {
      setCheck(n);
      initForm();
    }
  };

  const onClickCnt = () => {
    setDetail([
      ...detail,
      {
        key: 'etc',
        title: '항목',
        placeHolder: null,
        input: '',
      },
    ]);
  };

  const onClickDel = (index) => {
    let tmp = detail.slice();
    tmp.splice(index, 1);
    setDetail(tmp);
  };

  const onClickAddress = () => {
    setMapSearch(!mapSearch);
  };

  return (
    <>
      <BlackCustomBtn
        size={size}
        onClick={openModal}
        data-tip
        data-for="createLoc"
        value="자체 블록 생성 +"
      />
      <ReactTooltip id="createLoc" place="left" type="info" effect="solid">
        <div>자체 로케이션을 생성할 수 있습니다.</div>
      </ReactTooltip>
      <ModalModule
        modalIsOpen={modalIsOpen}
        openModal={openModal}
        closeModal={closeModal}
        title="자체 블록 생성"
        map={mapSearch ? 'memberLoc' : ''}
        onSelect={onSelect}
        onSubmit={onSubmit}
        onClickAddress={onClickAddress}
      >
        <Container className="memberLoc">
          {/* 카테고리 grid, customRadio 컴포넌트 사용 */}
          <CustomRadio
            dataObj={category}
            onClick={onClickType}
            check={check}
            flag="canvas"
          />
          {/* 필수 입력 폼 */}
          <MainForm>
            {mainForm.map((obj, i) => {
              if (obj.placeHolder === null) {
                return (
                  <InputComponent
                    key={i}
                    title={obj.title}
                    onChange={(e) => onChange(e, 'main', i)}
                    name={obj.key}
                    value={obj.input}
                    type="radio"
                  />
                );
              } else {
                return (
                  <InputComponent
                    key={i}
                    value={obj.input}
                    onChange={(e) => onChange(e, 'main', i)}
                    name={obj.key}
                    placeholder={obj.placeHolder}
                    type="text"
                    map={obj.map}
                    onClickAddress={onClickAddress}
                    search={mapSearch}
                  />
                );
              }
            })}
          </MainForm>
          {/* 세부 항목 입력 폼 */}
          {detail.map((obj, i) => (
            <MoreInfo key={i}>
              <Select
                onChange={(e) => onChange(e, 'select', i)}
                value={detail[i]}
              >
                <Option value="항목">{obj.title}</Option>
                {Object.keys(subForm).map((key, i) => (
                  <Option value={key} key={i}>
                    {subForm[key][0]}
                  </Option>
                ))}
              </Select>
              {obj.title !== '항목' && obj.placeHolder === false && (
                <InputComponent
                  onChange={(e) => onChange(e, 'input', i)}
                  key={i}
                  type="radio"
                  name={obj.key}
                  value={obj.input}
                  detail={true}
                  onClickDel={onClickDel}
                />
              )}
              {obj.title !== '항목' && obj.placeHolder !== false && (
                <InputComponent
                  onChange={(e) => onChange(e, 'input', i)}
                  placeholder={obj.placeHolder}
                  name={obj.key}
                  index={i}
                  value={obj.input}
                  type="text"
                  detail={true}
                  onClickDel={onClickDel}
                />
              )}
              {/* <button onClick={() => onClickDel(i)}>취소</button> */}
            </MoreInfo>
          ))}
          {/* 항목 추가 버튼 */}
          <BlackCustomBtn onClick={onClickCnt} value="항목추가 +" />
          {/* 에러 메세지란 */}
          {errMsg && (
            <div>
              {/* <hr /> */}
              <Error>{errMsg}</Error>
            </div>
          )}
        </Container>
      </ModalModule>
    </>
  );
};

export default CreateLoc;
