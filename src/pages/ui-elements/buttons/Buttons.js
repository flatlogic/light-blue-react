import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Widget from '../../../components/Widget';

import s from './Buttons.scss';


class Buttons extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOne = this.toggleOne.bind(this);
    this.toggleTwo = this.toggleTwo.bind(this);
    this.toggleThree = this.toggleThree.bind(this);
    this.toggleFour = this.toggleFour.bind(this);
    this.toggleFive = this.toggleFive.bind(this);
    this.toggleSix = this.toggleSix.bind(this);
    this.toggleSeven = this.toggleSeven.bind(this);

    this.onRadioBtnClickOne = this.onRadioBtnClickOne.bind(this);
    this.onRadioBtnClickTwo = this.onRadioBtnClickTwo.bind(this);
    this.onCheckboxBtnClickOne = this.onCheckboxBtnClickOne.bind(this);
    this.onCheckboxBtnClickTwo = this.onCheckboxBtnClickTwo.bind(this);

    this.state = {
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      dropdownOpenFour: false,
      dropdownOpenFive: false,
      cSelectedOne: [2],
      cSelectedTwo: [1, 3],
      rSelectedTwo: 2,
      rSelectedOne: null,
    };
  }

  onRadioBtnClickOne(rSelectedOne) {
    this.setState({rSelectedOne});
  }

  onRadioBtnClickTwo(rSelectedTwo) {
    this.setState({rSelectedTwo});
  }

  onCheckboxBtnClickOne(selected) {
    const index = this.state.cSelectedOne.indexOf(selected);
    if (index < 0) {
      this.state.cSelectedOne.push(selected);
    } else {
      this.state.cSelectedOne.splice(index, 1);
    }
    this.setState({cSelectedOne: [...this.state.cSelectedOne]});
  }

  onCheckboxBtnClickTwo(selected) {
    const index = this.state.cSelectedTwo.indexOf(selected);
    if (index < 0) {
      this.state.cSelectedTwo.push(selected);
    } else {
      this.state.cSelectedTwo.splice(index, 1);
    }
    this.setState({cSelectedTwo: [...this.state.cSelectedTwo]});
  }

  toggleOne() {
    this.setState({
      dropdownOpenOne: !this.state.dropdownOpenOne,
    });
  }

  toggleTwo() {
    this.setState({
      dropdownOpenTwo: !this.state.dropdownOpenTwo,
    });
  }

  toggleThree() {
    this.setState({
      dropdownOpenThree: !this.state.dropdownOpenThree,
    });
  }

  toggleFour() {
    this.setState({
      dropdownOpenFour: !this.state.dropdownOpenFour,
    });
  }

  toggleFive() {
    this.setState({
      dropdownOpenFour: !this.state.dropdownOpenFour,
    });
  }

  toggleSix() {
    this.setState({
      dropdownOpenFour: !this.state.dropdownOpenFour,
    });
  }

  toggleSeven() {
    this.setState({
      dropdownOpenFour: !this.state.dropdownOpenFour,
    });
  }


  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Buttons
          <small>Buttons, states and more</small>
        </h2>

        <Row>
          <Col lg={6}>
            {/* Color options*/}
            <Widget
              title={<h4><i className="fa fa-star"/> Default buttons
                <small> Classes on hover</small>
              </h4>}
            >
              <div className="card text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="secondary" className="width-100 mb-xs mr-xs">Secondary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="primary" className="width-100 mb-xs mr-xs">Primary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="info" className="width-100 mb-xs mr-xs">&nbsp;Info&nbsp;</Button>
                  </Col>
                </div>
              </div>
              <div className="card text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="success" className="width-100 mb-xs mr-xs">Success</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="warning" className="width-100 mb-xs mr-xs">Warning</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="danger" className="width-100 mb-xs mr-xs">Danger</Button>
                  </Col>
                </div>
              </div>
              <div className="card bg-addition text-center">
                <div className="row">
                  <Col sm={4} md={4}/>
                  <Col sm={4} md={4}>
                    <Button color="inverse" className="width-100 mb-xs mr-xs">Inverse</Button>
                  </Col>
                </div>
              </div>
            </Widget>
            {/* Size variants*/}
            <Widget
              title={<h4><i className="fa fa-star"/> Small ones</h4>}
            >
              <div className="card card-sm card-white text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="secondary" size="sm" className="width-100 mb-xs mr-xs">Secondary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="primary" size="sm" className="width-100 mb-xs mr-xs">Primary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="info" size="sm" className="width-100 mb-xs mr-xs">&nbsp;Info&nbsp;</Button>
                  </Col>
                </div>
              </div>
              <div className="card card-sm card-white text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="success" size="sm" className="width-100 mb-xs mr-xs">Success</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="warning" size="sm" className="width-100 mb-xs mr-xs">Warning</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="danger" size="sm" className="width-100 mb-xs mr-xs">Danger</Button>
                  </Col>
                </div>
              </div>
              <div className="card card-sm card-white text-center">
                <div className="row">
                  <Col sm={4} md={4}/>
                  <Col sm={4} md={4}>
                    <Button color="inverse" size="sm" className="width-100 mb-xs mr-xs">Inverse</Button>
                  </Col>
                </div>
              </div>
            </Widget>
            {/* Size variants*/}
            <Widget
              title={<h4><i className="fa fa-star"/> Large ones</h4>}
            >
              <div className="card card-sm text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="secondary" size="lg" className="width-100 mb-xs mr-xs">Secondary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="primary" size="lg" className="width-100 mb-xs mr-xs">Primary</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="info" size="lg" className="width-100 mb-xs mr-xs">&nbsp;Info&nbsp;</Button>
                  </Col>
                </div>
              </div>
              <div className="card card-sm text-center">
                <div className="row">
                  <Col sm={4} md={4}>
                    <Button color="success" size="lg" className="width-100 mb-xs mr-xs">Success</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="warning" size="lg" className="width-100 mb-xs mr-xs">Warning</Button>
                  </Col>
                  <Col sm={4} md={4}>
                    <Button color="danger" size="lg" className="width-100 mb-xs mr-xs">Danger</Button>
                  </Col>
                </div>
              </div>
              <div className="card card-sm text-center">
                <div className="row">
                  <Col sm={4} md={4}/>
                  <Col sm={4} md={4}>
                    <Button color="inverse" size="lg" className="width-100 mb-xs mr-xs">Inverse</Button>
                  </Col>
                </div>
              </div>
            </Widget>
          </Col>
          <Col lg={6}>
            <Widget
              title={<h4><i className="fa fa-cogs"/> Options</h4>}
            >
              {/* Disabled Buttons*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Disabled state</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <Button color="secondary" className="width-100 mb-xs mr-xs" disabled>Secondary</Button>
                    <Button color="primary" className="width-100 mb-xs mr-xs" disabled>Primary</Button>
                    <Button color="info" className="width-100 mb-xs mr-xs" disabled>Info</Button>
                    <Button color="inverse" className="width-100 mb-xs mr-xs" disabled>Inverse</Button>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col md={12}>
                    <Button color="success" className="width-100 mb-xs mr-xs" disabled>Success</Button>
                    <Button color="warning" className="width-100 mb-xs mr-xs" disabled>Warning</Button>
                    <Button color="danger" className="width-100 mb-xs mr-xs" disabled>Danger</Button>
                  </Col>
                </Row>
              </div>
              {/* Buttons Groups*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Button groups</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <ButtonGroup className="mb-xs">
                      <Button color="primary">One</Button>
                      <Button color="primary">Two</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row className="text-center">
                  <Col md={12}>
                    <Button color="success" className="mr-xs">
                      <i className="fa fa-align-left"/>
                    </Button>
                    <Button color="warning" className="mr-xs">
                      <i className="fa fa-align-center"/>
                    </Button>
                    <Button color="danger" className="mr-xs">
                      <i className="fa fa-align-right"/>
                    </Button>
                  </Col>
                </Row>
              </div>
              {/* Button Dropdowns*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Button dropdown menus</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <ButtonDropdown isOpen={this.state.dropdownOpenOne} toggle={this.toggleOne}>
                      <DropdownToggle caret color="danger" className="width-100 mb-xs mr-xs">
                        One
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.dropdownOpenTwo} toggle={this.toggleTwo}>
                      <DropdownToggle caret color="secondary" className="width-100 mb-xs mr-xs">
                        Two
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.dropdownOpenThree} toggle={this.toggleThree}>
                      <DropdownToggle caret color="warning" className="width-100 mb-xs mr-xs">
                        Three
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </div>
              {/* Button Dropdowns*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Segmented dropdowns</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <ButtonDropdown className="mr-2" isOpen={this.state.dropdownOpenFive} toggle={this.toggleFive}>
                      <Button>{this.props.text}</Button>
                      <DropdownToggle caret size="lg">Gray</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown className="mr-2" isOpen={this.state.dropdownOpenSix} toggle={this.toggleSix}>
                      <Button color="inverse">{this.props.text}</Button>
                      <DropdownToggle caret color="inverse">Gray</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown className="mr-2" isOpen={this.state.dropdownOpenSeven} toggle={this.toggleSeven}>
                      <Button color="info">{this.props.text}</Button>
                      <DropdownToggle caret color="info" size="sm">Gray</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    <ButtonDropdown isOpen={this.state.dropdownOpenSeven} toggle={this.toggleSeven}>
                      <Button color="primary">{this.props.text}</Button>
                      <DropdownToggle caret color="primary" size="sm">Gray</DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </div>
              {/* Button Checkboxes*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Checkboxes</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <ButtonGroup>
                      <Button
                        color="secondary" onClick={() => this.onCheckboxBtnClickOne(1)}
                        active={this.state.cSelectedOne.includes(1)}
                      >Left way</Button>
                      <Button
                        color="secondary" onClick={() => this.onCheckboxBtnClickOne(2)}
                        active={this.state.cSelectedOne.includes(2)}
                      >Middle way</Button>
                      <Button
                        color="secondary" onClick={() => this.onCheckboxBtnClickOne(3)}
                        active={this.state.cSelectedOne.includes(3)}
                      >Right way</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              {/* Button Radio*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Radio</blockquote>
                <Row className="text-center mb-3">
                  <Col md={12}>
                    <ButtonGroup>
                      <Button
                        color="success" onClick={() => this.onRadioBtnClickOne(1)}
                        active={this.state.rSelectedOne === 1}
                      >Left way</Button>
                      <Button
                        color="success" onClick={() => this.onRadioBtnClickOne(2)}
                        active={this.state.rSelectedOne === 2}
                      >Middle way</Button>
                      <Button
                        color="success" onClick={() => this.onRadioBtnClickOne(3)}
                        active={this.state.rSelectedOne === 3}
                      >Right way</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
              {/* Block Buttons*/}
              <div className="card card-sm">
                <blockquote className="blockquote-sm mb-3">Block level buttons</blockquote>
                <Row className="justify-content-center mb-3">
                  <Col md={8}>
                    <Button color="warning" size="lg" block>Block level</Button>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <Col md={8}>
                    <Button color="danger" size="lg" block>Block level</Button>
                  </Col>
                </Row>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withStyles(s)(Buttons);
