import PropTypes from 'prop-types'
import { mixed, object, string } from 'yup'
import { Text, Input, Switch } from 'ui-library/stories/atoms'
import { RichTextEditor } from 'ui-library/stories/organisims'
import { FramedGridCard } from 'ui-library/stories/templates'
import { createProjectData as data } from '../../assets/data'
import FieldTitle from './components/FieldTitel'

// todo validation date/time
// -> mixed().when()

export const step1ValidationSchema = values =>
  object({
    title: string().max(30, 'Nicht mehr als 30 Zeichen').required('Bitte gib einen Namen ein'),
    goal: string().max(100, 'Nicht mehr als 100 Zeichen').required('Bitte gib ein Ziel ein'),
    description: mixed().test('description', 'Bitte gib eine Beschreibung ein', () => {
      return values.description[0].children[0]?.text?.length > 0 ? true : false
    }),
  })

const DescriptionStep1 = ({ formik }) => {
  return (
    <FramedGridCard.Body gap="medium" className="grid-flow-row bg-white ">
      <FramedGridCard.Body.Col variant="twoCols" className="lg:pr-4 lg:col-start-2">
        <>
          <FieldTitle info={data.descriptionStep1.title.info}>{data.descriptionStep1.title.title}</FieldTitle>
          <Input
            name="title"
            maxlength="30"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={data.descriptionStep1.title.placeholder}
            color="whiteLilac800"
          />
          {formik?.errors?.title && formik.touched?.title && (
            <Text variant="textXs" className="mt-2 italic">
              {formik.errors.title}
            </Text>
          )}
        </>
        <>
          <FieldTitle info={data.descriptionStep1.goal.info} className="mt-8">
            {data.descriptionStep1.goal.title}
          </FieldTitle>
          <Input
            as="textarea"
            name="goal"
            maxlength="30"
            value={formik.values.goal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color="whiteLilac800"
            placeholder={data.descriptionStep1.goal.placeholder}
          />
          {formik?.errors?.goal && formik.touched?.goal && (
            <Text variant="textXs" className="mt-2 italic">
              {formik.errors.goal}
            </Text>
          )}
        </>
        <>
          <FieldTitle info={data.descriptionStep1.project.info} className="mt-8">
            {data.descriptionStep1.project.title}
          </FieldTitle>
          <RichTextEditor
            name="description"
            onChange={value => formik.setFieldValue('description', value)}
            onBlur={() => formik.setFieldTouched('description')}
            placeholder={data.descriptionStep1.project.placeholder}
          />
          {formik?.errors?.description && formik.touched?.description && (
            <Text variant="textXs" className="mt-2 italic">
              {formik.errors.description}
            </Text>
          )}
        </>
      </FramedGridCard.Body.Col>
      <FramedGridCard.Body.Col variant="twoCols" className="lg:pl-4">
        <>
          <FieldTitle info={data.descriptionStep1.location.info}>{data.descriptionStep1.location.title}</FieldTitle>
          <Switch
            color="lilac800"
            label={data.descriptionStep1.location.action}
            onCheck={value => formik.setFieldValue('location.remote', value)}
            initialState={formik.values.location.remote}
          />
          {!formik.values.location.remote && (
            <Input color="whiteLilac800" className="mt-4" placeholder={data.descriptionStep1.location.placeholder} />
          )}
        </>
        <>
          <FieldTitle className="mt-8" info={data.descriptionStep1.period.info}>
            {data.descriptionStep1.period.title}
          </FieldTitle>
          <Switch
            color="lilac800"
            label={data.descriptionStep1.period.action.switch}
            onCheck={value => formik.setFieldValue('period.flexible', value)}
            initialState={formik.values.period.flexible}
          />
          {!formik.values.period.flexible && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <Text variant="textXs" className="w-12 uppercase">
                  {data.descriptionStep1.period.action.from}
                </Text>
                <Input
                  color="whiteLilac800"
                  placeholder={data.descriptionStep1.period.action.placeholder}
                  type="date"
                />
              </div>
              <div className="flex items-center">
                <Text variant="textXs" className="w-12 uppercase">
                  {data.descriptionStep1.period.action.to}
                </Text>
                <Input
                  color="whiteLilac800"
                  placeholder={data.descriptionStep1.period.action.placeholder}
                  type="date"
                />
              </div>
            </div>
          )}
        </>
      </FramedGridCard.Body.Col>
    </FramedGridCard.Body>
  )
}

DescriptionStep1.propTypes = {
  formik: PropTypes.object,
}

export default DescriptionStep1
