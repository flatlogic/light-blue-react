import React, { useState } from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, ModalFooter, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import classnames from 'classnames';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Modals = () => {
  const [state, setState] = useState({
    defaultModalTabId: '1',
    variatonModalsTabId: '1',
    demo: false,
    scrollingLong: false,
    large: false,
  });

  const toggle = (id) => {
    setState((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const changeTab = (field, id) => {
    setState((prevState) => ({
      ...prevState,
      [field]: id,
    }));
  };

  return (
      <Row>
        <Col md={10}>
          <Breadcrumb>
            <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
            <BreadcrumbItem>Documentation</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem active>Modal</BreadcrumbItem>
          </Breadcrumb>
        </Col>

        <Col lg={9}>
          <h2>Modal</h2>
          <p className="mb-lg">Use Bootstrap’s JavaScript modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content.</p>
          <SyntaxHighlighter language='javascript' style={tomorrow}>
            {"import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';"}
          </SyntaxHighlighter>
          <Nav tabs className="bg-transparent mt">
            <NavItem>
              <NavLink
                className={classnames({ active: state.defaultModalTabId === '1' })}
                onClick={() => {
                  changeTab('defaultModalTabId', '1');
                }}
              >
                Example
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: state.defaultModalTabId === '2' })}
                onClick={() => {
                  changeTab('defaultModalTabId', '2');
                }}
              >
                Code
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="mb-xlg" activeTab={state.defaultModalTabId}>
            <TabPane tabId="1">
              <Button onClick={() => toggle('demo')} size="lg" color="primary">Default modal</Button>
            </TabPane>
            <TabPane tabId="2">
              <SyntaxHighlighter language='javascript' style={tomorrow}>{'<Modal isOpen={} toggle={}>\n' +
              '  <ModalHeader toggle={}>Modal title</ModalHeader>\n' +
              '  <ModalBody className="bg-white">\n' +
              '    ...\n' +
              '  </ModalBody>\n' +
              '  <ModalFooter>\n' +
              '    <Button color="secondary" onClick={}>Close</Button>\n' +
              '    <Button color="primary">Save changes</Button>\n' +
              '  </ModalFooter>\n' +
              '</Modal>'}</SyntaxHighlighter>
            </TabPane>
          </TabContent>
          <Nav tabs className="bg-transparent mt">
            <NavItem>
              <NavLink
                className={classnames({ active: state.variatonModalsTabId === '1' })}
                onClick={() => {
                  changeTab('variatonModalsTabId', '1');
                }}
              >
                Example
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: state.variatonModalsTabId === '2' })}
                onClick={() => {
                  changeTab('variatonModalsTabId', '2');
                }}
              >
                Code
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent className="mb-xlg" activeTab={state.variatonModalsTabId}>
            <TabPane tabId="1">
              <h3>Variations</h3>
              <Button className="me-4" onClick={() => toggle('scrollingLong')} size="lg" color="danger">Long modal</Button>
              <Button onClick={() => toggle('large')} size="lg" color="success">Large modal</Button>
            </TabPane>
            <TabPane tabId="2">
              <SyntaxHighlighter language='javascript' style={tomorrow}>{'<Modal isOpen={} toggle={}>\n' +
              '  <ModalHeader toggle={}>Modal title</ModalHeader>\n' +
              '  <ModalBody className="bg-white">\n' +
              '    {longContent}\n' +
              '  </ModalBody>\n' +
              '  <ModalFooter>\n' +
              '    <Button color="secondary" onClick={}>Close</Button>\n' +
              '    <Button color="primary">Save changes</Button>\n' +
              '  </ModalFooter>\n' +
              '</Modal>\n\n' +
              '<Modal size="lg"> \n' +
              '  <ModalHeader toggle={}>Modal title</ModalHeader>\n' +
              '  <ModalBody className="bg-white">\n' +
              '    {content}\n' +
              '  </ModalBody>\n' +
              '  <ModalFooter>\n' +
              '    <Button color="secondary" onClick={}>Close</Button>\n' +
              '    <Button color="primary">Save changes</Button>\n' +
              '  </ModalFooter>\n' +
              '</Modal>'}</SyntaxHighlighter>
            </TabPane>
          </TabContent>
          For more examples please refer to <a href="https://reactstrap.github.io/components/modal/" target="_blank" rel="noopener noreferrer">Reactstrap Modal</a>
        </Col>
        <Modal isOpen={state.demo} toggle={() => toggle('demo')}>
          <ModalHeader toggle={() => toggle('demo')}>Modal title</ModalHeader>
          <ModalBody className="bg-white">
            ...
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggle('demo')}>Close</Button>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={state.scrollingLong} toggle={() => toggle('scrollingLong')}>
          <ModalHeader toggle={() => toggle('scrollingLong')}>Long content</ModalHeader>
          <ModalBody className="bg-white">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and scrambled it to make a type
              specimen book. It has survived not only five centuries, but also the leap
              into electronic typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
              and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggle('scrollingLong')}>Close</Button>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>

        <Modal size="lg" isOpen={state.large} toggle={() => toggle('large')}>
          <ModalHeader toggle={() => toggle('large')}>Large modal</ModalHeader>
          <ModalBody className="bg-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, illum harum?
            Quidem, quisquam, natus repellat debitis veniam quia facilis magni tempora
            cupiditate odio vitae? Eligendi nisi consequuntur vero tenetur nemo!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => toggle('large')}>Close</Button>
            <Button color="primary">Save changes</Button>
          </ModalFooter>
        </Modal>
      </Row>
  );
};

export default Modals;
