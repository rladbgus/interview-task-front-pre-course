import { render, screen } from '@testing-library/react';
import ListBoxForm from 'components/features/todo/ListBoxForm';
import useTodoListStore from 'src/store/todoList';

jest.mock('../../src/store/todoList.ts', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockTodoListStore = useTodoListStore as jest.MockedFunction<typeof useTodoListStore>;

beforeEach(() => {
  mockTodoListStore.mockReturnValue({
    todoStatus: 'all',
    todoList: [
      { id: 1, task: 'Task 1', isCompleted: false },
      { id: 2, task: 'Task 2', isCompleted: true }
    ]
  });
});

it('기본 렌더링 테스트', () => {
  render(<ListBoxForm />);

  expect(screen.getByText(/총/)).toBeInTheDocument();
  expect(screen.getByText(/Task 1/)).toBeInTheDocument();
  expect(screen.getByText(/Task 2/)).toBeInTheDocument();
});

it('todoStatus에 따라 필터링 결과 테스트', () => {
  mockTodoListStore.mockReturnValue({
    todoStatus: 'todo',
    todoList: [
      { id: 1, task: 'Task 1', isCompleted: false },
      { id: 2, task: 'Task 2', isCompleted: true }
    ]
  });

  render(<ListBoxForm />);

  // 필터링된 항목 확인
  expect(screen.getByText(/총 1개/)).toBeInTheDocument();
  expect(screen.getByText(/Task 1/)).toBeInTheDocument();
  expect(screen.queryByText(/Task 2/)).toBeNull();
});
