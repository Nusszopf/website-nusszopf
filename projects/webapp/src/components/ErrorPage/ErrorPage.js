import PropTypes from 'prop-types'
import { Route, Link, Text } from 'ui-library/stories/atoms'
import { FrameFullCenter } from 'ui-library/stories/templates'
import { Page } from '~/components'
import errorData from './error.data'

const ErrorPage = ({ statusCode }) => (
  <Page footer={{ className: 'bg-warning-200' }}>
    <FrameFullCenter className="text-stone-800 bg-warning-200">
      <div className="max-w-xl mx-auto">
        <Text as="h1" variant="titleLg" className="sm:text-center">
          {statusCode && `${statusCode} – `}
          {errorData.heading}
        </Text>
        <Text className="mt-8">
          {errorData.message.text}{' '}
          <Link
            color="warning"
            href={errorData.message.link.href}
            title={errorData.message.link.meta}
            ariaLabel={errorData.message.link.meta}>
            {errorData.message.link.text}
          </Link>
          .
        </Text>
        <div className="text-center">
          <Route
            variant="button"
            size="large"
            className="mt-16 bg-warning-300"
            href="/"
            title={errorData.nav.home}
            ariaLabel={errorData.nav.home}>
            {errorData.nav.home}
          </Route>
        </div>
      </div>
    </FrameFullCenter>
  </Page>
)

ErrorPage.propTypes = {
  statusCode: PropTypes.string,
}

export default ErrorPage
