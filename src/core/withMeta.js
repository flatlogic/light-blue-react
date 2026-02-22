import React, { useEffect } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { updateMeta } from '../DOMUtils';
import { defaultMeta } from '../config';

function withMeta(ComposedComponent) {
  const WithMeta = (props) => {
    useEffect(() => {
      if (ComposedComponent.meta) {
        Object.keys(ComposedComponent.meta).forEach((metaKey) => {
          if (metaKey === 'title') {
            document.title = `${ComposedComponent.meta[metaKey]} - ${defaultMeta[metaKey]}`;
            return;
          }
          updateMeta(metaKey, ComposedComponent.meta[metaKey]);
        });
      }

      return () => {
        Object.keys(defaultMeta).forEach((metaKey) => {
          if (metaKey === 'title') {
            document.title = defaultMeta[metaKey];
            return;
          }
          updateMeta(metaKey, defaultMeta[metaKey]);
        });
      };
    }, []);

    return <ComposedComponent {...props} />;
  };

  WithMeta.displayName = `WithMeta(${ComposedComponent.displayName || ComposedComponent.name || 'Component'})`;
  WithMeta.ComposedComponent = ComposedComponent;

  return hoistStatics(WithMeta, ComposedComponent);
}

export default withMeta;
