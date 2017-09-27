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
    this.toggleFourthTabs = this.toggleFourthTabs.bind(this);
    this.toggleFifthTabs = this.toggleFifthTabs.bind(this);

    this.state = {
      activeFirstTab: 'tab11',
      activeSecondTab: 'tab22',
      activeThirdTab: 'tab33',
      activeFourthTab: 'tab43',
      activeFifthTab: 'tab52',
      dropdownOpen: false,
    };
  }

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

  toggleFourthTabs(tab) {
    if (this.state.activeFourthTab !== tab) {
      this.setState({
        activeFourthTab: tab,
      });
    }
  }

  toggleFifthTabs(tab) {
    if (this.state.activeFifthTab !== tab) {
      this.setState({
        activeFifthTab: tab,
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
          <Col md="2" />
          <Col md="6" xs="12">
            <Widget className="widget-tabs">
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFirstTab === 'tab11' })}
                    onClick={() => {
                      this.toggleFirstTabs('tab11');
                    }}
                  >
                    <span>Red</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFirstTab === 'tab12' })}
                    onClick={() => {
                      this.toggleFirstTabs('tab12');
                    }}
                  >
                    <span>Orange</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <UncontrolledDropdown>

                    <NavLink
                      className={classnames({ active: this.state.activeFirstTab === 'tab13' || this.state.activeFirstTab === 'tab14' })}
                    >
                      <span
                        data-toggle="dropdown"
                      >Dropdown <b className="caret" /></span>
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
                  <div className={s.tabPicture}>
                    <i className="fa fa-picture-o" />
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
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-down" /> Tabs inside of the body</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeSecondTab === 'tab21' })}
                    onClick={() => {
                      this.toggleSecondTabs('tab21');
                    }}
                  >
                    <span>Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeSecondTab === 'tab22' })}
                    onClick={() => {
                      this.toggleSecondTabs('tab22');
                    }}
                  >
                    <span>Profile</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeSecondTab === 'tab23' })}
                    onClick={() => {
                      this.toggleSecondTabs('tab23');
                    }}
                  >
                    <span>Dropdown</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeSecondTab}>
                <TabPane tabId="tab21">
                  <p>
                    Raw denim you probably haven&#39;t heard of them jean shorts Austin.
                    Nesciunt tofu stumptown aliqua, retro synth master cleanse.
                    Mustache cliche tempor, williamsburg carles vegan helvetica.
                    Reprehenderit butcher retro keffiyeh dreamcatcher synth.
                    Cosby sweater eu banh mi, qui irure terry richardson ex squid.
                    Aliquip placeat salvia cillum iphone.
                    Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.
                  </p>
                </TabPane>
                <TabPane tabId="tab22">
                  <p>Light Blue - is a next generation admin template based
                    on the latest Metro design.
                    There are few reasons we want to tell you, why we have created it:
                    We didn&#39;t like the darkness of most of admin templates,
                    so we created this light one.
                    We didn&#39;t like the high contrast of most of admin templates,
                    so we created this unobtrusive one.
                    We searched for a solution of how to make widgets look like real widgets,
                    so we decided that deep background - is what makes widgets look real.
                  </p>
                </TabPane>
                <TabPane tabId="tab23">
                  <p>Messenger bag gentrify pitchfork tattooed craft beer,
                    iphone skateboard locavore carles etsy salvia banksy hoodie helvetica.
                    DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.
                    Williamsburg banh mi whatever gluten-free,
                    carles pitchfork biodiesel fixie etsy retro mlkshk vice blog.
                    Scenester cred you probably haven&#39;t heard of them,
                    vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
                  </p>
                </TabPane>
              </TabContent>
            </Widget>
          </Col>
          <Col md="6" xs="12">
            <Widget
              title={<h5><i className="fa fa-arrow-up" /> Tabs on the bottom</h5>}
            >
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeThirdTab === 'tab31' })}
                    onClick={() => {
                      this.toggleThirdTabs('tab31');
                    }}
                  >
                    <span>Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeThirdTab === 'tab32' })}
                    onClick={() => {
                      this.toggleThirdTabs('tab32');
                    }}
                  >
                    <span>Profile</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeThirdTab === 'tab33' })}
                    onClick={() => {
                      this.toggleThirdTabs('tab33');
                    }}
                  >
                    <span>Search</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeThirdTab}>
                <TabPane tabId="tab31">
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
                <TabPane tabId="tab32">
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
                <TabPane tabId="tab33">
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
              title={<h5><i className="fa fa-arrow-right" /> Tabs on the left</h5>}
            >
              <Nav tabs className="tabs-left flex-column">
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFourthTab === 'tab41' })}
                    onClick={() => {
                      this.toggleFourthTabs('tab41');
                    }}
                  >
                    <span>Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFourthTab === 'tab42' })}
                    onClick={() => {
                      this.toggleFourthTabs('tab42');
                    }}
                  >
                    <span>Profile</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFourthTab === 'tab43' })}
                    onClick={() => {
                      this.toggleFourthTabs('tab43');
                    }}
                  >
                    <span>Search</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeFourthTab}>
                <TabPane tabId="tab41">
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
                <TabPane tabId="tab42">
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
                <TabPane tabId="tab43">
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
              <Nav tabs className="tabs-right flex-column">
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFifthTab === 'tab51' })}
                    onClick={() => {
                      this.toggleFifthTabs('tab51');
                    }}
                  >
                    <span>Home</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFifthTab === 'tab52' })}
                    onClick={() => {
                      this.toggleFifthTabs('tab52');
                    }}
                  >
                    <span>Profile</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeFifthTab === 'tab53' })}
                    onClick={() => {
                      this.toggleFifthTabs('tab53');
                    }}
                  >
                    <span>Search</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeFifthTab}>
                <TabPane tabId="tab51">
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
                <TabPane tabId="tab52">
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
                <TabPane tabId="tab53">
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
