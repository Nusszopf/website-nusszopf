import React from 'react'
import PropTypes from 'prop-types'

import { Route, Link } from '../../atoms'
import { Frame } from '../../templates'
import { footerData as cms } from '../../../assets/data'

const FooterVariant = {
  vercel: 'vercel',
  auth0: 'auth0',
  classy: 'classy',
}

const SVGPoweredByVercel = props => (
  <svg fill="none" height="27" viewBox="0 0 212 44" width="128" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect fill="#000" height="44" rx="8" width="212" />
    <path
      d="m60.438 15.227v11.273h1.406v-4.023h2.836c2.117 0 3.625-1.493 3.625-3.602 0-2.148-1.477-3.648-3.61-3.648zm1.406 1.25h2.484c1.633 0 2.531.851 2.531 2.398 0 1.492-.93 2.352-2.53 2.352h-2.485zm11.5 10.171c2.399 0 3.883-1.656 3.883-4.359 0-2.71-1.484-4.36-3.883-4.36-2.398 0-3.883 1.65-3.883 4.36 0 2.703 1.485 4.36 3.883 4.36zm0-1.21c-1.594 0-2.492-1.157-2.492-3.149 0-2 .898-3.148 2.492-3.148s2.492 1.148 2.492 3.148c0 1.992-.898 3.148-2.492 3.148zm15.954-7.36h-1.352l-1.656 6.735h-.125l-1.883-6.735h-1.29l-1.882 6.735h-.125l-1.656-6.735h-1.36l2.36 8.422h1.36l1.874-6.516h.125l1.883 6.516h1.367zm4.523 1.04c1.336 0 2.227.984 2.258 2.476h-4.64c.101-1.492 1.039-2.477 2.382-2.477zm2.219 5.202c-.352.742-1.086 1.14-2.172 1.14-1.43 0-2.36-1.054-2.43-2.718v-.062h6.055v-.516c0-2.617-1.383-4.234-3.656-4.234-2.313 0-3.797 1.718-3.797 4.367 0 2.664 1.46 4.351 3.797 4.351 1.844 0 3.156-.89 3.547-2.328zm3.242 2.18h1.344v-5.219c0-1.187.93-2.047 2.211-2.047.266 0 .75.047.86.078v-1.342a5.77 5.77 0 0 0 -.672-.04c-1.117 0-2.086.579-2.336 1.4h-.125v-1.25h-1.281v8.42zm8.899-7.383c1.336 0 2.227.985 2.258 2.477h-4.641c.102-1.492 1.04-2.477 2.383-2.477zm2.219 5.203c-.352.742-1.086 1.14-2.172 1.14-1.43 0-2.359-1.054-2.43-2.718v-.062h6.055v-.516c0-2.617-1.383-4.234-3.656-4.234-2.313 0-3.797 1.718-3.797 4.367 0 2.664 1.461 4.351 3.797 4.351 1.844 0 3.156-.89 3.547-2.328zm6.36 2.328c1.164 0 2.164-.554 2.695-1.492h.125v1.344h1.281v-11.766h-1.343v4.672h-.118c-.476-.922-1.468-1.476-2.64-1.476-2.141 0-3.539 1.718-3.539 4.36 0 2.648 1.382 4.358 3.539 4.358zm.312-7.507c1.524 0 2.477 1.218 2.477 3.148 0 1.945-.946 3.148-2.477 3.148-1.539 0-2.461-1.18-2.461-3.148 0-1.96.93-3.148 2.461-3.148zm14.462 7.507c2.133 0 3.531-1.726 3.531-4.359 0-2.648-1.391-4.36-3.531-4.36-1.156 0-2.18.571-2.641 1.477h-.125v-4.672h-1.344v11.766h1.282v-1.344h.125c.531.938 1.531 1.492 2.703 1.492zm-.313-7.507c1.539 0 2.453 1.18 2.453 3.148 0 1.969-.914 3.148-2.453 3.148-1.531 0-2.484-1.203-2.484-3.148s.953-3.148 2.484-3.148zm6.04 10.406c1.492 0 2.164-.578 2.882-2.531l3.29-8.938h-1.43l-2.305 6.93h-.125l-2.312-6.93h-1.453l3.117 8.43-.157.5c-.351 1.015-.773 1.383-1.546 1.383-.188 0-.399-.008-.563-.04v1.149c.188.031.422.047.602.047zm17.391-3.047 3.898-11.273h-2.148l-2.813 8.921h-.132l-2.836-8.921h-2.227l3.938 11.273zm8.016-7.18c1.164 0 1.93.813 1.969 2.078h-4.024c.086-1.25.899-2.078 2.055-2.078zm1.984 4.828c-.281.633-.945.985-1.906.985-1.273 0-2.094-.89-2.141-2.313v-.101h5.969v-.625c0-2.696-1.461-4.313-3.898-4.313-2.477 0-4.016 1.727-4.016 4.477s1.516 4.414 4.031 4.414c2.016 0 3.446-.969 3.797-2.524zm3.547 2.352h1.938v-4.938c0-1.195.875-1.976 2.133-1.976.328 0 .843.055.992.11v-1.798c-.18-.054-.524-.085-.805-.085-1.101 0-2.023.625-2.258 1.468h-.132v-1.328h-1.868zm13.501-5.672c-.203-1.797-1.532-3.047-3.727-3.047-2.57 0-4.078 1.649-4.078 4.422 0 2.813 1.516 4.469 4.086 4.469 2.164 0 3.508-1.203 3.719-2.992h-1.844c-.203.89-.875 1.367-1.883 1.367-1.32 0-2.117-1.047-2.117-2.844 0-1.773.789-2.797 2.117-2.797 1.063 0 1.703.594 1.883 1.422zm5.117-1.508c1.164 0 1.93.813 1.969 2.078h-4.024c.086-1.25.899-2.078 2.055-2.078zm1.985 4.828c-.282.633-.946.985-1.907.985-1.273 0-2.093-.89-2.14-2.313v-.101h5.968v-.625c0-2.696-1.461-4.313-3.898-4.313-2.477 0-4.016 1.727-4.016 4.477s1.516 4.414 4.032 4.414c2.015 0 3.445-.969 3.796-2.524zm3.625 2.352h1.937v-11.852h-1.937zm-169.102-13.5 9.325 16h-18.65z"
      fill="#fff"
    />
    <path d="m43.5 0v44" stroke="#5e5e5e" />
  </svg>
)

