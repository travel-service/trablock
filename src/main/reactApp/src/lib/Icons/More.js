import { CgMoreVertical } from 'react-icons/cg';
import styled from 'styled-components';

const MoreBtn = styled(CgMoreVertical)`
  cursor: pointer;
  margin-right: -10px;
`;

const More = ({ size }) => {
  return (
    <>
      <MoreBtn size={size} />
    </>
  );
};

export default More;
