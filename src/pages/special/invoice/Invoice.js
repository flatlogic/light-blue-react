/* eslint class-methods-use-this: ["error", { "exceptMethods": ["printInvoice"] }] */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Table,
  ButtonToolbar,
  Button,
} from 'reactstrap';

import s from './Invoice.scss';
import Widget from '../../../components/Widget';
import iLogo from '../../../images/logo.png';

class Stats extends React.Component {

  printInvoice() {
    window.print();
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Invoice&nbsp;
          <small>Print optimized page</small>
        </h2>
        <Widget className="no-margin">
          <Row>
            <Col sm={6} className="col-print-6">
              <img src={iLogo} alt="Logo" className={s.invoiceLogo} />
            </Col>
            <Col sm={6} className="col-print-6">
              <div className={`${s.invoiceNumber} text-right`}>
                #4346345 / 6 Nov 2014
              </div>
              <div className={`${s.invoiceNumberInfo} text-right`}>
                Some Invoice number description or whatever
              </div>
            </Col>
          </Row>
          <hr />
          <section className={`${s.invoiceInfo} card card-well`}>
            <Row>
              <Col sm={6} className="col-print-6">
                <h4 className={s.detailsTitle}>Company Information</h4>
                <h3 className="mt-1">
                  Wrapbootstrap LLC
                </h3>
                <address>
                  <strong>2 Infinite Loop</strong><br />
                  Minsk, Belarus 220004<br />
                  088.253.5345<br />
                  <abbr title="Work email">e-mail:</abbr> <a href="mailto:#">email@example.com</a><br />
                  <abbr title="Work Phone">phone:</abbr> (012) 345-678-901<br />
                  <abbr title="Work Fax">fax:</abbr> (012) 678-132-901
                </address>
              </Col>
              <Col sm={6} className={`${s.clientDetails} col-print-6`}>
                <h4 className={s.detailsTitle}>Client Information</h4>
                <h3 className="mt-1">Veronica Niasvizhskaja</h3>
                <address>
                  <strong>Consultant</strong> at
                  <strong><a href="#">Allspana</a></strong><br />
                  <abbr title="Work email">e-mail:</abbr> <a href="mailto:#">maryna@allspana.by</a><br />
                  <abbr title="Work Phone">phone:</abbr> (012) 345-678-901<br />
                  <abbr title="Work Fax">fax:</abbr> (012) 678-132-901
                  <p className="margin-none"><strong>Note:</strong><br />Some nights I stay up cashing in my bad luck.
                    Some nights I call it a draw</p>
                </address>
              </Col>
            </Row>
          </section>
          <Table className="table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th className="hidden-sm-down hidden-print">Description</th>
                <th>Quantity</th>
                <th className="hidden-sm-down hidden-print">Price per Unit</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Brand-new 27 monitor</td>
                <td className="hidden-sm-down hidden-print">2,560x1,440-pixel (WQHD) resolution supported!</td>
                <td>2</td>
                <td className="hidden-sm-down hidden-print">700</td>
                <td>1,400.00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Domain: okendoken.com</td>
                <td className="hidden-sm-down hidden-print">6-month registration</td>
                <td>1</td>
                <td className="hidden-sm-down hidden-print">10.99</td>
                <td>21.88</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Atlas Shrugged</td>
                <td className="hidden-sm-down hidden-print">Novel by Ayn Rand, first published in 1957 in the United
                  States
                </td>
                <td>5</td>
                <td className="hidden-sm-down hidden-print">35</td>
                <td>175.00</td>
              </tr>
              <tr>
                <td>4</td>
                <td>New Song by Dr. Pre</td>
                <td className="hidden-sm-down hidden-print">Lyrics: praesent blandit augue non sapien ornare imperdiet
                </td>
                <td>1</td>
                <td className="hidden-sm-down hidden-print">2</td>
                <td>2.00</td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col sm={6} className="col-print-6">
              <blockquote className="blockquote blockquote-sm">
                <strong>Note:</strong>&nbsp;
                Keep in mind, sometimes bad things happen. But it&#39;s just sometimes.
              </blockquote>
            </Col>
            <Col sm={6} className="col-print-6">
              <Row className="text-right justify-content-end">
                <Col />
                <Col />
                <Col>
                  <p>Subtotal</p>
                  <p>Tax(10%)</p>
                  <p className="no-margin"><strong>Total</strong></p>
                </Col>
                <Col>
                  <p>1,598.88</p>
                  <p>159.89</p>
                  <p className="no-margin"><strong>1,758.77</strong></p>
                </Col>
              </Row>
            </Col>
          </Row>
          <p className="text-right mt-lg mb-xs">
            Marketing Consultant
          </p>
          <p className="text-right">
            <span className="fw-semi-bold">Bob Smith</span>
          </p>
          <ButtonToolbar className="mt-lg text-right hidden-print">
            <Button onClick={this.printInvoice} color="secondary" className="mr-2">
              <i className="fa fa-print" />
              &nbsp;&nbsp;
              Print
            </Button>
            <Button color="danger">
              Proceed with Payment
              &nbsp;
              <i className="fa fa-arrow-right" />
            </Button>
          </ButtonToolbar>
        </Widget>
      </div>);
  }

}

export default withStyles(s)(Stats);
