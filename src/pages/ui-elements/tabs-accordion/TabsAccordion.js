/* eslint-disable */
import React from 'react';
import { useState } from 'react';
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
  DropdownItem,
  DropdownToggle,
} from 'reactstrap';
import classnames from 'classnames';

import s from './TabsAccordion.module.scss'

const TabsAccordion = () => {
  const [state, setComponentState] = useState({
      activeFirstTab: 'tab11',
      activeSecondTab: 'tab22',
      activeThirdTab: 'tab31',
      dropdownOpen: false,
      accordionFirst: [false, false, false],
      accordionSecond: [false, true, false],
      accordionSecondContent: [{
        title: 'Collapsible Group Item', body: ` Get base styles and flexible support for collapsible components like accordions and navigation.
          Using the collapse plugin, we built a simple accordion by extending the panel component.`,
      }, {
        title: 'Normal Text Insertion', body: `
        Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's very
              controversial point. I think the opposite actually. Everyone knows what is lore ipsum
              - it is easy to understand if text is lore ipsum. You'll automatically skip -
              because you know - it's just non-informative stub. But what if there some text like
              this one? You start to read it! But the goal of this text is different. The goal is
              the example. So a bit of Lore Ipsum is always very good practice. Keep it in mind!`,
      }, {
        title: 'Check It',
        body: ' Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.',
      }],

      accordionFirstContent: [{
        title: 'Collapsible Group Item', body: ` Get base styles and flexible support for collapsible components like accordions and navigation.
          Using the collapse plugin, we built a simple accordion by extending the panel component.`,
      }, {
        title: 'Random from the Web', body: `
        <p><span class="fw-semi-bold">Light Blue</span> - is a next generation admin template based
        on the latest Metro design. There are few reasons we want to tell you, why we have created it:
        We didn't like the darkness of most of admin templates, so we created this light one.
        We didn't like the high contrast of most of admin templates, so we created this unobtrusive one.
        We searched for a solution of how to make widgets look like real widgets, so we decided that
        deep background - is what makes widgets look real.
        </p>
        <p class="no-margin text-muted"><em>- Some One</em></p>
`,
      }, {
        title: 'Check It',
        body: ' Why don\'t use Lore Ipsum? I think if some one says don\'t use lore ipsum it\'s very controversial point. I think the opposite actually.',
      }],
  });

  const setState = (value) => {
    if (typeof value === 'function') {
      setComponentState((prevState) => ({
        ...prevState,
        ...value(prevState),
      }));
      return;
    }

    setComponentState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };

  const toggleFirstTabs = (tab) => {
    if (state.activeFirstTab !== tab) {
      setState({
        activeFirstTab: tab,
      });
    }
  };

  const toggleSecondTabs = (tab) => {
    if (state.activeSecondTab !== tab) {
      setState({
        activeSecondTab: tab,
      });
    }
  };

  const toggleThirdTabs = (tab) => {
    if (state.activeThirdTab !== tab) {
      setState({
        activeThirdTab: tab,
      });
    }
  };

  const toggleAccordionFirst = (id) => {
    const arr = [];
    arr.length = state.accordionFirst.length;
    arr.fill(false);
    arr[id] = !state.accordionFirst[id];
    setState({
      accordionFirst: arr,
    });
  };

  const toggleAccordionSecond = (id) => {
    const arr = [];
    arr.length = state.accordionSecond.length;
    arr.fill(false);
    arr[id] = !state.accordionSecond[id];
    setState({
      accordionSecond: arr,
    });
  };

  return (
    <div>
        <h1 className="page-title">Tabs & Accordion - <span
          className="fw-semi-bold"
        >Components</span></h1>

        {/* Tabs */}
        <Row>
          <Col md="6" xs="12">
            <div className="clearfix">

              <Nav tabs className="float-start">
                <NavItem className={s.customNavItem}>
                  <NavLink
                    className={classnames({ active: state.activeFirstTab === 'tab11' })}
                    onClick={() => { toggleFirstTabs('tab11'); }}
                  >
                    <span>Basic</span>
                  </NavLink>
                </NavItem>
                <NavItem className={s.customNavItem}>
                  <NavLink
                    className={classnames({ active: state.activeFirstTab === 'tab12' })}
                    onClick={() => { toggleFirstTabs('tab12'); }}
                  >
                    <span>Assumtion</span>
                  </NavLink>
                </NavItem>
                <UncontrolledDropdown className={`${s.customNavItem} nav-item`}>
                  <DropdownToggle nav caret
                    className={classnames({
                      active: state.activeFirstTab === 'tab13' ||
                      state.activeFirstTab === 'tab14'
                    }, s.tabsDropDown)}>
                    Dropdown
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => {
                      toggleFirstTabs('tab13');
                    }}>@fat
                    </DropdownItem>
                    <DropdownItem onClick={() => {
                      toggleFirstTabs('tab14');
                    }}>@mdo
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </div>
            {/* tab content */}

            <TabContent className='mb-lg' activeTab={state.activeFirstTab}>
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
                <div className="float-end">
                  <Button color="inverse" className="me-3">Cancel</Button>
                  <Button color="primary">Some button</Button>
                </div>
                <div className="clearfix"/>
              </TabPane>

              <TabPane tabId="tab12">
                <p>{`Why don't use Lore Ipsum? I think if some one says don't use lore ipsum it's
                  very controversial
                  point. I think the opposite actually. Everyone knows what is lore ipsum - it is
                  easy to understand if text is lore ipsum.`}</p>
                <div className="clearfix">
                  <div className="btn-toolbar">
                    <Button color="default" className="me-3 ms-0">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                    <Button color="primary" className="me-3 ms-0">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
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

          <Col md="6" xs="12">
            <Row>
              <Col xs="12" className="mb-5">
                <Nav tabs>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeSecondTab === 'tab21' })}
                      onClick={() => { toggleSecondTabs('tab21'); }}
                    >
                      <span>Basic</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeSecondTab === 'tab22' })}
                      onClick={() => { toggleSecondTabs('tab22'); }}
                    >
                      <span>Assumtion</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeSecondTab === 'tab23' })}
                      onClick={() => { toggleSecondTabs('tab23'); }}
                    >
                      <span>Works</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent className='mb-lg' activeTab={state.activeSecondTab}>
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
                        <Button color="danger" className="me-3 ms-0">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                        <Button color="default" className="me-3 ms-0">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
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
              </Col>
            </Row>

            <Row>
              <Col xs="12">
                <Nav tabs>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeThirdTab === 'tab31' })}
                      onClick={() => { toggleThirdTabs('tab31'); }}
                    >
                      <span>Basic</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeThirdTab === 'tab32' })}
                      onClick={() => { toggleThirdTabs('tab32'); }}
                    >
                      <span>Assumtion</span>
                    </NavLink>
                  </NavItem>
                  <NavItem className={s.customNavItem}>
                    <NavLink
                      className={classnames({ active: state.activeThirdTab === 'tab33' })}
                      onClick={() => { toggleThirdTabs('tab33'); }}
                    >
                      <span>Works</span>
                    </NavLink>
                  </NavItem>
                </Nav>

                <TabContent className='mb-lg' activeTab={state.activeThirdTab}>
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
                        <Button color="danger" className="me-3 ms-0">&nbsp;&nbsp;Check&nbsp;&nbsp;</Button>
                        <Button color="default" className="me-3 ms-0">&nbsp;&nbsp;Dance?&nbsp;&nbsp;</Button>
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
              </Col>
            </Row>
          </Col>
        </Row>

        {/* Accordion */}
        <Row className="mt-xs">
          <Col md="6" xs="12" className='mb-lg'>

            {state.accordionFirstContent.map((element, index) => (
              <div className="card panel mb-xs" key={`accord-one-${index.toString()}`}>
                { /* eslint-disable */ }
                <div
                  className="card-header panel-header" role="button"
                  onClick={() => { toggleAccordionFirst(index); }}
                >
                  { /* eslint-enable */ }
                  <div className="mb-0">
                   {/* eslint-disable-next-line */}
                    <a className="accordion-toggle" role="button">
                      {element.title}
                      <i className={`fa fa-angle-down ${state.accordionFirst[index] ? 'expanded' : ''}`} />
                    </a>
                  </div>
                </div>
                <Collapse className="panel-body" isOpen={state.accordionFirst[index]}>
                  <div className="card-body" dangerouslySetInnerHTML={{ __html: element.body }} />
                </Collapse>
              </div>))}
          </Col>

          <Col md="6" xs="12" className='mb-lg'>
            {state.accordionSecondContent.map((element, index) => (<div className="card panel mb-xs" key={`accord-one-${index.toString()}`}>
              { /* eslint-disable */ }
              <div
                className="card-header panel-header" role="button"
                onClick={() => { toggleAccordionSecond(index); }}
              >
                { /* eslint-enable */ }
                <div className="mb-0">
                {/* eslint-disable-next-line */}
                  <a className="accordion-toggle" role="button">
                    {element.title}
                    <i className="fa fa-angle-down float-end" />
                  </a>
                </div>
              </div>
              <Collapse className="panel-body" isOpen={state.accordionSecond[index]}>
                <div className="card-body" dangerouslySetInnerHTML={{ __html: element.body }} />
              </Collapse>
            </div>))}
          </Col>
        </Row>

      </div>
  );
};

export default TabsAccordion;
