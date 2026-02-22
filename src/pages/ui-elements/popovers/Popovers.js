import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
  Tooltip,
} from 'reactstrap';

import Widget from '../../../components/Widget';

const PopoverExamples = () => {
  const [state, setState] = useState({
    tooltips: [false, false, false, false, false, false],
    popovers: [false, false, false, false, false, false],
    tooltipOpen: false,
  });

  const toggle = (id, field) => {
    setState((prevState) => {
      const newFieldState = [...prevState[field]];
      newFieldState.fill(false);

      if (!prevState[field][id]) {
        newFieldState[id] = true;
      }

      return {
        ...prevState,
        [field]: newFieldState,
      };
    });
  };

  return (
      <div>
        <h1 className="page-title">Popovers & Tooltips</h1>
        <Row>
          <Col xs={12} md={6}>
            <Widget
              className="mb-xlg"
              title={<h5>Popover <span className="fw-semi-bold">Example</span></h5>}
              close collapse
            >
              <Button
                id="p-1" className="me-3 mb-md" size="lg" color="danger"
                onClick={() => toggle(0, 'popovers')}
              >Click to toggle popover</Button>
              <Button className="mb-md"
                id="p-2" color="danger" disabled
                onClick={() => toggle(1, 'popovers')}
              >Disabled button</Button>
            </Widget>
            <Widget
              title={<h5>Popover <span className="fw-semi-bold">Directions</span></h5>}
              close collapse
            >
              <Button
                id="p-3" className="me-3 mb-md" color="info"
                onClick={() => toggle(2, 'popovers')}
              >Popover on top</Button>
              <Button
                id="p-4" className="me-3 mb-md" color="warning"
                onClick={() => toggle(3, 'popovers')}
              >Popover on right</Button>
              <Button
                id="p-5" className="me-3 mb-md" color="inverse"
                onClick={() => toggle(4, 'popovers')}
              >Popover on bottom</Button>
              <Button
                id="p-6" className="me-3 mb-md" color="default"
                onClick={() => toggle(5, 'popovers')}
              >Popover on left</Button>
            </Widget>
          </Col>
          <Col xs={12} md={6}>
            <Widget
              className="mb-xlg"
              title={<h5>Tooltip <span className="fw-semi-bold">Example</span></h5>}
              close collapse
            >
              <Button id="t-1" className="me-3 mb-md" size="lg" color="success">Tooltip</Button>
              <Button id="t-2" className="mb-md" color="success" disabled>Disabled button</Button>
            </Widget>
            <Widget
              title={<h5>Tooltip <span className="fw-semi-bold">Directions</span></h5>}
              close collapse
            >
              <Button id="t-3" className="me-3 mb-md" color="info">Tooltip on top</Button>
              <Button id="t-4" className="me-3 mb-md" color="warning">Tooltip on right</Button>
              <Button id="t-5" className="me-3 mb-md" color="inverse">Tooltip on bottom</Button>
              <Button id="t-6" className="me-3 mb-md" color="default">Tooltip on left</Button>
            </Widget>
          </Col>
        </Row>

        {/* Popovers & Tooltips */}

        <Popover placement="top" isOpen={state.popovers[0]} target="p-1" toggle={() => toggle(0, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>
        <Popover placement="top" isOpen={state.popovers[1]} target="p-2" toggle={() => toggle(1, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>
        <Popover placement="top" isOpen={state.popovers[2]} target="p-3" toggle={() => toggle(2, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>
        <Popover placement="right" isOpen={state.popovers[3]} target="p-4" toggle={() => toggle(3, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>
        <Popover placement="bottom" isOpen={state.popovers[4]} target="p-5" toggle={() => toggle(4, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>
        <Popover placement="left" isOpen={state.popovers[5]} target="p-6" toggle={() => toggle(5, 'popovers')}>
          <PopoverHeader>Popover Title</PopoverHeader>
          <PopoverBody>
            Sed posuere consectetur est at lobortis. Aenean eu leo quam.
            Pellentesque ornare sem lacinia quam venenatis vestibulum.
          </PopoverBody>
        </Popover>

        <Tooltip placement="top" isOpen={state.tooltips[0]} toggle={() => toggle(0, 'tooltips')} target="t-1">
          Hello world!
        </Tooltip>
        <Tooltip placement="top" isOpen={state.tooltips[1]} toggle={() => toggle(1, 'tooltips')} target="t-2">
          Hello world!
        </Tooltip>
        <Tooltip placement="top" isOpen={state.tooltips[2]} toggle={() => toggle(2, 'tooltips')} target="t-3">
          Top
        </Tooltip>
        <Tooltip placement="right" isOpen={state.tooltips[3]} toggle={() => toggle(3, 'tooltips')} target="t-4">
          Right
        </Tooltip>
        <Tooltip placement="bottom" isOpen={state.tooltips[4]} toggle={() => toggle(4, 'tooltips')} target="t-5">
          Bottom
        </Tooltip>
        <Tooltip placement="left" isOpen={state.tooltips[5]} toggle={() => toggle(5, 'tooltips')} target="t-6">
          Left
        </Tooltip>
      </div>
  );
};

export default PopoverExamples;
