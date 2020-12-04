import { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { X } from 'react-feather'

import { Button, Text } from 'ui-library/stories/atoms'
import { Dialog } from 'ui-library/stories/molecules'
import { serializeJSX } from 'ui-library/services/RichTextEditor.service'
import { CategoryColor } from './RequestDialog.theme'
import { REQUEST_CATEGORY } from '~/utils/enums'
import { requestDialogData as cms } from '~/assets/data'

const RequestDialog = ({ isOpen, onDismiss, onContact, request, ...props }) => {
  const mapCategoryToColor = category => {
    switch (category) {
      case REQUEST_CATEGORY.companions:
        return 'bg-red-300'
      case REQUEST_CATEGORY.rooms:
        return 'bg-yellow-300'
      case REQUEST_CATEGORY.materials:
        return 'bg-turquoise-300'
      case REQUEST_CATEGORY.financials:
        return 'bg-blue-300'
      case REQUEST_CATEGORY.others:
        return 'bg-pink-300'
      default:
        return ''
    }
  }

  return (
    <Dialog
      aria-label="Request Infos"
      isOpen={isOpen}
      onDismiss={onDismiss}
      className={classnames('text-stone-800', CategoryColor[request?.category])}
      {...props}>
      <div className="h-6">
        <Button className="float-right" variant="clean" size="baseClean" onClick={onDismiss}>
          <X />
        </Button>
      </div>
      <div>
        <Text className="mb-2">{request?.title}</Text>
        <div className="text-lg">
          {request?.descriptionTemplate?.map((node, idx) => (
            <Fragment key={`rq-${idx}`}>{serializeJSX(node)}</Fragment>
          ))}
        </div>
        <Text variant="textSm" className="mt-6">
          {cms.created_at} {new Date(request?.created_at).toLocaleDateString('de-DE')}
        </Text>
      </div>
      <div className="flex justify-center mt-6 space-x-4">
        <Button color="stone" className={mapCategoryToColor(request?.category)} onClick={onContact}>
          {cms.actions.contact}
        </Button>
        <Button color="stone" onClick={onDismiss}>
          {cms.actions.close}
        </Button>
      </div>
    </Dialog>
  )
}

RequestDialog.propTypes = {
  isOpen: PropTypes.bool,
  onDismiss: PropTypes.func,
  onContact: PropTypes.func,
  request: PropTypes.object,
}

export default RequestDialog