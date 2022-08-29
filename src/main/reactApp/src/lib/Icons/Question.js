import { BsQuestionCircle } from 'react-icons/bs';
import styled from 'styled-components';

const QuestionBtn = styled(BsQuestionCircle)`
  cursor: pointer;
`;

const Question = ({ size }) => {
  return (
    <>
      <QuestionBtn size={size} />
    </>
  );
};

export default Question;
