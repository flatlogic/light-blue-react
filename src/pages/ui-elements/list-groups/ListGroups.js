import React, { useState } from 'react';
import {
  Row, Col,
} from 'reactstrap';

import Widget from '../../../components/Widget';

import './ListGroups.scss';

const initialNestableFirstItems = [{ id: 1, title: 'Item 1' }, {
  id: 2,
  expanded: true,
  title: 'Item 2',
  children: [{ id: 3, title: 'Item 3' }, { id: 4, title: 'Item 4' }, {
    id: 5,
    title: 'Item 5',
    expanded: true,
    children: [{ id: 6, title: 'Item 6' }, {
      id: 7, title: 'Item 7',
    }, {
      id: 8, title: 'Item 8',
    }],
  }, { id: 9, title: 'Item 9' }],
}];

const initialNestableSecondItems = [{ id: 13, title: 'Item 13' }, { id: 14, title: 'Item 14' }, {
  id: 15,
  expanded: true,
  title: 'Item 15',
  children: [{ id: 16, title: 'Item 16' }, { id: 17, title: 'Item 17' }, {
    id: 18, title: 'Item 18',
  }],

}];

const initialSortableList = [{
  id: '03', text: ' Barnard\'s Star',
}, {
  id: '01', text: 'The Sun',
}, {
  id: '04', text: 'Wolf 359',
}, {
  id: '02', text: 'Proxima Centauri',
}, {
  id: '05', text: 'Lalande 21185',
}];

const ListGroups = () => {
  const [nestableFirstItems, setNestableFirstItems] = useState(initialNestableFirstItems);
  const [nestableSecondItems, setNestableSecondItems] = useState(initialNestableSecondItems);
  const [sortableList, setSortableList] = useState(initialSortableList);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const onDragStart = (index) => {
    setDraggingIndex(index);
  };

  const onDrop = (targetIndex) => {
    if (draggingIndex === null || draggingIndex === targetIndex) {
      setDraggingIndex(null);
      return;
    }

    setSortableList((prevSortableList) => {
      const reorderedList = [...prevSortableList];
      const [movedItem] = reorderedList.splice(draggingIndex, 1);
      reorderedList.splice(targetIndex, 0, movedItem);
      return reorderedList;
    });
    setDraggingIndex(null);
  };

  const onDragEnd = () => {
    setDraggingIndex(null);
  };

  const moveNestableItem = (listKey, itemIndex, direction) => {
    const setList = listKey === 'nestableFirstItems'
      ? setNestableFirstItems
      : setNestableSecondItems;

    setList((prevItems) => {
      const targetIndex = itemIndex + direction;

      if (targetIndex < 0 || targetIndex >= prevItems.length) {
        return prevItems;
      }

      const items = [...prevItems];
      const [movedItem] = items.splice(itemIndex, 1);
      items.splice(targetIndex, 0, movedItem);

      return items;
    });
  };

  const renderNestableItems = (items, listKey, level = 0) => (
    <ol className={level === 0 ? 'list-group' : 'list-group mt-sm'}>
      {items.map((item, index) => (
        <li key={item.id} className="list-group-item bg-widget-transparent">
          <div className="d-flex justify-content-between align-items-center">
            <span>{item.title}</span>
            {level === 0 && (
              <div className="d-flex gap-1">
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-xs"
                  onClick={() => moveNestableItem(listKey, index, -1)}
                  disabled={index === 0}
                >
                  <i className="fa fa-arrow-up" />
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-xs"
                  onClick={() => moveNestableItem(listKey, index, 1)}
                  disabled={index === items.length - 1}
                >
                  <i className="fa fa-arrow-down" />
                </button>
              </div>
            )}
          </div>
          {item.children && renderNestableItems(item.children, listKey, level + 1)}
        </li>
      ))}
    </ol>
  );

  return (
    <div>
      <h1 className="page-title">Lists - <span className="fw-semi-bold">Sortable Groups</span>
      </h1>
      <Widget
        title={<h4> Grouped <span className="fw-semi-bold">Lists</span></h4>}
        close refresh settings
      >
        <h3>Closest <span className="fw-semi-bold">Stars</span></h3>
        <p>
          Try to play around with this list. Are you ready to pass an exam on astronomy?
        </p>

        <ul className="list-group list-group-sortable mt-xs">
          {sortableList.map((value, index) => (
            <li
              key={value.id}
              className="list-group-item bg-widget-transparent"
              draggable
              onDragStart={() => onDragStart(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => onDrop(index)}
              onDragEnd={onDragEnd}
            >
              <i className="fa fa-sort" />
              <span className="mx-3">{value.id}</span>
              {value.text}
            </li>
          ))}
        </ul>
      </Widget>

      <Widget
        title={<h3>Nestable <span className="fw-semi-bold">List</span></h3>}
        close refresh settings
      >
        <p className="fs-mini">
          There is a scientific theory that you can arrange this list in such way that there will
          be no more saddness
          in the whole world. Can you? Touch devices supported
        </p>
        <Row className="nestable">
          <Col md="6" xs="12" className="mb-xs">
            {renderNestableItems(nestableFirstItems, 'nestableFirstItems')}
          </Col>
          <Col md="6">
            {renderNestableItems(nestableSecondItems, 'nestableSecondItems')}
          </Col>
        </Row>
      </Widget>

    </div>
  );
};

export default ListGroups;
