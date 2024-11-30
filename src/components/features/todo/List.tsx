import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import useTodoListStore from 'store/todoList';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';

/**
 * 할 일 목록 컴퍼넌트
 */
const List = () => {
  const { todoStatus, todoList, removeTodo, toggleTodoCompleted } = useTodoListStore();
  const [selectedTodoList, setSelectedTodoList] = useState(todoList);

  useEffect(() => {
    setSelectedTodoList(filterTodoList(todoStatus));
  }, [todoStatus, todoList]);

  // 투두 상태에 따른 리스트 필터링 로직
  const filterTodoList = (status: string) => {
    switch (status) {
      case 'todo':
        return todoList.filter((li) => !li.isCompleted);
      case 'done':
        return todoList.filter((li) => li.isCompleted);
      default:
        return todoList;
    }
  };

  // 제거 아이콘 클릭시 해당 테스크 제거
  const onRemoveTodo = (id: number) => {
    removeTodo(id);
  };

  // 체크박스 클릭시 해당 테스크의 완료여부 변경
  const onToddleTodoCompleted = (id: number) => {
    toggleTodoCompleted(id);
  };

  return (
    <>
      {selectedTodoList.map((li, index) => {
        return (
          <S.Wrapper key={index}>
            <S.CheckBoxWrapper onClick={() => onToddleTodoCompleted(li.id)}>
              {li.isCompleted ? <ExpandCircleDownOutlinedIcon /> : <CircleOutlinedIcon />}
              <S.Text>{li.task}</S.Text>
            </S.CheckBoxWrapper>
            <S.CloseIcon
              src="/images/close.svg"
              alt="닫기 아이콘"
              onClick={() => onRemoveTodo(li.id)}
            />
          </S.Wrapper>
        );
      })}
    </>
  );
};

const S = {
  Wrapper: styled.div`
    margin: 3px;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
  `,
  CheckBoxWrapper: styled.div`
    display: flex;
  `,
  Item: styled.div``,
  CheckBox: styled.img``,
  Text: styled.div`
    margin: auto 0 auto 20px;
  `,
  CloseIcon: styled.img`
    cursor: pointer;
  `
};

export default List;
