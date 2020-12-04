import PropTypes from 'prop-types'
import { Clickable } from 'reakit/Clickable'
import classnames from 'classnames'
import { ChevronRight } from 'react-feather'

import { Text } from 'ui-library/stories/atoms'
import { RequestCategoryColor } from '../RequestCard.theme'

const ViewRequestCard = ({ onClick, request, className, ...props }) => (
  <Clickable
    onClick={() => onClick(request)}
    className={classnames(
      'w-full flex text-stone-800 p-4 justify-between  items-center ring-1 ring-transparent duration-150 ease-in-out rounded-lg cursor-pointer focus:outline-none',
      RequestCategoryColor[request.category],
      className
    )}
    {...props}>
    <div className="mr-4 text-left hyphens-auto">
      <Text>{request.title}</Text>
      <Text variant="textXs">Erstellt am {new Date(request.created_at).toLocaleDateString('de-DE')}</Text>
    </div>
    <ChevronRight size={30} className="flex-shrink-0" />
  </Clickable>
)

ViewRequestCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  request: PropTypes.object,
}

export default ViewRequestCard