const Footer = ({ className, variant = 'vercel' }) => (
  <Frame as="footer" className={className}>
    {variant === 'vercel' ? (
      <div className="py-6 text-center">
        <Link
          className="inline-block"
          variant="svg"
          href="https://vercel.com?utm_source=nusszopf&utm_campaign=oss"
          title={cms.vercel.meta}
          ariaLabel={cms.vercel.meta}>
          <SVGPoweredByVercel />
        </Link>
      </div>
    ) : variant === 'auth0' ? (
      <div className="py-6 text-center">
        <Link
          variant="svg"
          href="https://auth0.com/?utm_source=oss&utm_medium=gp&utm_campaign=oss"
          title={cms.auth0.meta}
          ariaLabel={cms.auth0.meta}>
          <img
            className="inline-block h-12 mr-6"
            alt="JWT Auth for open source projects"
            src="//cdn.auth0.com/oss/badges/a0-badge-dark.png"
          />
        </Link>
        <Link
          className="inline-block mx-auto align-top"
          variant="svg"
          href="https://vercel.com?utm_source=nusszopf&utm_campaign=oss"
          title={cms.vercel.meta}
          ariaLabel={cms.vercel.meta}>
          <SVGPoweredByVercel />
        </Link>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-between py-6 sm:flex-row">
        <div>
          <Route className="mr-8" href="/legalNotice" title={cms.legalNotice} ariaLabel={cms.legalNotice}>
            {cms.legalNotice}
          </Route>
          <Route href="/privacy" title={cms.privacy} ariaLabel={cms.privacy}>
            {cms.privacy}
          </Route>
        </div>
        <div className="mt-5 sm:mt-0">
          <Link
            className="inline-block"
            variant="svg"
            href="https://vercel.com?utm_source=nusszopf&utm_campaign=oss"
            title={cms.vercel.meta}
            ariaLabel={cms.vercel.meta}>
            <SVGPoweredByVercel />
          </Link>
        </div>
      </div>
    )}
  </Frame>
)

Footer.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(FooterVariant)),
}

export default Footer
