import styled from '@emotion/styled';
import React from 'react';

type ToggleOption = {
  label: string;
  value: string;
};

type ToggleProps = {
  options: ToggleOption[];
  selectedValue: string;
  onChange: (value: string) => void;
};

const Toggle: React.FC<ToggleProps> = (props) => {
  const { options, selectedValue, onChange } = props;

  return (
    <S.Wrapper>
      {options.map((option) => (
        <S.Button
          key={option.value}
          isSelected={selectedValue === option.value}
          onClick={() => onChange(option.value)}>
          {option.label}
        </S.Button>
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    display: flex;
    justify-content: center;
  `,
  Button: styled.button<{ isSelected: boolean }>`
    border: none;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 10px;
    transition: all 0.2s ease;
    color: ${(props) => (props.isSelected ? '#2182F3' : '#000')};
    background-color: ${(props) => (props.isSelected ? '#EBF4FF' : '#ffffff')};

    &:hover {
      background-color: ${(props) => (props.isSelected ? '#b3d8ff' : '#eaeaea')};
    }
  `
};

export default Toggle;
