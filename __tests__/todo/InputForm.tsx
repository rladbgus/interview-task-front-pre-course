import { render, screen, fireEvent } from '@testing-library/react';
import InputForm from 'components/features/todo/InputForm';
import useTodoListStore from 'src/store/todoList';
import { alertInfo } from 'src/shared/Alert';
import * as M from 'message.json';

jest.mock('../../src/store/todoList.ts', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    todoList: [],
    setTodoList: jest.fn()
  }))
}));

jest.mock('../../src/shared/Alert.tsx', () => ({
  alertInfo: jest.fn()
}));

it('input 영역 렌더 테스트', () => {
  render(<InputForm />);
  const inputElement = screen.getByPlaceholderText(M.todo.inputPlaceholder);
  expect(inputElement).toBeInTheDocument();
});

it('입력 제한 테스트', () => {
  render(<InputForm />);
  const inputElement = screen.getByPlaceholderText(M.todo.inputPlaceholder);

  fireEvent.change(inputElement, { target: { value: 'a'.repeat(25) } });
  expect(inputElement).toHaveValue('a'.repeat(20));
});

it('처리되지 않은 일 제한 테스트', () => {
  const mockTodoList = Array(10).fill({ isCompleted: false });
  useTodoListStore.mockReturnValue({
    todoList: mockTodoList,
    setTodoList: jest.fn()
  });

  render(<InputForm />);
  const inputElement = screen.getByPlaceholderText(M.todo.inputPlaceholder);

  // Enter 키 입력
  fireEvent.change(inputElement, { target: { value: 'New Task' } });
  fireEvent.keyPress(inputElement, { key: 'Enter', code: 'Enter' });

  expect(alertInfo).toHaveBeenCalledWith(M.todo.noticeNotCompleted);
});
