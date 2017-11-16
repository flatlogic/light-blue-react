import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  ButtonToolbar,
} from 'reactstrap';
import Formsy from 'formsy-react';

import InputValidation from '../../../components/InputValidation/InputValidation';
import Widget from '../../../components/Widget';
import s from './Validation.scss';


class Validation extends React.Component {

  render() {
    return (
      <div>
        <h2 className="page-title">Validation
          <small>Form validation</small>
        </h2>
        <Row>
          <Col lg={8} xs={12}>
            <Widget
              title={<h4><i className="fa fa-check-square-o" /> Dead
                simple validation<small> no js needed to tune-up</small></h4>
              } close collapse
            >
              <Formsy.Form>
                <fieldset>
                  <legend className="section">
                    By default validation is started only after at least
                    3 characters have been input.
                  </legend>
                  <FormGroup row>
                    <Label lg={4} for="basic">Simple required</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="basic"
                        name="basic"
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label lg={4} for="basic-change">Min-length On Change
                      <span className="help-block"> At least 10 </span>
                    </Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="basic-change"
                        name="basic-change"
                        trigger="change"
                        validations={{ minLength: 10 }}
                        validationError={{
                          minLength: 'This value is too short. It should have 10 characters or more.',
                        }}
                        required
                      />
                    </Col>
                  </FormGroup>
                </fieldset>
                <fieldset>
                  <legend className="section">
                    <span className="badge badge-danger mr-xs">
                      HTML5 </span> input types supported
                  </legend>
                  <FormGroup row>
                    <Label lg={4} for="email">E-mail</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="email"
                        name="email"
                        trigger="change"
                        required
                        validations={{ isEmail: true }}
                        validationError={{ isEmail: 'This value should be a valid email.' }}
                      />
                      {/* todo: change triggered */}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label lg={4} for="number">Number</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="number"
                        name="number"
                        required
                        validations="isNumeric"
                        validationError={{ isNumeric: 'This value should be a valid number.' }}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label lg={4} for="range">Range</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="range"
                        name="range"
                        trigger="change"
                        required
                        validations="isRange:[10,100]"
                        validationError={{ isRange: 'This value should be between 10 and 100.' }}
                      />
                    </Col>
                  </FormGroup>
                </fieldset>

                <fieldset>
                  <legend className="section">
                    More validation
                  </legend>
                  <FormGroup row>
                    <Label lg={4} for="password"> Password helpers</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="password"
                        id="password"
                        name="password"
                        trigger="change"
                        validations={{ minLength: 6 }}
                        validationError={{
                          minLength: 'This value is too short. It should have 6 characters or more.',
                        }}
                        required
                      />
                      <InputValidation
                        inputClassName="input-transparent"
                        type="password"
                        id="password-r"
                        name="password-r"
                        trigger="change"
                        className="mt-sm"
                        validations={{ equalsField: 'password', minLength: 6 }}
                        validationError={{
                          equalsField: 'This value should be the same.',
                          minLength: 'This value is too short. It should have 6 characters or more.',

                        }}
                        required
                      />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Label lg={4} for="website">Website</Label>
                    <Col lg={5}>
                      <InputValidation
                        inputClassName="input-transparent"
                        type="text"
                        id="website"
                        name="website"
                        trigger="change"
                        validations="isUrl"
                        validationError={{
                          isUrl: 'This value should be a valid url.',
                        }}
                        required
                      />
                    </Col>
                  </FormGroup>
                </fieldset>
                <div className="form-actions">
                  <ButtonToolbar className="justify-content-md-center">
                    <Button type="submit" color="danger" className="btn-rounded float-right">Validate & Submit</Button>
                    <Button type="button" color="default" className="btn-rounded">Cancel</Button>
                  </ButtonToolbar>
                </div>
              </Formsy.Form>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withStyles(s)(Validation);
