import styled from '@emotion/styled';
import React, { useState } from 'react';
import * as M from '../../../../message.json';
import useTodoListStore from 'store/todoList';
import { alertInfo } from 'src/shared/Alert';

/**
 * 할 일 입력 폼 컴퍼넌트
 */
const InputForm = () => {
  const { todoList, setTodoList } = useTodoListStore();
  const [inputTask, setInputTask] = useState('');

  // 20글자 제한
  const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length <= 20) {
      setInputTask(value);
    }
  };

  const onSaveTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 처리가 안된 할 일 갯수 제한
    const notCompletedCount = todoList.filter((li) => !li.isCompleted).length;
    if (notCompletedCount >= 10) {
      alertInfo(M.todo.noticeNotCompleted);
      return;
    }

    // enter시 입력한 내용 store에 저장
    if (e.key === 'Enter') {
      setTodoList({
        id: Date.now(),
        isCompleted: false,
        task: inputTask
      });
      setInputTask('');
    }
  };

  return (
    <S.Wrapper>
      <S.Input
        placeholder={M.todo.inputPlaceholder}
        type="text"
        value={inputTask}
        onKeyPress={onSaveTask}
        onChange={onChangeTask}
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
