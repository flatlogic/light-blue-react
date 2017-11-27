import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Collapse,
} from 'reactstrap';
import classnames from 'classnames';

import s from './Accordion.scss';

class Accordion extends React.Component {

  constructor(props) {
    super(props);
    this.toggleAccordionFirst = this.toggleAccordionFirst.bind(this);
    this.state = {
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      accordionFirstContent: [{
        title: 'Collapsible Group Item',
        body: `<p><span class="fw-semi-bold">Light Blue</span> - is a next generation admin template based
        on the latest Metro design. There are few reasons we want to tell you, why we have created it:
        We didn't like the darkness of most of admin templates, so we created this light one.
        We didn't like the high contrast of most of admin templates, so we created this unobtrusive one.
        We searched for a solution of how to make widgets look like real widgets, so we decided that
        deep background - is what makes widgets look real.
        </p>
        <p class="no-margin text-muted"><em>- Some One</em></p>`,
      }, {
        title: 'Normal Text Insertion',
        body: `Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's very
        controversial point. I think the opposite actually. Everyone knows what is lore ipsum
        - it is easy to understand if text is lore ipsum. You'll automatically skip -
        because you know - it's just non-informative stub. But what if there some text like
        this one? You start to read it! But the goal of this text is different. The goal is
        the example. So a bit of Lore Ipsum is always very good practice. Keep it in mind!`,
      }, {
        title: 'Check It',
        body: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
        ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck 
        quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin`,
      }],
      accordionSecondContent: [{
        title: 'Collapsible Group Item',
        body: `<p><span class="fw-semi-bold">Light Blue</span> - is a next generation admin template based
        on the latest Metro design. There are few reasons we want to tell you, why we have created it:
        We didn't like the darkness of most of admin templates, so we created this light one.
        We didn't like the high contrast of most of admin templates, so we created this unobtrusive one.
        We searched for a solution of how to make widgets look like real widgets, so we decided that
        deep background - is what makes widgets look real.
        </p>
        <p class="no-margin text-muted"><em>- Some One</em></p>`,
      }, {
        title: 'Normal Text Insertion',
        body: `Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's very
        controversial point. I think the opposite actually. Everyone knows what is lore ipsum
        - it is easy to understand if text is lore ipsum. You'll automatically skip -
        because you know - it's just non-informative stub. But what if there some text like
        this one? You start to read it! But the goal of this text is different. The goal is
        the example. So a bit of Lore Ipsum is always very good practice. Keep it in mind!`,
      }, {
        title: 'Check It',
        body: `Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson
        ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck 
        quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin`,
      }],
    };
  }

  toggleAccordionFirst(id) {
    const arr = [];
    arr.length = this.state.accordionFirst.length;
    arr.fill(false);
    arr[id] = !this.state.accordionFirst[id];
    this.setState({
      accordionFirst: arr,
    });
  }

  toggleAccordionSecond(id) {
    const arr = this.state.accordionSecond;
    arr[id] = !this.state.accordionSecond[id];
    this.setState({
      accordionSecond: arr,
    });
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Accordion
          <small> Simple and toggle accordion</small>
        </h2>
        <Row className="mt-xs">
          <Col md="6" xs="12">
            <h4><strong>Simple</strong> Accordion</h4>
            <div className="card-columns">
              {this.state.accordionFirstContent.map((element, index) =>
                (
                  <div className="card mb-xs" key={`accord-one-${index.toString()}`}>
                    <div
                      className="card-header"
                      role="button"
                      onClick={() => {
                        this.toggleAccordionFirst(index);
                      }}
                    >
                      <div className="mb-0">
                        <a className="accordion-toggle" role="button">
                          {element.title}
                          <i
                            className={classnames(
                              'fa float-right fa-angle-left',
                              { rotate: this.state.accordionFirst[index] },
                            )}
                          />
                        </a>
                      </div>
                    </div>
                    <Collapse isOpen={this.state.accordionFirst[index]}>
                      {/* eslint-disable */}
                      <div className="card-body" dangerouslySetInnerHTML={{ __html: element.body }} />
                      {/* eslint-enable */}
                    </Collapse>
                  </div>))}
            </div>
          </Col>
          <Col md="6" xs="12">
            <h4><strong>Toggle</strong> Accordion</h4>
            <div className="card-columns">
              {this.state.accordionSecondContent.map((element, index) => (
                <div className="card mb-xs" key={`accord-one-${index.toString()}`}>
                  <div
                    className="card-header"
                    role="button"
                    onClick={() => {
                      this.toggleAccordionSecond(index);
                    }}
                  >
                    <div className="mb-0">
                      <a className="accordion-toggle" role="button">
                        { element.title }
                        <i
                          className={classnames(
                            'fa float-right fa-angle-left',
                            { rotate: this.state.accordionSecond[index] },
                          )}
                        />
                      </a>
                    </div>
                  </div>
                  <Collapse className="" isOpen={this.state.accordionSecond[index]}>
                    {/* eslint-disable */}
                    <div className="card-body" dangerouslySetInnerHTML={{ __html: element.body }} />
                    {/* eslint-enable */}
                  </Collapse>
                </div>))}
            </div>
          </Col>
        </Row>
      </div>);
  }

}

export default withStyles(s)(Accordion);
