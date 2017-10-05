import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
  Popover,
  PopoverTitle,
  PopoverContent,
} from 'reactstrap';

import s from './Dialogs.scss';
import Widget from '../../../components/Widget';

class Dialogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      modal2: false,
      popoverOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
  }

  toggle() {
    this.setState({
      modal1: !this.state.modal1,
    });
  }

  toggle2() {
    this.setState({
      modal2: !this.state.modal2,
    });
  }

  togglePopover() {
    this.setState({
      popoverOpen: !this.state.popoverOpen,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Dialogs
          <small> Normal & blocking dialog</small>
        </h2>
        <Row>
          <Col md={5}>
            <Widget
              title={<h5><i className="fa fa-magic" /> Dialogs</h5>}
            >
              <div className="modal" style={{ position: 'relative', top: 'auto', right: 'auto', left: 'auto', bottom: 'auto', zIndex: 1, display: 'block', overflow: 'hidden' }}>
                <div className="modal-dialog" role="document" style={{ width: 'auto', padding: 0 }}>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Modal title</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <p>One fine body...</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </Widget>
          </Col>
          <Col md={5}>
            <Widget
              title={<h5><i className="fa fa-bolt" /> Live Demo</h5>}
            >
              <Button color="danger" onClick={this.toggle} size="lg" block>Launch modal</Button>
              <Modal isOpen={this.state.modal1} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Modal Heading</ModalHeader>
                <ModalBody>
                  <h4>Text in a modal</h4>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                  <h4>Popover in a modal</h4>
                  <p>This <Button id="popover" onClick={this.togglePopover}>button</Button>
                    <Popover placement="right" isOpen={this.state.popoverOpen} target="popover" toggle={this.togglePopover}>
                      <PopoverTitle>A Title</PopoverTitle>
                      <PopoverContent>
                        And here&#39;s some amazing content. It&#39;s very engaging. right?
                      </PopoverContent>
                    </Popover> should trigger a popover on click.
                  </p>

                  <h4>Tooltips in a modal</h4>
                  <p>
                    <a href="#" className="tooltip-test" id="this-link">This link </a>
                    <UncontrolledTooltip placement="top" target="this-link">
                      Tooltip
                    </UncontrolledTooltip>
                    and
                    <a href="#" className="tooltip-test" id="that-link"> that link</a>
                    <UncontrolledTooltip placement="top" target="that-link">
                      Tooltip
                    </UncontrolledTooltip>
                    should have tooltips on hover.
                  </p>
                  <hr />

                  <h4>Blah blah blah text</h4>
                  <p>
                    Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  <Button color="primary">Save changes</Button>
                </ModalFooter>
              </Modal>
            </Widget>
            <Widget
              title={<h5><i className="fa fa-ban" /> Blocking one</h5>}
            >
              <Button color="warning" onClick={this.toggle2} size="lg" block>Launch blocking modal</Button>
              <Modal
                isOpen={this.state.modal2}
                toggle={this.toggle2}
                backdrop={'static'}
              >
                <ModalHeader toggle={this.toggle2}>Modal Heading</ModalHeader>
                <ModalBody>
                  <h4>Text in a modal</h4>
                  <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                  <h4>Popover in a modal</h4>
                  <p>This <Button id="popover" onClick={this.togglePopover}>button</Button>
                    <Popover placement="right" isOpen={this.state.popoverOpen} target="popover" toggle={this.togglePopover}>
                      <PopoverTitle>A Title</PopoverTitle>
                      <PopoverContent>
                        And here&#39;s some amazing content. It&#39;s very engaging. right?
                      </PopoverContent>
                    </Popover> should trigger a popover on click.
                  </p>

                  <h4>Tooltips in a modal</h4>
                  <p>
                    <a href="#" className="tooltip-test" id="this-link">This link </a>
                    <UncontrolledTooltip placement="top" target="this-link">
                      Tooltip
                    </UncontrolledTooltip>
                    and
                    <a href="#" className="tooltip-test" id="that-link"> that link</a>
                    <UncontrolledTooltip placement="top" target="that-link">
                      Tooltip
                    </UncontrolledTooltip>
                    should have tooltips on hover.
                  </p>
                  <hr />

                  <h4>Blah blah blah text</h4>
                  <p>Cras mattis consectetur purus sit amet fermentum.
                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  </p>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggle2}>Cancel</Button>
                  <Button color="primary">Save changes</Button>
                </ModalFooter>
              </Modal>
            </Widget>
          </Col>
        </Row>
      </div>);
  }

}

export default withStyles(s)(Dialogs);
