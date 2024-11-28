import styled from '@emotion/styled';
import React, { useState } from 'react';
import * as M from '../../../../message.json';
import useTodoListStore from 'store/todoList';

/**
 * 투 두 리스트 입력 폼 컴퍼넌트
 */
const InputForm = () => {
  const { setTodoList } = useTodoListStore();
  const [inputTask, setInputTask] = useState('');

  // enter시 입력한 내용 store에 저장
  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setTodoList({ id: Date.now(), isCompleted: false, task: inputTask });
      setInputTask('');
    }
  };

  return (
    <S.Wrapper>
      <S.Input
        placeholder={M.todo.inputPlaceholder}
        type="text"
        value={inputTask}
        onKeyPress={onSearch}
        onChange={(e) => setInputTask(e.target.value)}
      />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    margin: 30px 0;
  `,
  Input: styled.input`
    z-index: 1;
    width: 100%;
    padding: 20px;
    font-size: 20px;
    background: #e5e5e5;
    border-radius: 10px;
    box-sizing: border-box;
    border: none !important;

    ::placeholder {
      color: #b9b9b9;
    }
    &:focus {
      outline: none;
    }
  `
};

export default InputForm;
