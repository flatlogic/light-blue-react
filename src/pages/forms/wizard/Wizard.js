import React, { useMemo, useState } from 'react';
import {
  Row,
  Col,
  Button,
  FormGroup,
  Label,
  Nav,
  NavLink,
  NavItem,
  Progress,
} from 'reactstrap';
import Formsy from 'formsy-react';

import MaskedInput from 'components/MaskedInputField';
import Datetime from 'react-datetime';
import { select2CountriesData, select2ShipmentData, cardTypesData } from './data';

import Select from 'react-select';
import InputValidation from '../../../components/InputValidation/InputValidation';
import Widget from '../../../components/Widget';
import s from './Wizard.module.scss';

const count = 4;
const StepsComponents = {
  Step1: function Step1() {
    return (<fieldset>
      <FormGroup>
        <Label for="username">Username</Label>
        <InputValidation
          type="text"
          id="username"
          name="username"
          validations={{ isAlphanumeric: true }}
          trigger="change"
          required
          validationErrors={{ isAlphanumeric: 'Username can contain any letters or numbers, without spaces' }}
        />
        <p className="help-block">Username can contain any letters or numbers, without spaces</p>
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <InputValidation
          type="text"
          id="email"
          name="email"
          validations={{ isEmail: true }}
          required
          validationErrors={{ isEmail: 'Please provide your E-mail' }}
        />
        <p className="help-block">Please provide your E-mail</p>
      </FormGroup>
      <FormGroup>
        <Label for="address">Address</Label>
        <InputValidation
          type="text"
          id="address"
          name="address"
          validations={{ isAlpha: true }}
          required
          validationErrors={{ isAlpha: 'Please provide your address' }}
        />
        <p className="help-block">Please provide your address</p>
      </FormGroup>
    </fieldset>);
  },
  Step2: function Step2() {
    return (
      <fieldset>
        <FormGroup>
          <Label for="country-select">Destination Country</Label>
            <Select
              classNamePrefix="react-select"
              className="selectCustomization"
              options={select2CountriesData}
            />
          <p className="help-block">Please choose your country destination</p>
        </FormGroup>
        <FormGroup>
          <Label for="courier">Choose shipping option</Label>
            <Select
              classNamePrefix="react-select"
              className="selectCustomization"
              options={select2ShipmentData}
            />
          <p className="help-block">Please choose your shipping option</p>
        </FormGroup>
        <FormGroup>
          <Label for="destination">Destination Zip Code</Label>
          <MaskedInput
            className="form-control" id="destination" mask="111111"
            size="6"
          />
          <p className="help-block">Please provide your Destination Zip Code</p>
        </FormGroup>
        <FormGroup>
          <Label for="dest-address">Destination Address</Label>
          <InputValidation type="text" id="dest-address" name="dest-address" />
          <p className="help-block">Please provide the destination address</p>
        </FormGroup>
      </fieldset>
    );
  },
  Step3: function Step3(props) {
    return (
      <fieldset>
        <FormGroup>
          <Label for="name">Name on the Card</Label>
          <InputValidation type="text" id="name" name="name" />
        </FormGroup>
        <FormGroup>
          <Label for="credit-card-type">Choose shipping option</Label>
            <Select
              classNamePrefix="react-select"
              className="selectCustomization"
              options={cardTypesData}
            />
        </FormGroup>
        <FormGroup>
          <Label for="credit">Credit Card Number</Label>
          <InputValidation type="text" id="credit" name="credit" />
        </FormGroup>
        <FormGroup>
          <Label for="expiration-data">Expiration Date</Label>
          <div className="datepicker">
            <Datetime
              id="datepicker"
              open={props.isDatePickerOpen} //eslint-disable-line
              viewMode="days"
            />
          </div>
        </FormGroup>
      </fieldset>
    );
  },
  Step4: function Step4() {
    return (
      <fieldset>
        <h2>Thank you!</h2>
        <p>Your submission has been received.</p>
      </fieldset>
    );
  },

};

const Wizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDatePickerOpen] = useState(false);
  const progress = useMemo(() => (100 / count) * currentStep, [currentStep]);

  const nextStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep >= count) {
        return count;
      }
      return prevStep + 1;
    });
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep <= 1) {
        return 1;
      }
      return prevStep - 1;
    });
  };

  return (
    <div className={s.root}>
        <h1 className="page-title">Form - <span className="fw-semi-bold">Wizard</span>
        </h1>
        <Row>
          <Col sm={12}>
            <Widget
              close collapse
              className={s.formWizard}
              title={<div>
                <h4>
                  Wizard&nbsp;
                  <small>Tunable widget</small>
                </h4>
                <p className="text-muted">An example of complete wizard form in widget.</p></div>}
            >

              <Nav pills justified className={s.wizardNavigation}>
                <NavItem>
                  <NavLink active={currentStep === 1}>
                    <small>1.</small>
                    &nbsp;
                    Your Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 2}>
                    <small>2.</small>
                    &nbsp;
                    Shipping
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 3}>
                    <small>3.</small>
                    &nbsp;
                    Pay
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink active={currentStep === 4}>
                    <small>4.</small>
                    &nbsp;
                    Thank you!
                  </NavLink>
                </NavItem>
              </Nav>
              <Progress value={progress} color="success" className="progress-xs" />
              <div className="tab-content">
                <div className={s.stepBody}>
                  <Formsy>
                    {currentStep === 1 && <StepsComponents.Step1 />}
                    {currentStep === 2 && <StepsComponents.Step2 />}
                    {currentStep === 3 && <StepsComponents.Step3 isDatePickerOpen={isDatePickerOpen} />}
                    {currentStep === 4 &&
                    <StepsComponents.Step4 isDatePickerOpen={isDatePickerOpen} />}
                  </Formsy>
                </div>

                <div className="description">
                  <ul className="pager wizard">
                    <li className="previous">
                      <Button hidden={currentStep === 1} color="primary" onClick={previousStep}><i
                        className="fa fa-caret-left"
                      />
                        &nbsp;Previous</Button>
                    </li>
                    {/* {currentStep > 1 
                      ? <li className="previous">
                          <Button color="primary" onClick={this.previousStep}><i 
                            className="fa fa-caret-left"
                        />
                          &nbsp;Previous</Button>
                        </li>
                      : <li className="previous">
                          <Button hidden="true" color="primary" onClick={this.previousStep}><i 
                           className="fa fa-caret-left"
                        />
                          &nbsp;Previous</Button>
                        </li>
                    } */}
                    {currentStep < count &&
                    <li className="next">
                      <Button color="primary" onClick={nextStep}>Next <i className="fa fa-caret-right" /></Button>
                    </li>
                    }
                    {currentStep === count &&
                    <li className="finish">
                      <Button color="success">Finish <i className="fa fa-check" /></Button>
                    </li>
                    }
                  </ul>
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
  );
};

export default Wizard;
