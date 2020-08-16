import PropTypes from 'prop-types'
import classnames from 'classnames'

// todo: icon
// todo: size

export const BTN_COLORS = {
  whiteGray600: 'text-white bg-gray-600 hover:shadow-outline:gray-600 focus:shadow-outline:gray-600',
  blue400Yellow300: 'text-blue-400 bg-yellow-300 hover:shadow-outline:yellow-300 focus:shadow-outline:yellow-300',
}

const Button = ({ className, color = BTN_COLORS.whiteGray600, label, ...props }) => (
  <button
    className={classnames(
      'w-full py-4 text-lg font-bold transition-shadow duration-150 ease-in-out rounded-full outline-none sm:px-8 sm:w-auto focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed',
      color,
      className
    )}
    {...props}>
    {label}
  </button>
)

Button.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default Button