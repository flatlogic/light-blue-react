import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

import Widget from '../../../../components/Widget';
import Task from '../Task/Task';

function buildTasks(data) {
  return data.map((task) => ({
    ...task,
    complited: false,
  }));
}

const TasksContainer = ({ data }) => {
  const [tasks, setTasks] = useState(() => buildTasks(data));

  const toggleTaskState = (index) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      newTasks[index].complited = !prevTasks[index].complited;
      return newTasks;
    });
  };

  const totalCompleted = tasks.filter((item) => item.complited).length;

  return (
    <Widget
      className="mb-xlg pb-2"
      bodyClass="task-container mt"
      title={
        <div>
          <h4>Today&apos;s Tasks <span className="badge rounded-pill bg-success fw-normal pull-right mt-xs">{tasks.length}</span></h4>
          <p className="text-primary mb-0"><small>{totalCompleted} of {tasks.length} completed</small></p>
        </div>
      }
    >
      {tasks.map((item, index) =>
        <Task key={item.id} index={index} toggle={toggleTaskState} {...item} />)}
      <Button color="transparent" className="w-100 text-center">
        See All <i className="la la-arrow-down" />
      </Button>
    </Widget>
  );
};

TasksContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      title: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
};

export default TasksContainer;
