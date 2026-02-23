import React from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem, Button, Input } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {Sparklines, SparklinesBars} from "react-sparklines";
import TextareaAutosize from 'components/AutoResizeTextarea';
import Slider from 'rc-slider';
import Select from 'react-select';
import RichTextEditor from 'components/RichTextEditor/RichTextEditor';
import MaskedInput from 'components/MaskedInputField';
import Scrollspy from './ScrollSpyComponent';
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget/Widget';
import s from '../../pages/forms/elements/Elements.module.scss';
import Skycon from "../../components/Skycon/Skycon";

const Libs = () => (
      <Row className={s.root}>
        <Col md={10}>
          <Breadcrumb>
            <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
            <BreadcrumbItem>Documentation</BreadcrumbItem>
            <BreadcrumbItem active>Libs</BreadcrumbItem>
          </Breadcrumb>
        </Col>
        <Col lg={9}>
          <Widget id="Animate.css">
            <h3>Animate.css</h3>
            <p>animate.css is a bunch of cool, fun, and cross-browser animations for you to use in your projects. Great
              for emphasis, home pages, sliders, and general just-add-water-awesomeness.</p>
            <h4>Example</h4>
            <h1 className="animated infinite fadeIn slow mt mb">Fade in</h1>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<h1 class="animated infinite fadeIn slow">Fade in</h1>'}</SyntaxHighlighter>
            <p>For more examples please refer to <a href="https://github.com/daneden/animate.css/"
                                                    target="_blank" rel="noopener noreferrer">Animate.css</a></p>
          </Widget>
          <Widget id="RC-Slider">
            <h3>RC-Slider Slider UI component for React</h3>
            <p>Supports IE9, IE9+, Chrome, Firefox & Safari</p>
            <h4>Example</h4>
            <Slider 
              style={{width: '210px'}}
              className={`${s.sliderCustomization} ${s.horizontalSlider} ${s.sliderBlue}`}
              defaultValue={20}
            />
            <SyntaxHighlighter language='javascript' style={tomorrow}>{'<Slider\n' +
            '  className="sliderCustomization horizontalSlider sliderBlue"\n' +
            '  defaultValue={20}\n' +
            '/>'}</SyntaxHighlighter>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/react-component/slider" target="_blank" rel="noopener noreferrer">rc-slider</a></p>
          </Widget>
          <Widget id="Font-Awesome">
            <h3>Font-awesome</h3>
            <p>The iconic SVG, font, and CSS toolkit</p>
            <h4>Examples</h4>
            <i className="fa fa-arrow-left fa-2x me-2"/>
            <i className="fa fa-github fa-2x me-2"/>
            <i className="fa fa-bath fa-2x me-2"/>
            <i className="fa fa-grav fa-2x me-2"/>
            <i className="fa fa-telegram fa-2x"/>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<i className="fa fa-arrow-left fa-2x me-2" />\n' +
            '<i className="fa fa-github fa-2x me-2" />\n' +
            '<i className="fa fa-bath fa-2x me-2" />\n' +
            '<i className="fa fa-grav fa-2x me-2" />\n' +
            '<i className="fa fa-telegram fa-2x" />'}</SyntaxHighlighter>
            <p className="lead">Want to see examples? <Link to="/app/components/icons">Click</Link></p>
            <p>For more examples and documentation please refer to <a href="https://github.com/FortAwesome/Font-Awesome"
                                                                      target="_blank" rel="noopener noreferrer">Font Awesome</a></p>
          </Widget>
          <Widget id="Formsy-React">
            <h3>Validation Inputs</h3>
            <p>Form validation inputs are powered by local React 19-compatible validation components.</p>
            <p className="lead">Want to see examples? <Link to="/app/forms/wizard">Click</Link></p>
            <p className="text-muted">Legacy Formsy dependency has been removed from this project.</p>
          </Widget>
          <Widget id="Fullcalendar">
            <h3>Fullcalendar</h3>
            <p>A JavaScript event calendar. Customizable and open source.</p>
            <p className="lead">Want to see examples? <Link to="/app/extra/calendar">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://fullcalendar.io/docs/react" target="_blank" rel="noopener noreferrer">Fullcalendar</a></p>
          </Widget>
          <Widget id="Glyphicons-Halflings">
            <h3>Glyphicons-halflings</h3>
            <p>TIncludes over 250 glyphs in font format from the Glyphicon Halflings set</p>
            <h4>Examples</h4>
            <i className="glyphicon glyphicon-asterisk me-2"/>
            <i className="glyphicon glyphicon-heart me-2"/>
            <i className="glyphicon glyphicon-home me-2"/>
            <i className="glyphicon glyphicon-refresh me-2"/>
            <i className="glyphicon glyphicon-camera"/>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<i className="glyphicon glyphicon-asterisk me-2" />\n' +
            '<i className="glyphicon glyphicon-heart me-2" />\n' +
            '<i className="glyphicon glyphicon-home me-2" />\n' +
            '<i className="glyphicon glyphicon-refresh me-2" />\n' +
            '<i className="glyphicon glyphicon-camera" />'}</SyntaxHighlighter>
            <p className="lead">Want to see examples? <Link to="/app/ui/icons">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://getbootstrap.com/docs/3.3/components/" target="_blank" rel="noopener noreferrer">Glyphicons</a></p>
          </Widget>
          <Widget id="Line-Awesome">
            <h3>Line-awesome</h3>
            <p>A single file that replaces Font Awesome with modern line icons.</p>
            <h4>Examples</h4>
            <i className="la la-arrow-left la-2x me-2"/>
            <i className="la la-github la-2x me-2"/>
            <i className="la la-facebook la-2x me-2"/>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<i className="la la-arrow-left la-2x me-2" />\n' +
            '<i className="la la-github la-2x me-2" />\n' +
            '<i className="la la-facebook la-2x me-2" />'}</SyntaxHighlighter>
            <p className="lead">Want to see examples? <Link to="/app/ui/icons">Click</Link></p>
            <p>For more examples and documentation please refer to <a href="https://github.com/FortAwesome/Font-Awesome"
                                                                      target="_blank" rel="noopener noreferrer">Font Awesome</a></p>
          </Widget>
          <Widget id="React-Sparkline">
            <h3>React-sparkline</h3>
            <p>This React.js plugin makes it easy to generate a number of different types of sparklines directly in the
              browser, using few lines of JSX.</p>
            <Sparklines data={[13, 14, 16, 15, 4, 14, 20]} style={{width: '70px', height: '30px', marginRight: '10px'}}>
              <SparklinesBars style={{stroke: 'white', fill: '#618fb0'}}/>
            </Sparklines>
            <Sparklines data={[14, 12, 16, 11, 17, 19, 16]} style={{width: '70px', height: '30px'}}>
              <SparklinesBars style={{stroke: 'white', fill: '#999'}}/>
            </Sparklines>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<Sparklines data={[13, 14, 16, 15, 4, 14, 20]} style={{ width: \'70px\', height: \'30px\', marginRight: \'10px\' }}>\n' +
            '  <SparklinesBars style={{ stroke: \'white\', fill: \'#618fb0\' }} />\n' +
            '</Sparklines>\n' +
            '<Sparklines data={[14, 12, 16, 11, 17, 19, 16]} style={{ width: \'70px\', height: \'30px\' }}>\n' +
            '  <SparklinesBars style={{ stroke: \'white\', fill: \'#999\' }} />\n' +
            '</Sparklines>'}</SyntaxHighlighter>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/borisyankov/react-sparklines" target="_blank" rel="noopener noreferrer">React Sparklines</a></p>
          </Widget>
          <Widget id="React-Toastify">
            <h3>React Toastify</h3>
            <p>Growl-style alerts and messages</p>
            <p className="lead">Want to see examples? <Link to="/app/ui/notifications">Click</Link></p>
            <p>For more examples and documentation please refer to <a href="https://github.com/fkhadra/react-toastify"
                                                                      target="_blank" rel="noopener noreferrer">react-toastify</a></p>
          </Widget>
          <Widget id="Rc-color-picker">
            <h3>Rc-color-picker</h3>
            <p>Color piker component for React</p>
            <input type="color" defaultValue="#ff0000" />
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<input type="color" defaultValue="#ff0000" />'}</SyntaxHighlighter>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/react-component/color-picker" target="_blank" rel="noopener noreferrer">Color Picker</a></p>
          </Widget>
          <Widget id="Rc-Hammerjs">
            <h3>Rc-hammerjs</h3>
            <p>ReactJS / HammerJS integration. Support touch events in your React app.</p>
            <p>For more examples and documentation please refer to <a href="https://github.com/JedWatson/react-hammerjs"
                                                                      target="_blank" rel="noopener noreferrer">HammerJS</a></p>
          </Widget>
          <Widget id="React-Autosize-Textarea">
            <h3>Auto-resize Textarea</h3>
            <p>A local replacement for built-in <code>&lt;textarea /&gt;</code> that automatically adjusts its height.</p>
            <TextareaAutosize placeholder="Try to type"/>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<TextareaAutosize placeholder="Try to type"/>'}</SyntaxHighlighter>
            <p className="text-muted">This project uses a local `AutoResizeTextarea` component for compatibility with React 18.</p>
          </Widget>
          <Widget id="React-Datetime">
            <h3>Native Date and Time Inputs</h3>
            <p>Date and time picking is implemented with native HTML controls.</p>
            <div style={{ width: '220px' }}>
              <Input type="datetime-local" />
            </div>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<Input type="datetime-local" />'}</SyntaxHighlighter>
            <p className="text-muted">Legacy react-datetime dependency has been removed.</p>
          </Widget>
          <Widget id="React-dropzone">
            <h3>React-dropzone</h3>
            <p>Simple HTML5-compliant drag'n'drop zone for files built with React.js.</p>
            <p className="lead">Want to see examples? <Link to="/app/forms/elements">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/react-dropzone/react-dropzone" target="_blank" rel="noopener noreferrer">React Dropzone</a></p>
          </Widget>
          <Widget id="React-Draft-Wysiwyg">
            <h3>Rich Text Editor</h3>
            <p>A local WYSIWYG editor implementation compatible with modern React runtime.</p>
            <RichTextEditor/>
            <p className="text-muted">Editor controls support basic rich text formatting and links.</p>
          </Widget>
          <Widget id="React-Google-Maps">
            <h3>Google Maps</h3>
            <p>Google Maps integration using the local iframe-based map component.</p>
            <p className="lead">Want to see examples? <Link to="/app/maps/google">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://developers.google.com/maps/documentation/embed" target="_blank" rel="noopener noreferrer">Google Maps Embed</a></p>
          </Widget>
          <Widget id="React-Maskedinput">
            <h3>Masked Input</h3>
            <p>Input masking powered by the local `MaskedInputField` component.</p>
            <div style={{width: '200px'}}>
              <MaskedInput mask="1111 1111 1111 1111" name="card" size="20" className="form-control"/>
            </div>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{'<MaskedInput mask="1111 1111 1111 1111" name="card" size="20" className="form-control"/>'}</SyntaxHighlighter>
            <p className="text-muted">Mask tokens use <code>1</code> as a digit placeholder (for example: <code>(111) 111-1111</code>).</p>
          </Widget>
          <Widget id="React-MDE">
            <h3>Markdown Editor</h3>
            <p>Markdown editing and preview powered by a local editor implementation and Showdown.</p>
            <p className="lead">Want to see examples? <Link to="/app/forms/elements">Click</Link></p>
          </Widget>
          <Widget id="React-Select">
            <h3>React-select</h3>
            <p>A flexible and beautiful Select Input</p>
            <Select options={
              [{ value: 'chocolate', label: 'Chocolate' },
               { value: 'strawberry', label: 'Strawberry' },
               { value: 'vanilla', label: 'Vanilla' }]}            
            />
            <p>For more examples and documentation please refer to <a href="https://react-select.com/home" target="_blank" rel="noopener noreferrer">React Select</a></p>
          </Widget>
          <Widget id="React-Shuffle">
            <h3>Gallery Grid</h3>
            <p>Grid filtering and ordering implemented with native React list rendering.</p>
            <p className="lead">Want to see examples? <Link to="/app/extra/gallery">Click</Link></p>
            <p className="text-muted">No external shuffle dependency is required for this implementation.</p>
          </Widget>
          <Widget id="React-Slick">
            <h3>React-slick</h3>
            <p>React carousel component</p>
            <p className="lead">Want to see examples? <Link to="/app/ecommerce/product">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/akiran/react-slick" target="_blank" rel="noopener noreferrer">React Slick</a></p>
          </Widget>
          <Widget id="React-Sortable">
            <h3>Sortable Lists</h3>
            <p>List sorting is implemented with native drag-and-drop in the demo page.</p>
            <p className="lead">Want to see examples? <Link to="/app/ui/list-groups">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API" target="_blank" rel="noopener noreferrer">HTML Drag and Drop API</a></p>
          </Widget>
          <Widget id="Reactstrap">
            <h3>Reactstrap</h3>
            <p>React wrapper components for Bootstrap.</p>
            <Button color="success">Bootstrap Button</Button>
            <SyntaxHighlighter language='javascript'
                               style={tomorrow}>{' <Button color="success">Bootstrap Button</Button>'}</SyntaxHighlighter>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/reactstrap/reactstrap" target="_blank" rel="noopener noreferrer">Reactstrap</a></p>
          </Widget>
          <Widget id="Rickshaw">
            <h3>Realtime Charts</h3>
            <p>Realtime line and mixed charts are implemented with ApexCharts.</p>
            <p className="lead">Want to see examples? <Link to="/app/main/dashboard">Click</Link></p>
            <p>For more examples and documentation please refer to <a
              href="https://github.com/apexcharts/react-apexcharts" target="_blank" rel="noopener noreferrer">React ApexCharts</a></p>
          </Widget>
          <Widget id="Skycons">
            <h3>Weather Icons</h3>
            <p>Animated weather icons are rendered by a local component based on Bootstrap Icons.</p>
            <Skycon icon="CLEAR_DAY" color="#17a2b8" width="40" height="40" />
            <p className="text-muted">Legacy skycons dependency has been removed.</p>
          </Widget>
          <Widget id="Other">
            <h3 className="">Other Libs</h3>
            <ul className="check-list">
              <li className="lead">
                <a className="fw-semi-bold" href="https://www.amcharts.com/docs/v4/getting-started/integrations/using-react/" rel="noopener noreferrer" target="_blank"> @amcharts</a>.
                JavaScript Charts & Maps Programming library for all your data visualization needs.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/ameyms/react-animated-number" rel="noopener noreferrer" target="_blank"> react-animated-number</a>.
                A simple animated number for React.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://react-bootstrap.github.io/" rel="noopener noreferrer" target="_blank"> React Bootstrap</a>.
                With React Bootstrap you can build responsive, mobile-first projects on the web using React.js and the world's
                most popular front-end CSS library — Bootstrap v4.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/highcharts/highcharts-react" rel="noopener noreferrer" target="_blank"> highcharts-react</a>.
                Make your data come alive. Highcharts makes it easy for developers to set up interactive charts in their web pages.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/apexcharts/react-apexcharts" rel="noopener noreferrer" target="_blank"> react-apexcharts</a>.
                Modern & Interactive Open-source Charts.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/frontend-collective/react-sortable-tree" rel="noopener noreferrer" target="_blank"> react-sortable-tree</a>.
                This is a draggable tree component.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/hustcc/echarts-for-react" rel="noopener noreferrer" target="_blank"> echarts-for-react</a>.
                A Declarative Framework for Rapid Construction of Web-based Visualization
              </li>
              <li className="lead">
                <span className="fw-semi-bold"> Local TagsInput component</span>.
                React 19 compatible tags input used in product forms with the same visual style as before.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/tannerlinsley/react-table" rel="noopener noreferrer" target="_blank"> react-table</a>.
                This React package offers an easy and intuitive way of displaying Bootstrap-styled grids with data coming
                either from the client or from the server.
              </li>
              <li className="lead">
                <a className="fw-semi-bold" href="https://github.com/unsplash/react-trend" rel="noopener noreferrer" target="_blank"> react-trend</a>.
                Simple, elegant spark lines for React.js.
              </li>
            </ul>
          </Widget>
        </Col>
        <Col lg={3}>
          <Scrollspy
            title="LIBS"
            prefix="libs"
            ids={[
            'Animate.css',
            'RC-Slider',
            'Font-Awesome',
            'Formsy-React',
            'Fullcalendar',
            'Line-Awesome',
            'React-Sparkline',
            'React-Toastify',
            'Rc-color-picker',
            'Rc-Hammerjs',
            'React-Autosize-Textarea',
            'React-Datetime',
            'React-dropzone',
            'React-Google-Maps',
            'React-Maskedinput',
            'React-MDE',
            'React-Select',
            'React-Shuffle',
            'React-Slick',
            'React-Sortable',
            'Reactstrap',
            'Rickshaw',
            'Skycons',
            'Other'
          ]} />
        </Col>
      </Row>
    );

export default Libs;
