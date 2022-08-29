// 펜 버튼
import { MdModeEdit } from 'react-icons/md';
import styled from 'styled-components';

const PencilBtn = styled(MdModeEdit)`
  cursor: pointer;
`;

const Pencil = ({ size, onClick }) => {
  return (
    <>
      <PencilBtn size={size} onClick={onClick} />
    </>
  );
};

export default Pencil;
