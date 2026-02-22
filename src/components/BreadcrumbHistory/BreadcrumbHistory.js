import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {
  Link
} from 'react-router-dom';

const BreadcrumbHistory = ({ url }) => {
  const renderBreadCrumbs = () => {
    const route = url.split('/')
      .slice(1)
      .map((routeSegment) => routeSegment
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' '));
    const length = route.length;

    return route.map((item, index) => {
      const middlewareUrl = `/${url.split('/').slice(1, index + 2).join('/')}`;
      return (
        <BreadcrumbItem key={middlewareUrl}>
          {length === index + 1 ?
            item :
            <Link to={middlewareUrl}>
              {item}
            </Link>
          }
        </BreadcrumbItem>
      );
    });
  };

  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem>YOU ARE HERE</BreadcrumbItem>
        {renderBreadCrumbs()}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHistory;
