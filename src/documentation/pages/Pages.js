import React from 'react';
import { Row, Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ProductCard from '../../pages/products/components/ProductCard/ProductCard';
import products from '../../pages/products/mock'
import { Link } from 'react-router-dom';

import Widget from '../../components/Widget/Widget';
import Scrollspy from "./ScrollSpyComponent";

const Pages = () => (
  <Row>
    <Col md={10}>
      <Breadcrumb>
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        <BreadcrumbItem>Documentation</BreadcrumbItem>
        <BreadcrumbItem active>Pages</BreadcrumbItem>
      </Breadcrumb>
    </Col>
    <Col lg={9}>
      <Widget id="Auth">
        <h3>Auth</h3>
        <p>Auth is a built-in module for an admin template dashboard. It contains all actions and handlers for any token authorization for your application.</p>
        <p>All logic is in <code>src/actions/auth.js</code> and <code>src/reducers/auth.js</code>. We have already preconfigured <a href="https://github.com/flatlogic/nodejs-backend" rel="noopener noreferrer" target="_blank">Node.js backend</a>
            <span className="small text-muted"> (Only in full stack version)</span> under the hood. <code>Creds</code> variable contains user email and password entered in the login form. It does request to our backend server and gets token and saves it in <code>localStorage</code>.</p>
        <p><b>Important note.</b> Credentials validation must be on the server side.</p>
        <p>Another important part of authentication is route guards in <code>src/components/RouteComponents.js</code>. They are built with <code>Navigate</code> from React Router and protect private/admin pages.</p>
        <SyntaxHighlighter language='javascript' style={tomorrow}>{'export function UserRoute({ dispatch, children }) {\n' +
        '  if (!isAuthenticated()) {\n' +
        '    dispatch(logoutUser());\n' +
        '    return <Navigate to=\"/login\" replace />;\n' +
        '  }\n\n' +
        '  return children;\n' +
        '}\n\n' +
        'export function AuthRoute({ children, from }) {\n' +
        '  const target = from || { pathname: \"/app\" };\n\n' +
        '  if (isAuthenticated()) {\n' +
        '    return <Navigate to={target} replace />;\n' +
        '  }\n\n' +
        '  return children;\n' +
        '}'}</SyntaxHighlighter>
        <p>Token is stored in <code>localStorage</code> after successful login. <code>UserRoute</code> blocks unauthorized access to private pages, <code>AuthRoute</code> prevents opening auth pages when already logged in, and <code>AdminRoute</code> additionally validates admin role.</p>
      </Widget>
      <Widget id="Inbox">
        <h3>Inbox</h3>
        <p>Inbox is a ready-to-use application with all needed features. It’s easy to understand and customize. The code is divided into components, so you can easily change the layout of your application.</p>
        <ul>
          <li>Messages filter & search</li>
          <li>Compose</li>
          <li>Read/unread, star/unstar, delete actionsy</li>
          <li>Message attachments</li>
          <li>Reply functionality</li>
        </ul>
        <Link className="btn btn-primary" to="/app/inbox">Demo</Link>
      </Widget>
      <Widget id="Dashboards">
        <h3>Dashboards</h3>
        <p>The main screens of the admin template. There are 2 dashboard views in the current app: main dashboard and analytics.</p>
        <p>Analytics dashboard includes charts, statistics, calendar, todo manager and data tables.</p>
        <p>Main chart is based on D3.js; other blocks are reusable widgets you can place on any page.</p>
        <p>All of this component can be used on any page of the application.</p>
        <p>
          <Link className="btn btn-primary me-2" to="/app/main/dashboard">Dashboard</Link>
          <Link className="btn btn-primary" to="/app/main/analytics">Analytics</Link>
        </p>
      </Widget>
      <Widget id="E-Commerce">
        <h3>E-commerce</h3>
        <p className="alert alert-secondary font-weight-bold"><span className="text-warning">Important note.</span> This section is fully supported by <a
          href="https://github.com/flatlogic/nodejs-backend" rel="noopener noreferrer" target="_blank">Node.js
          backend</a> data.
        </p>
        <p>E-commerce is a group of three pages: product management, product list and product details. Must have a page if you are doing something similar to marketplace or shop.</p>
        <p>&bull; Product management is a page, where you can manipulate with products data. You can CREATE, READ, UPDATE and DELETE products. <span className="small text-muted">(This page is available only in full stack version)</span></p>
        <p>&bull; Products page is a list of ProductCard component. <code>ProductCard</code>  component used to display product image, price, label, the small description in a proper way.</p>
        <p>&bull; Product details is a detailed product card with a lot informative description.</p>
        <p>Examples of <code>ProductCard</code> component:</p>
        <Row>
          <Col md={6}>
            <ProductCard {...products[0]} />
          </Col>
          <Col md={6}>
            <ProductCard {...products[2]} />
          </Col>
        </Row>
        <p>
          <Link className="btn btn-primary me-2" to="/app/ecommerce/management">Management</Link>
          <Link className="btn btn-primary me-2" to="/app/ecommerce/products">List</Link>
          <Link className="btn btn-primary" to="/app/ecommerce/product">Details</Link>
        </p>
      </Widget>
    </Col>
    <Col lg={3}>
      <Scrollspy
        title="PAGES"
        prefix="pages"
        ids={[
        'Auth',
        'Inbox',
        'Dashboards',
        'E-Commerce',
      ]} />
    </Col>
  </Row>
);

export default Pages;
