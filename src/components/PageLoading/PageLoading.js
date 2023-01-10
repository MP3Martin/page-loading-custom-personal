import React, { Suspense, useState, useEffect } from 'react';
import { JellyfishSpinner } from 'react-spinners-kit';
import LoadingOverlay from 'react-loading-overlay';
import PropTypes from 'prop-types';

/**
 * **Wraps children in loading screen.**
 * Next.js only!
 *
 * @component
 */
const PageLoading = ({ children, isRootLoading, loadingText, spinner, fadeSpeed, customProps }) => {
  const [isLoading, setLoading] = useState(true);

  function checkRequiredProp (prop) {
    /* eslint-disable-next-line no-eval */
    if (eval(prop) === undefined) {
      const e = new Error(`Prop "${prop}" is required!`);
      throw e;
    }
  }

  // IMPORTANT: If you see this text, add the required parameter(s) to PageLoading component
  // (hove over the PageLoading component name and you will see a JSDoc)
  ['isRootLoading'].forEach(checkRequiredProp);
  //
  //

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* eslint-disable multiline-ternary, react/jsx-closing-tag-location */}
      {isLoading
        ? (<style>
          {`
._loading_overlay_content {
  opacity: 0;
}
`}
        </style>) : (<style>
          {`
._loading_overlay_content {
  opacity: 1 !important;
}
`}
        </style>)}
      {/* eslint-enable multiline-ternary, react/jsx-closing-tag-location */}
      <LoadingOverlay
        {...customProps}
        active={isRootLoading}
        spinner={spinner || <JellyfishSpinner size={70} color='#06E27E' loading />}
        text={loadingText || 'Loading the page...'}
        fadeSpeed={fadeSpeed || 500}
        styles={{
          overlay: (base) => ({
            ...base,
            background: 'rgba(0, 0, 0, 0.8)',
            height: '100vh',
            '& > *': {
              opacity: '1'
            },
            '& > :first-child > *': {
              margin: 'auto',
              'margin-bottom': '1rem'
            }
          })
        }}
      >
        {isLoading
          ? (
            <></>
            )
          : (
            <Suspense>
              {children}
            </Suspense>
            )}
      </LoadingOverlay>
    </>
  );
};

PageLoading.propTypes = {
  /**
   * If the dynamically loaded component is loading
   */
  isRootLoading: PropTypes.bool.isRequired,
  /**
   * Show this text when loading
   */
  loadingText: PropTypes.string,
  /**
   * Spiner component
   */
  spinner: PropTypes.element,
  /**
   * The transition speed for fading out the overlay
   */
  fadeSpeed: PropTypes.number,
  /**
   * Additional props passed to LoadingOverlay
   */
  customProps: PropTypes.object
};

PageLoading.defaultProps = {
  loadingText: 'Loading the page...',
  spinner: <JellyfishSpinner size={70} color='#06E27E' loading />,
  fadeSpeed: 500
};

export default PageLoading;
