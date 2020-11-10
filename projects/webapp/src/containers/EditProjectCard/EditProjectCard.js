import PropTypes from 'prop-types'
import { Clickable } from 'reakit/Clickable'
import classnames from 'classnames'
import { MoreHorizontal, Eye, EyeOff } from 'react-feather'
import { truncate } from 'lodash'

import { Text } from 'ui-library/stories/atoms'
import { Menu } from 'ui-library/stories/molecules'
import { profileData } from '../../assets/data'

const EditProjectCard = ({ onClick, toggleVisibility, onEdit, onDelete, project, className, ...props }) => (
  <div
    className={classnames(
      'w-full flex hyphens-auto text-lilac-800 transition-shadow duration-150 ease-in-out rounded-lg cursor-pointer bg-lilac-300 hover:shadow-outline:lilac-700 focus:shadow-outline:lilac-700',
      className
    )}
    {...props}>
    <Clickable onClick={() => onClick(project.id)} className="flex-1 p-4 text-left focus:outline-none">
      <div className="flex items-center">
        <Text className="mr-4">{project.title}</Text>
        {project.isVisible ? <Eye /> : <EyeOff />}
      </div>
      <Text variant="textSm" className="mt-2">
        {truncate(project.goal, { length: 100 })}
      </Text>
      <div className="flex flex-col mt-6 sm:flex-row lg:flex-col">
        <Text variant="textXs" className="sm:mr-4 lg:mr-0">
          <span className="mr-2 font-medium">{project.searchings.length}</span>
          {profileData.project.searchings}
        </Text>
        <Text variant="textXs">
          {profileData.project.date} {new Date(project.created_at).toLocaleDateString('de-DE')}
        </Text>
      </div>
    </Clickable>
    <div>
      <Menu
        label={<MoreHorizontal />}
        items={[
          {
            type: 'button',
            text: 'Bearbeiten',
            action: () => onEdit(project.id),
          },
          {
            type: 'button',
            text: project.isVisible ? 'Veröffentlichen' : 'Geheimhalten',
            action: () => toggleVisibility(project.id),
          },
          {
            type: 'button',
            text: 'Löschen',
            seperator: true,
            action: () => onDelete(project.id),
          },
        ]}
      />
    </div>
  </div>
)

EditProjectCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  toggleVisibility: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  project: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    goal: PropTypes.string,
    isVisible: PropTypes.bool,
    searchings: PropTypes.array,
    created_at: PropTypes.string,
  }),
}

export default EditProjectCard
