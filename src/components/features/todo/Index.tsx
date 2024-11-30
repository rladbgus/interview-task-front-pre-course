'use client';
import React from 'react';
import styled from '@emotion/styled';
import InputForm from './InputForm';
import ListBoxForm from './ListBoxForm';

const Index = () => {
  return (
    <S.Wrapper>
      <S.Title>To Do List</S.Title>
      <InputForm />
      <ListBoxForm />
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    margin: 100px auto;
    max-width: 700px;
    text-align: center;
  `,
  Title: styled.div`
    font-size: 56px;
    font-weight: 700;
  `
};

export default Index;
