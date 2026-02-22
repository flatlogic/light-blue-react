import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Bundle = ({ load, children }) => {
  const [mod, setMod] = useState(null);

  useEffect(() => {
    setMod(null);
    load((nextMod) => {
      // handle both es imports and cjs
      setMod(nextMod.default ? nextMod.default : nextMod);
    });
  }, [load]);

  return children(mod);
};

Bundle.propTypes = {
  load: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

Bundle.generateBundle = loadModule => () => (
  /* eslint-disable */
  <Bundle load={loadModule}>
    {Mod => Mod ? <Mod /> : <div style={{ textAlign: 'center', paddingTop: '35vh' }}>Loading</div>}
  </Bundle>
  /* eslint-enable */
  );

export default Bundle;
