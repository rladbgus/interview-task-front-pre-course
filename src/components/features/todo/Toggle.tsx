import React, { useState } from 'react';
import Toggle from 'components/ui/Toggle';
import { STATUS } from '../../../constants/toggleOptions';
import useTodoListStore from 'store/todoList';

const StatusToggle = () => {
  const { setTodoStatus } = useTodoListStore();
  const [selectedStatus, setSelectedStatus] = useState('all');

  const onTodoStatus = (value: string) => {
    setSelectedStatus(value);
    setTodoStatus(value);
  };

  return (
    <Toggle
      options={STATUS}
      selectedValue={selectedStatus}
      onChange={(value) => onTodoStatus(value)}
    />
  );
};

export default StatusToggle;
