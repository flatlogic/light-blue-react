import React from 'react';
import {
  Row,
  Col,
  Label,
  Input,
  Form,
  FormGroup,
} from 'reactstrap';
import Sortable from 'sortablejs'

import Widget from '../../components/Widget';
import './Grid.scss';


import peopleA1 from '../../images/people/a1.jpg';
import peopleA2 from '../../images/people/a2.jpg';
import peopleA3 from '../../images/people/a3.jpg';
import peopleA4 from '../../images/people/a4.jpg';

const tooltipPlacement = 'bottom';

class Grid extends React.Component {

	componentDidMount() {
		var el = document.querySelectorAll('.widget-container');
		new Sortable(el[0], {
				group: "words",
        handle: ".widget",
        animation: 350,
				draggable: ".widget",
        ghostClass: "sortable-ghost",
        group: "shared"
    });
    new Sortable(el[1], {
      group: "words",
      handle: ".widget",
      animation: 350,
      draggable: ".widget",
      ghostClass: "sortable-ghost",
      group: "shared",
      filter: ".locked"
  });
	}

  render() {
    return (
      <div>
       <ol className="breadcrumb">
          <li className="breadcrumb-item">YOU ARE HERE</li>
          <li className="breadcrumb-item active">Grid</li>
        </ol>
        <h1 className="page-title">Grid - <span className="fw-semi-bold">Options</span></h1>

        <Row>
          <Col xl={7}>
            <Widget
              title={<h5>Draggable Grid &nbsp;<span className="badge badge-danger fw-normal">since 2.1</span></h5>}
            >
              <div>
                <p>
                  <strong>Widgster</strong> is a plugin that allows to easily implement basic widget functions that
                  lots of our customers have requested. For now it has the following essential
                  widget features:
                </p>
                <ul className="text-list">
                  <li><strong>Collapse/Expand</strong> - all widgets can be collapsed to fill only header&apos;s
                    vertical
                    space;
                  </li>
                  <li><strong>Close</strong> - closable. Any widget may be removed by clicking the close btn;</li>
                  <li><strong>Full Screen</strong> - an option to make widget fill the whole window (just like OS);</li>
                  <li><strong>Ajax Load</strong> - the hottest option allowing to load/reload widget content
                    asynchronously. You just
                    need to provide an url to fetch the data from. With loader delivered.
                  </li>
                </ul>
                <p>It&apos;s available under MIT license, check out
                  <a href="https://github.com/flatlogic/widgster" target="_blank" rel="noopener noreferrer"> github </a>
                  to find it.</p>
                <p>
                  Test it out!
                </p>
              </div>
            </Widget>
          </Col>
        </Row>

        <Row className="grid-demo">
          <Col className="widget-container" xl={6} xs={12}>
            <Widget
              title={<h6>Default <span className="fw-semi-bold">Widget</span></h6>}
              refresh collapse fullscreen close
              showTooltip tooltipPlacement={tooltipPlacement}
            >
              <div>
                <p>A timestamp this widget was created: Apr 24, 19:07:07</p>
                <p>A timestamp this widget was updated: Apr 24, 19:07:07</p>
              </div>
            </Widget>

            <Widget
              prompt={true}
              className="shares-widget"
              bodyClass={"reset-padding"}
              showTooltip tooltipPlacement={tooltipPlacement}
              title={<h6>
                <span className="badge badge-primary"><i className="fa fa-facebook" /></span> &nbsp;
                Latest <span className="fw-semi-bold">Shares</span>
              </h6>}
              close="Close" refresh="Reload"
            >
              <div className="list-group list-group-lg">
                <button className="list-group-item text-left">
                  <span className="thumb-sm mr">
                    <img className="rounded-circle" src={peopleA1} alt="..." />
                  </span>
                  <div>
                    <h6 className="m-0">Maikel Basso</h6>
                    <small className="text-muted">about 2 mins ago</small>
                  </div>
                  <i className="fa fa-circle ml-auto text-danger" />
                </button>
                <button className="list-group-item text-left">
                  <span className="thumb-sm mr">
                    <img className="rounded-circle" src={peopleA2} alt="..." />
                  </span>
                  <div>
                    <h6 className="m-0">Ianus Arendse</h6>
                    <small className="text-muted">about 42 mins ago</small>
                  </div>
                  <i className="fa fa-circle ml-auto text-info" />
                </button>
                <button className="list-group-item text-left">
                  <span className="thumb-sm mr">
                    <img className="rounded-circle" src={peopleA3} alt="..." />
                  </span>
                  <div>
                    <h6 className="m-0">Valdemar Landau</h6>
                    <small className="text-muted">one hour ago</small>
                  </div>
                  <i className="fa fa-circle ml-auto text-success" />
                </button>
                <button className="list-group-item text-left mb-n-md">
                  <span className="thumb-sm mr">
                    <img className="rounded-circle" src={peopleA4} alt="..." />
                  </span>
                  <div>
                    <h6 className="m-0">Rick Teagan</h6>
                    <small className="text-muted">3 hours ago</small>
                  </div>
                  <i className="fa fa-circle ml-auto text-warning" />
                </button>
              </div>
           </Widget>
            <Widget
              prompt={true}
              id="autoload-widget"
              title={<h6>Autoload <span className="fw-semi-bold">Widget</span></h6>}
              customControls={true}
              customDropDown={true}

            >
              <div>
                <h3 className="text-center m-0">Sign up, it&apos;s <strong>free</strong></h3>
                <p className="lead text-muted text-center">
                  Faith makes it possible to achieve that which man&apos;s mind can conceive and believe.
                </p>
                <Form>
                  <FormGroup>
                    <Label for="exampleInputEmail1"><i className="fa fa-circle text-warning" /> &nbsp; Email
                      address</Label>
                    <Input
                      type="email" id="exampleInputEmail1"
                      placeholder="Enter email"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="pswd"><i className="fa fa-circle text-danger" /> &nbsp; Password</Label>
                    <Input id="pswd" type="text" placeholder="Min 8 characters" />
                  </FormGroup>
                  <p>
                    To make a widget automatically load it&apos;s content you just need to set
                    <strong>data-widgster-autoload</strong> attribute and provide an url.
                  </p>
                  <pre><code>data-widgster-load=&quot;server/ajax_widget.html&quot;
                    data-widgster-autoload=&quot;true&quot;</code></pre>
                  <p>
                    <strong>data-widgster-autoload</strong> may be set to an integer value. If set, for example, to
                    2000 will refresh widget every 2 seconds.
                  </p>
                  <div className="clearfix">
                    <div className="btn-toolbar float-right">
                      <button type="button" className="btn btn-transparent">Cancel</button>
                      <button type="button" className="btn btn-success">&nbsp;Submit&nbsp;</button>
                    </div>
                  </div>
                </Form>
              </div>
            </Widget>

           <Widget>
              <header>
                <h6>Custom <span className="fw-semi-bold">Loader</span></h6>
              </header>
              <div className="widget-body" style={{ minHeight: '140px' }}>
                <div className="loader animated fadeIn handle">
                  <span className="spinner">
                    <i className="fa fa-spinner fa-spin" />
                  </span>
                </div>
              </div>
            </Widget>
          </Col>


          <Col xl={6} className="widget-container">
            <Widget
              id="news-widget"
              title={<div><h6> News <span className="badge badge-pill badge-success">17</span></h6>
                <span className="text-muted">spinning refresh button & close prompt</span>
              </div>}
              customControls={true}
              prompt={true}
              customClose={<button><i title="Close" className="glyphicon glyphicon-remove" /></button>}
              customExpand={<button><i title="Expand" className="glyphicon glyphicon-chevron-up" /></button>}
              customCollapse={<button><i title="Collapse" className="glyphicon glyphicon-chevron-down"/></button>}
              customFullscreen={<button><i title="Fullscreen" className={`glyphicon glyphicon-resize-${true ? 'small' : 'full'}`} /></button>}
              customReload={<button><i title="I am spinning!" className="fa fa-refresh" /></button>}
            >
              <ul className={'news-list stretchable'}>
                <li>
                  <span className="icon bg-danger text-white">
                    <i className="fa fa-star" />
                  </span>
                  <div className="news-item-info">
                    <h5 className="name m-0 mb-xs"><button className="btn-link">First Human Colony on Mars</button></h5>
                    <p className="fs-mini">
                      First 700 people will take part in building first human settlement outside of Earth.
                      That&apos;s awesome, right?
                    </p>
                    <time className="help-block">Mar 20, 18:46</time>
                  </div>
                </li>
                <li>
                  <span className="icon bg-info text-white">
                    <i className="fa fa-microphone" />
                  </span>
                  <div className="news-item-info">
                    <h5 className="name m-0 mb-xs"><button className="btn-link">Light Blue reached $300</button></h5>
                    <p className="fs-mini">
                      Light Blue Inc. shares just hit $300 price. &quot;This was inevitable. It should
                      have happen sooner or later&quot; - says NYSE expert.
                    </p>
                    <time className="help-block">Sep 25, 11:59</time>
                  </div>
                </li>
                <li>
                  <span className="icon bg-success text-white">
                    <i className="fa fa-eye" />
                  </span>
                  <div className="news-item-info">
                    <h5 className="name m-0 mb-xs"><button className="btn-link">No more spying</button></h5>
                    <p className="fs-mini">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <time className="help-block">Mar 20, 18:46</time>
                  </div>
                </li>
              </ul>



            </Widget>

            <Widget
              className="locked"
              title={<h6>Collapsed by default & locked</h6>}
              collapse close collapsed
            >
              <div className="widget-body">
                <blockquote>
                  There are no limits. There are plateaus, but you must not stay there, you must go beyond
                  them. If it kills you, it kills you. A man must constantly exceed his level.
                  <footer>
                    Bruce Lee
                  </footer>
                </blockquote>
                <p>To make a widget initially collapsed just add
                  <code>data-widgster-collapsed=&quot;true&quot;</code> attribute
                  to <code>.widget</code>.</p>
                <p>To make it locked (prevent dragging) add <code>.locked</code> class.</p>
              </div>
            </Widget>

            <Widget
              className="bg-gray"
              customBody={true}
            >
            </Widget>
          </Col>  
        </Row>

      </div> 
    );
  }
}

export default Grid;
