import { render, screen } from '@testing-library/react';
import Index from 'components/features/todo/Index';

it('최상위 컴퍼넌트 스냅샵 테스트', () => {
  const { asFragment } = render(<Index />);
  expect(asFragment()).toMatchSnapshot();
});

it('타이틀 렌더 테스트', () => {
  render(<Index />);
  const titleElement = screen.getByText(/To Do List/i);
  expect(titleElement).toBeInTheDocument();
});
