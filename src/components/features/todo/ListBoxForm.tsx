import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import List from './List';
import StatusToggle from './Toggle';
import useTodoListStore from 'src/store/todoList';

const ListBoxForm = () => {
  const { todoStatus, todoList } = useTodoListStore();
  const [totalCount, setTotalCount] = useState(todoList.length);

  useEffect(() => {
    setTotalCount(getFilteredCount(todoStatus));
  }, [todoList, todoStatus]);

  // 투 두 리스트 갯수 필터링 로직
  const getFilteredCount = (status: string) => {
    switch (status) {
      case 'todo':
        return todoList.filter((li) => !li.isCompleted).length;
      case 'done':
        return todoList.filter((li) => li.isCompleted).length;
      default:
        return todoList.length;
    }
  };

  return (
    <S.Wrapper>
      <StatusToggle />
      <S.TotalCount> 총 {totalCount}개</S.TotalCount>
      <List />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    width: 100%;
    border-radius: 10px;
    padding: 20px 40px;
    box-sizing: border-box;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  `,
  TotalCount: styled.div`
    margin: 30px 0;
    text-align: left;
  `
};

export default ListBoxForm;
