import React from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import Close from 'lib/Icons/Close';

const Input = styled.input`
  width: 100%;
  ::placeholder {
    font-weight: 400;
  }
`;

const RadioInput = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  /* width: 100%; */
  margin: 5px 0px;
  padding-right: 10px;
  background-color: #ededef;
  border-radius: 5px;
  align-items: center;

  ${Input}, ${RadioInput} {
    /* width: 90%; */
    flex: 1;
    border: none;
    background-color: #ededef;
    height: 45px;
    font-size: 15px;
    text-indent: 15px;
    font-weight: 400;
    border-radius: 5px;
    :focus {
      outline: none;
    }
  }
`;

const SearchBtn = styled(MdSearch)`
  :hover {
    cursor: pointer;
    transform: scale(1.1);
  }
`;

const Label = styled.div`
  font-weight: 700;
`;

const InputComponent = ({
  title,
  onChange,
  placeholder,
  name,
  value,
  type,
  map,
  onClickAddress,
  search,
  detail,
  onClickDel,
  index,
}) => {
  return (
    <Container>
      {type === 'radio' && (
        <>
          <RadioInput>
            <Label>{title}</Label>
            <div>
              가능
              <input
                onChange={onChange}
                checked={value === 'true'}
                name={name}
                value={true}
                type="radio"
              />
            </div>
            <div>
              불가능
              <input
                type="radio"
                checked={value === 'false'}
                name={name}
                onChange={onChange}
                value={false}
              />
            </div>
          </RadioInput>
          {detail && <Close size="17px" onClick={() => onClickDel(index)} />}
        </>
      )}
      {type === 'text' && map && (
        <>
          <Input
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            value={value}
            disabled
          />
          <SearchBtn size="20px" onClick={onClickAddress} />
        </>
      )}
      {type === 'text' && !map && (
        <>
          <Input
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            value={value}
            type="text"
          />
          {detail && <Close size="17px" onClick={() => onClickDel(index)} />}
        </>
      )}
    </Container>
  );
};

export default InputComponent;
