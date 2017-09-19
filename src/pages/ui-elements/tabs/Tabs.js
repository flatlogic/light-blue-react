import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Collapse,
} from 'reactstrap';
import classnames from 'classnames';

import Widget from '../../../components/Widget';
import s from './Tabs.scss';

class TabsAccordion extends React.Component {

  constructor(props) {
    super(props);
    this.toggleFirstTabs = this.toggleFirstTabs.bind(this);
    this.toggleSecondTabs = this.toggleSecondTabs.bind(this);
    this.toggleThirdTabs = this.toggleThirdTabs.bind(this);
    this.state = {
      activeFirstTab: 'tab11',
      activeSecondTab: 'tab22',
      activeThirdTab: 'tab31',
      dropdownOpen: false,
    }
  };

  toggleFirstTabs(tab) {
    if (this.state.activeFirstTab !== tab) {
      this.setState({
        activeFirstTab: tab,
      });
    }
  }

  toggleSecondTabs(tab) {
    if (this.state.activeSecondTab !== tab) {
      this.setState({
        activeSecondTab: tab,
      });
    }
  }

  toggleThirdTabs(tab) {
    if (this.state.activeThirdTab !== tab) {
      this.setState({
        activeThirdTab: tab,
      });
    }
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Tabs
          <small> Tabs-enabled widget and more</small>
        </h2>
        <Row>
          <Col md="2"/>
          <Col md="6" xs="12">
            <div className="clearfix">
              <Nav tabs className="float-left">
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeFirstTab === 'tab11'})}
                    onClick={() => {
                      this.toggleFirstTabs('tab11');
                    }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeFirstTab === 'tab12'})}
                    onClick={() => {
                      this.toggleFirstTabs('tab12');
                    }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <UncontrolledDropdown>

                    <NavLink
                      className={classnames({active: this.state.activeFirstTab === 'tab13' || this.state.activeFirstTab === 'tab14'})}
                    >
                      <span
                        data-toggle="dropdown"
                      >Dropdown <b className="caret"/></span>
                      <DropdownMenu>
                        <div
                          role="menuitem"
                          className="dropdown-item display-block"
                          onClick={() => {
                            this.toggleFirstTabs('tab13');
                          }}
                        >@fat
                        </div>
                        <div
                          role="menuitem"
                          className="dropdown-item display-block"
                          onClick={() => {
                            this.toggleFirstTabs('tab14');
                          }}
                        >@mdo
                        </div>
                      </DropdownMenu>
                    </NavLink>
                  </UncontrolledDropdown>

                </NavItem>
              </Nav>
            </div>
            <TabContent activeTab={this.state.activeFirstTab}>
              <TabPane tabId="tab11">
                <h3>Tabs-enabled widget</h3>
                <p>You will never know exactly how something will go until you try it.</p>
                <p>{`You can think three hundred times and still have no precise result. If you see
                  attractive girl all you need to do is to go and ask her to give you her phone.
                  You don’t
                  need to think about HOW it can turn out. All you have to do is to GO and DO IT.
                  It
                  should be super-fast and easy. No hesitation. You ask me: “What to do with these
                  fearful thoughts preventing me from doing that?” The answer is to ignore them,
                  because
                  they can’t disappear immediately.`}</p>
                <p>The same thing is for startups and ideas. If you have an idea right away after
                  it appears in your mind you should go and make a first step to implement
                  it. </p>
                <div className="float-right">
                  <Button color="inverse" className="mr-xs">Cancel</Button>
                  <Button color="primary">Some button</Button>
                </div>
              </TabPane>

              <TabPane tabId="tab12">
                <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                  very controversial
                  point. I think the opposite actually. Everyone knows what is lore ipsum - it is
                  easy to understand if text is lore ipsum.`}</p>
                <div className="clearfix">
                  <div className="btn-toolbar">
                    <a className="btn btn-default">&nbsp;&nbsp;Check&nbsp;&nbsp;</a>
                    <a className="btn btn-primary">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</a>
                  </div>
                </div>
              </TabPane>

              <TabPane tabId="tab13">
                <p> If you will think too much it will sink in the swamp of never implemented
                  plans and
                  ideas or will just go away or will be implemented by someone else.</p>
                <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                <p>{`You'll automatically skip - because you know - it's just non-informative stub.
                  But what if there some text like this one?`}</p>
              </TabPane>

              <TabPane tabId="tab14">
                <blockquote className="blockquote-sm blockquote mb-xs">
                  Plan it? Make it!
                </blockquote>
                <p>The same thing is for startups and ideas. If you have an idea right away after
                  it appears
                  in your mind you should go and make a first step to implement it.</p>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
        <Row>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-down"/> Tabs inside of the body</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab21'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab21');
                    }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab22'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab22');
                    }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab23'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab23');
                    }}
                  >
                    <span>Works</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeSecondTab}>
                <TabPane tabId="tab21">
                  <p>
                    I had an idea named Great Work. It was a service aimed to help people find
                    their
                    passion.
                    Yes I know it sound crazy and super naïve but I worked on that. I started to
                    work
                    on
                    planning, graphics, presentations, pictures, descriptions, articles,
                    investments
                    and so on.
                    I worked on everything but not the project itself.
                  </p>
                </TabPane>
                <TabPane tabId="tab22">
                  <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                      very
                      controversial
                      point. I think the opposite actually. Everyone knows what is lore ipsum - it
                      is
                      easy to understand if text is lore ipsum.`}</p>
                  <div className="clearfix">
                    <div className="btn-toolbar">
                      <Button color="danger">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                      <Button color="secondary">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tab23">
                  <p> If you will think too much it will sink in the swamp of never implemented
                    plans
                    and
                    ideas or will just go away or will be implemented by someone else.</p>
                  <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                  <p>{`You'll automatically skip - because you know - it's just non-informative
                      stub.
                      But what if there some text like this one?`}</p>
                </TabPane>
              </TabContent>
            </Widget>
          </Col>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-up"/> Tabs on the bottom</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab21'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab21');
                    }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab22'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab22');
                    }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab23'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab23');
                    }}
                  >
                    <span>Works</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeSecondTab}>
                <TabPane tabId="tab21">
                  <p>
                    I had an idea named Great Work. It was a service aimed to help people find
                    their
                    passion.
                    Yes I know it sound crazy and super naïve but I worked on that. I started to
                    work
                    on
                    planning, graphics, presentations, pictures, descriptions, articles,
                    investments
                    and so on.
                    I worked on everything but not the project itself.
                  </p>
                </TabPane>
                <TabPane tabId="tab22">
                  <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                      very
                      controversial
                      point. I think the opposite actually. Everyone knows what is lore ipsum - it
                      is
                      easy to understand if text is lore ipsum.`}</p>
                  <div className="clearfix">
                    <div className="btn-toolbar">
                      <Button color="danger">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                      <Button color="secondary">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tab23">
                  <p> If you will think too much it will sink in the swamp of never implemented
                    plans
                    and
                    ideas or will just go away or will be implemented by someone else.</p>
                  <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                  <p>{`You'll automatically skip - because you know - it's just non-informative
                      stub.
                      But what if there some text like this one?`}</p>
                </TabPane>
              </TabContent>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-right"/> Tabs on the left</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab21'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab21');
                    }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab22'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab22');
                    }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab23'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab23');
                    }}
                  >
                    <span>Works</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeSecondTab}>
                <TabPane tabId="tab21">
                  <p>
                    I had an idea named Great Work. It was a service aimed to help people find
                    their
                    passion.
                    Yes I know it sound crazy and super naïve but I worked on that. I started to
                    work
                    on
                    planning, graphics, presentations, pictures, descriptions, articles,
                    investments
                    and so on.
                    I worked on everything but not the project itself.
                  </p>
                </TabPane>
                <TabPane tabId="tab22">
                  <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                      very
                      controversial
                      point. I think the opposite actually. Everyone knows what is lore ipsum - it
                      is
                      easy to understand if text is lore ipsum.`}</p>
                  <div className="clearfix">
                    <div className="btn-toolbar">
                      <Button color="danger">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                      <Button color="secondary">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tab23">
                  <p> If you will think too much it will sink in the swamp of never implemented
                    plans
                    and
                    ideas or will just go away or will be implemented by someone else.</p>
                  <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                  <p>{`You'll automatically skip - because you know - it's just non-informative
                      stub.
                      But what if there some text like this one?`}</p>
                </TabPane>
              </TabContent>
            </Widget>
          </Col>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-left" /> Tabs on the right</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab21'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab21');
                    }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab22'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab22');
                    }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({active: this.state.activeSecondTab === 'tab23'})}
                    onClick={() => {
                      this.toggleSecondTabs('tab23');
                    }}
                  >
                    <span>Works</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeSecondTab}>
                <TabPane tabId="tab21">
                  <p>
                    I had an idea named Great Work. It was a service aimed to help people find
                    their
                    passion.
                    Yes I know it sound crazy and super naïve but I worked on that. I started to
                    work
                    on
                    planning, graphics, presentations, pictures, descriptions, articles,
                    investments
                    and so on.
                    I worked on everything but not the project itself.
                  </p>
                </TabPane>
                <TabPane tabId="tab22">
                  <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                      very
                      controversial
                      point. I think the opposite actually. Everyone knows what is lore ipsum - it
                      is
                      easy to understand if text is lore ipsum.`}</p>
                  <div className="clearfix">
                    <div className="btn-toolbar">
                      <Button color="danger">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                      <Button color="secondary">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="tab23">
                  <p> If you will think too much it will sink in the swamp of never implemented
                    plans
                    and
                    ideas or will just go away or will be implemented by someone else.</p>
                  <p><strong>5 months of doing everything to achieve nothing.</strong></p>
                  <p>{`You'll automatically skip - because you know - it's just non-informative
                      stub.
                      But what if there some text like this one?`}</p>
                </TabPane>
              </TabContent>
            </Widget>
          </Col>
        </Row>
      </div>);
  }

}

export default withStyles(s)(TabsAccordion);
