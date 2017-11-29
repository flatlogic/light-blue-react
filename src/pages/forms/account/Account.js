import React from 'react';
import Select2 from 'react-select2-wrapper';
import Datetime from 'react-datetime';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  Button,
  InputGroup,
  InputGroupButton,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import Widget from '../../../components/Widget';
import s from './Account.scss';
import i3 from '../../../images/3.png';
import {
  select2CountryData,
  select2StateData,
  select2AccountGroupsList,
} from './Data';

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectWebsiteData: ['Admin', 'Main Website'],
      websiteSelectVal: 'Admin',

      isDatePickerOpen: false,
    };
  }

  websiteSelectChange(e) {
    this.setState({
      websiteSelectVal: e,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Account Demo
          <small> Out of the box form</small>
        </h2>
        <Row>
          <Col lg={7}>
            <Widget
              title={<h4><i className="fa fa-user" /> Account Profile
                <small> Create new or edit existing user</small>
              </h4>}
            >
              <Form>
                <Row>
                  <Col md={4}>
                    <div className="text-center">
                      <img className="rounded-circle" style={{ height: `${112} + px` }} src={i3} alt="64x64" />
                    </div>
                  </Col>
                  <Col md={6}>
                    <h3 className="mt-md mb-xs">Maryna Gils</h3>
                    <address>
                      <strong>Development manager</strong> at <strong><a href="#">Allexample Inc.</a></strong><br />
                      <abbr title="Work email">e-mail:</abbr>
                      <a href="mailto:#">maryna.gils@example.com</a><br />
                      <abbr title="Work Phone">phone:</abbr>
                      (123) 456-7890
                    </address>
                  </Col>
                </Row>
                <FormGroup tag="fieldset" className="mt-md">
                  <legend>Account Edit Form
                    <small> Some explanation text</small>
                  </legend>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend className="section">Personal Info</legend>
                  <FormGroup row>
                    <Label for="prefix" md={4}>Prefix</Label>
                    <Col md={4}>
                      <Input type="text" name="prefix" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="first-name" md={4}>First Name
                      <span>*</span>
                    </Label>
                    <Col md={8}>
                      <Input type="text" name="first-name" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="last-name" md={4}>Last Name
                      <span>*</span>
                    </Label>
                    <Col md={8}>
                      <Input type="text" name="last-name" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="middle-name" md={4}>Middle Name / Initial</Label>
                    <Col md={8}>
                      <Input type="text" name="Middle Name / Initial" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={4}>Gender</Label>
                    <Col md={6}>
                      <ButtonGroup>
                        <Button color="secondary">Male</Button>
                        <Button color="primary">Female</Button>
                      </ButtonGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="date-of-birth" md={4}>Date Of Birth
                      <span>*</span>
                    </Label>
                    <Col md={6}>
                      <Input type="text" name="date-of-birth" className="input-transparent" />
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend className="section">Contact Info</legend>
                  <FormGroup row>
                    <Label for="email" md={4}>Email
                      <span>*</span>
                    </Label>
                    <Col md={6}>
                      <InputGroup>
                        <Input type="text" name="email" className="input-transparent" />
                        <InputGroupButton><Button color="success">
                          Write an email
                        </Button></InputGroupButton>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="phone" md={4}>Phone
                      <span>*</span>
                    </Label>
                    <Col md={6}>
                      <InputGroup>
                        <Input type="text" name="phone" className="input-transparent" />
                        <InputGroupButton>
                          <UncontrolledButtonDropdown>
                            <DropdownToggle caret color="secondary">
                              Mobile
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>Mobile</DropdownItem>
                              <DropdownItem>Home</DropdownItem>
                              <DropdownItem>Work</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </InputGroupButton>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="fax" md={4}>Fax</Label>
                    <Col md={6}>
                      <InputGroup>
                        <Input type="text" name="fax" className="input-transparent" />
                        <InputGroupButton>
                          <UncontrolledButtonDropdown>
                            <DropdownToggle caret color="secondary">
                              Mobile
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>Mobile</DropdownItem>
                              <DropdownItem>Home</DropdownItem>
                              <DropdownItem>Work</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </InputGroupButton>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup tag="fieldset">
                  <legend className="section">
                    Address
                    <button type="button" className="btn btn-transparent btn-xs float-right">
                      <i className="fa fa-plus" /> Add Address
                    </button>
                  </legend>
                  <FormGroup row>
                    <Label for="email" md={4}>Address
                      <span>*</span>
                    </Label>
                    <Col md={6}>
                      <InputGroup className="mb-2">
                        <Input type="text" name="phone" className="input-transparent" />
                        <InputGroupButton>
                          <UncontrolledButtonDropdown>
                            <DropdownToggle caret color="secondary">
                              Mobile
                            </DropdownToggle>
                            <DropdownMenu>
                              <DropdownItem>Mobile</DropdownItem>
                              <DropdownItem>Home</DropdownItem>
                              <DropdownItem>Work</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledButtonDropdown>
                        </InputGroupButton>
                      </InputGroup>
                      <Input type="text" name="phone" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="sity" md={4}>Sity
                      <span>*</span>
                    </Label>
                    <Col md={6}>
                      <Input type="text" name="sity" className="input-transparent" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="fax" md={4}>State
                      <span>*</span>
                    </Label>
                    <Col md="4" className={s.select2}>
                      <Select2
                        data={select2StateData}
                        options={{
                          placeholder: 'Select state',
                        }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="fax" md={4}>Country
                      <span>*</span>
                    </Label>
                    <Col md="4" className={s.select2}>
                      <Select2
                        data={select2CountryData}
                        options={{
                          placeholder: 'Select country',
                        }}
                      />
                    </Col>
                  </FormGroup>
                </FormGroup>
                <FormGroup row className={s.submitBlock}>
                  <Label md={4} />
                  <Col md={7}>
                    <Button color="primary" type="submit" className="mr-xs">Validate & Submit</Button>
                    <Button color="inverse">Cancel</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Widget>
          </Col>
          <Col lg={5}>
            <Widget
              title={<h4><i className="fa fa-cogs" /> Account settings</h4>}
              customControls={
                <Button color="inverse" size="xs"><i className="fa fa-arrow-down" /> View more</Button>
              }
            >
              <Form>
                <FormGroup>
                  <Label for="datepicker">Account expiration date</Label>
                  <Datetime
                    id="datepicker"
                    className="datepicker"
                    open={this.state.isDatePickerOpen}
                    viewMode="days" timeFormat={false}
                    inputProps={{
                      ref: (input) => {
                        this.refDatePicker = input;
                      },
                    }}
                  />
                  <span className="help-block">Bootstrap datepicker</span>
                </FormGroup>
                <FormGroup className={s.select2} >
                  <Label>Associate to Website</Label>
                  <Select2
                    value={this.state.websiteSelectVal}
                    data={this.state.selectWebsiteData}
                  />
                </FormGroup>
                <FormGroup className={s.select2}>
                  <Label>Created By</Label>
                  <Select2
                    disabled
                    options={{ placeholder: 'Admin' }}
                  />
                </FormGroup>
                <FormGroup className={s.select2}>
                  <Label>Account Group</Label>
                  <Select2
                    multiple
                    data={select2AccountGroupsList}
                    options={{ placeholder: 'Choose one or more groups for account' }}
                  />
                </FormGroup>
                <FormGroup className="checkbox abc-checkbox" check>
                  <Input id="checkbox1" type="checkbox" />{' '}
                  <Label for="checkbox1" check >
                    Request password change
                  </Label>
                </FormGroup>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>

    );
  }

}

export default withStyles(s)(Account);
