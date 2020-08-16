import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Text, BTN_COLORS } from '../../atoms'

export const LINK_TYPES = {
  text: 'text',
  button: 'button',
}

export const LINK_TEXT_COLORS = {
  gray700blue200: 'text-gray-700 bg-blue-200 border-blue-300 group-hover:bg-blue-300 group-hover:border-gray-700',
}

const Link = ({
  children,
  href,
  ariaLabel,
  className,
  title,
  icon,
  type = LINK_TYPES.text,
  color = type === LINK_TYPES.text ? LINK_TEXT_COLORS.gray700blue200 : BTN_COLORS.whiteGray600,
}) => {
  switch (type) {
    case LINK_TYPES.text: {
      return (
        <a
          className={classnames('cursor-pointer group', className)}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          title={title}
          aria-label={ariaLabel}>
          <div className={classnames('border-b-2', color)}>
            <Text>{children}</Text>
          </div>
        </a>
      )
    }
    case LINK_TYPES.button: {
      const IconComponent = icon
      return (
        <a
          href={href}
          rel="noopener noreferrer"
          target="_blank"
          aria-label={ariaLabel}
          title={title}
          className={classnames(
            'group w-full py-4 text-lg font-bold transition-shadow duration-150 ease-in-out rounded-full outline-none sm:px-8 sm:w-auto focus:outline-none',
            color,
            className
          )}>
          {icon ? (
            <span className="flex items-center justify-center">
              <IconComponent className="-ml-1" />
              <p className="ml-2">{children}</p>
            </span>
          ) : (
            <>{children}</>
          )}
        </a>
      )
    }
  }
}

Link.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  children: PropTypes.node,
  type: PropTypes.oneOf(Object.values(LINK_TYPES)),
  color: PropTypes.oneOf(Object.values({ ...LINK_TEXT_COLORS, ...BTN_COLORS })),
  className: PropTypes.string,
}

export default Link