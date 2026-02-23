import React, { useState } from 'react';
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import InputValidation from '../../../components/InputValidation';
import Widget from '../../../components/Widget';
import Formik from './Formik';

const initialValues = {
  basic: '',
  'basic-change': '',
  email: '',
  number: '',
  range: '',
  password: '',
  'password-r': '',
  website: '',
};

const Validation = () => {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1 className="page-title">Form - <span className="fw-semi-bold">Validation</span>
      </h1>

      <Row>
        <Col lg={{ size: 6, offset: 0 }} xs={{ size: 12, offset: 0 }}>
          <Widget
            title={<h5> Dead simple validation
              <small> No JS needed to tune-up</small>
            </h5>}
            close
            collapse
          >
            <Form onSubmit={handleSubmit}>
              <fieldset>
                <legend>
                  By default validation is started only after at least 3 characters have been input.
                </legend>
                <FormGroup row>
                  <Label md={3} xs={12} for="basic">Simple required</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="basic"
                      name="basic"
                      required
                      value={values.basic}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="basic-change">Min-length On Change
                    <span className="help-block"> At least 10 </span>
                  </Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="basic-change"
                      name="basic-change"
                      trigger="change"
                      validations={{ minLength: 10 }}
                      validationErrors={{
                        minLength: 'This value is too short. It should have 10 characters or more.',
                      }}
                      required
                      value={values['basic-change']}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>
              </fieldset>
              <fieldset>
                <legend>
                  <span className="badge badge-warning text-gray-dark me-1">
                    HTML5 </span> input types supported
                </legend>
                <FormGroup row>
                  <Label md={3} xs={12} for="email">E-mail</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="email"
                      name="email"
                      trigger="change"
                      required
                      validations={{ isEmail: true }}
                      validationErrors={{ isEmail: 'This value should be a valid email.' }}
                      value={values.email}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                    <span className="help-block">
                      This one is triggered even when 1 character has been input
                    </span>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="number">Number</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="number"
                      name="number"
                      required
                      validations="isNumeric"
                      validationErrors={{ isNumeric: 'This value should be a valid number.' }}
                      value={values.number}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} xs={12} for="range">Range</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="range"
                      name="range"
                      trigger="change"
                      required
                      validations="isRange:[10,100]"
                      validationErrors={{ isRange: 'This value should be between 10 and 100.' }}
                      value={values.range}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>
              </fieldset>

              <fieldset>
                <legend>
                  More validation
                </legend>
                <FormGroup row>
                  <Label md={3} xs={12} for="password"> Password helpers</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="password"
                      id="password"
                      name="password"
                      trigger="change"
                      className="mb-xs"
                      validations={{ minLength: 6 }}
                      validationErrors={{
                        minLength: 'This value is too short. It should have 6 characters or more.',
                      }}
                      required
                      value={values.password}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                    <InputValidation
                      type="password"
                      id="password-r"
                      name="password-r"
                      trigger="change"
                      className="mb-sm"
                      validations={{ equalsField: 'password', minLength: 6 }}
                      validationErrors={{
                        equalsField: 'This value should be the same.',
                        minLength: 'This value is too short. It should have 6 characters or more.',

                      }}
                      required
                      value={values['password-r']}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Label md={3} xs={12} for="website">Website</Label>
                  <Col md={9} xs={12}>
                    <InputValidation
                      type="text"
                      id="website"
                      name="website"
                      trigger="change"
                      validations="isUrl"
                      validationErrors={{
                        isUrl: 'This value should be a valid url.',
                      }}
                      required
                      value={values.website}
                      onChange={handleInputChange}
                      formValues={values}
                      submitted={submitted}
                    />
                  </Col>
                </FormGroup>
              </fieldset>

              <div className="form-action bg-transparent ps-0 pe-0">
                <Button type="submit" color="danger" className="btn-rounded float-end">Validate & Submit</Button>
                <Button type="button" color="default" className="btn-rounded">Cancel</Button>
              </div>
            </Form>
          </Widget>
        </Col>
        <Col lg={{ size: 6, offset: 0 }} xs={{ size: 12, offset: 0 }}>
          <Widget title={<h5> Dead simple formik</h5>} close collapse>
            <Formik />
          </Widget>
        </Col>
      </Row>
    </div>
  );
};

export default Validation;
