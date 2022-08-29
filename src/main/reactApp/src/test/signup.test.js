import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SignupForm from 'containers/Auth/SignupForm';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

test('Full app rendering/navigating', async () => {
  render(<App />, { wrapper: BrowserRouter });
  const user = userEvent.setup();
  await user.click(screen.getByText('회원가입'));
  expect(screen.getByText('필수항목')).toBeInTheDocument();
});

// describe('<SignupForm />', () => {
//   it('signup snapshot', () => {
//     const { getByText } = render(<SignupForm />);
//     getByText('회원가입');
//   });
// });

// 0711 공부중
