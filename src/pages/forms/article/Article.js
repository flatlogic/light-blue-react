import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonToolbar,
  Button,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Datetime from 'react-datetime';
import MaskedInput from 'react-maskedinput';

import Widget from '../../../components/Widget';
import s from './Article.scss';

class Article extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      statusDropdownValue: 'Draft',
      languageDropdownValue: 'All Languages',
      categoryDropdownValue: 'Design',
      visibilityDropdownValue: 'Everyone',
      isDatePickerOpen: false,
    };

    this.changeStatusDropdown = this.changeStatusDropdown.bind(this);
    this.changeLanguageDropdown = this.changeLanguageDropdown.bind(this);
    this.changeCategoryDropdown = this.changeCategoryDropdown.bind(this);
    this.changeVisibilityDropdown = this.changeVisibilityDropdown.bind(this);
  }

  changeStatusDropdown(e) {
    this.setState({ statusDropdownValue: e.currentTarget.textContent });
  }

  changeLanguageDropdown(e) {
    this.setState({ languageDropdownValue: e.currentTarget.textContent });
  }

  changeCategoryDropdown(e) {
    this.setState({ categoryDropdownValue: e.currentTarget.textContent });
  }

  changeVisibilityDropdown(e) {
    this.setState({ visibilityDropdownValue: e.currentTarget.textContent });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Article Demo
          <small> Out of the box form</small>
        </h2>
        <Row>
          <Col lg="8">
            <Widget
              title={
                <h4><i className="fa fa-file-alt" />Article
                  <small> Create
                    new or edit existing article
                  </small>
                </h4>
              }
            >
              <Form method="post">
                <FormGroup row>
                  <Col md={3}>
                    <Label htmlFor="title" className="col-form-label float-md-right">
                      Title <span className="required">*</span>
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="text" name="title" id="title" className="input-transparent" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={3}>
                    <Label className="col-form-label float-md-right">
                      Content
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="textarea" className="input-transparent" rows="6" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={3}>
                    <Label className="col-form-label float-md-right">
                      Description
                    </Label>
                  </Col>
                  <Col md={9}>
                    <Input type="textarea" className="article-description input-transparent" rows="3" />
                    <span className="help-block">Optional summary of your article that can be used in previews</span>
                  </Col>
                </FormGroup>
                <div className="form-actions">
                  <ButtonToolbar className="justify-content-md-center">
                    <Button type="submit" color="success">Submit</Button>
                    <Button type="button" color="secondary">Cancel</Button>
                  </ButtonToolbar>
                </div>
              </Form>
            </Widget>
          </Col>
          <Col lg="4">
            <Widget
              title={<h4><i className="fa fa-cog" /> Options
                <small> Publishing, categories</small>
              </h4>}
            >
              <Form method="post" className="form-horizontal form-label-left">
                <fieldset>
                  <legend className="section">Publishing</legend>
                  <FormGroup row>
                    <Col md={4}>
                      <Label className="col-form-label">Status</Label>
                    </Col>
                    <Col md={8}>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle
                          caret color="success"
                          className="dropdown-toggle-split mr-xs"
                        >
                          {this.state.statusDropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={this.changeStatusDropdown}>
                            Draft
                          </DropdownItem>
                          <DropdownItem onClick={this.changeStatusDropdown}>
                            Published
                          </DropdownItem>
                          <DropdownItem onClick={this.changeStatusDropdown}>
                            Pending Review
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={4}>
                      <Label className="col-form-label">Publish at</Label>
                    </Col>
                    <Col md={8}>
                      <Datetime
                        id="datepicker"
                        open={this.state.isDatePickerOpen}
                        viewMode="days"
                        timeFormat={false}
                      />
                      <MaskedInput type="text" className="form-control mt-2" mask="11:11" />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={4}>
                      <Label className="col-form-label">Language</Label>
                    </Col>
                    <Col md={8}>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle
                          caret color="success"
                          className="dropdown-toggle-split mr-xs"
                        >
                          {this.state.languageDropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={this.changeLanguageDropdown}>
                            All Languages
                          </DropdownItem>
                          <DropdownItem onClick={this.changeLanguageDropdown}>
                            English
                          </DropdownItem>
                          <DropdownItem onClick={this.changeLanguageDropdown}>
                            Belarusian
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Col>
                  </FormGroup>
                </fieldset>
                <fieldset>
                  <legend className="section">Category</legend>
                  <FormGroup row>
                    <Col md={4}>
                      <Label className="col-form-label">Category</Label>
                    </Col>
                    <Col md={8}>
                      <UncontrolledButtonDropdown>
                        <DropdownToggle
                          caret color="warning"
                          className="dropdown-toggle-split mr-xs"
                        >
                          {this.state.categoryDropdownValue}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem onClick={this.changeCategoryDropdown}>
                            Design
                          </DropdownItem>
                          <DropdownItem onClick={this.changeCategoryDropdown}>
                            Bootstrap
                          </DropdownItem>
                          <DropdownItem onClick={this.changeCategoryDropdown}>
                            ThemeForest
                          </DropdownItem>
                          <DropdownItem onClick={this.changeCategoryDropdown}>
                            Personal Developement
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md={4}>
                      <Label className="col-form-label">Category</Label>
                    </Col>
                    <Col md={8}>
                      <Input />
                    </Col>
                  </FormGroup>
                </fieldset>
              </Form>
            </Widget>
            <Widget
              title={<h4><i className="fa fa-key" /> Access</h4>}
            >
              <Form method="post" className="form-horizontal form-label-left">
                <FormGroup row>
                  <Col md={4}>
                    <Label className="col-form-label">Visibility</Label>
                  </Col>
                  <Col md={8}>
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        caret color="warning"
                        className="dropdown-toggle-split mr-xs"
                      >
                        {this.state.visibilityDropdownValue}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={this.changeVisibilityDropdown}>
                          Everyone
                        </DropdownItem>
                        <DropdownItem onClick={this.changeVisibilityDropdown}>
                          Registered
                        </DropdownItem>
                        <DropdownItem onClick={this.changeVisibilityDropdown}>
                          Editors
                        </DropdownItem>
                        <DropdownItem onClick={this.changeVisibilityDropdown}>
                          Admins
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md={4}>
                    <Label className="col-form-label" htmlFor="article-password">Password</Label>
                  </Col>
                  <Col md={8}>
                    <Input type="password" id="article-password" />
                  </Col>
                </FormGroup>
              </Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Article);
