import { IoIosArrowDown } from 'react-icons/io';
import styled from 'styled-components';

const ArrowBtn = styled(IoIosArrowDown)`
  cursor: pointer;
  ${(props) =>
    props.dir === 'true'
      ? 'transform: rotate(90deg)'
      : 'transform: rotate(-90deg)'}
`;

const EmptyArrow = ({ size, dir }) => {
  return (
    <>
      <ArrowBtn size={size} dir={dir} />
    </>
  );
};

export default EmptyArrow;
