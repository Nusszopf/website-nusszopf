import { useToasts } from 'ui-library/services/Toasts.service'
import apollo from './apollo.service'
import { Node } from 'slate'

import { serializeText } from 'ui-library/services/RichTextEditor.service'
import { NZ_EMAIL } from '../enums'
import { parseDateISOString } from '../helper'

const useProjectsService = () => {
  const { notify } = useToasts()
  const [apolloDeleteProject, { loading: deleteLoading }] = apollo.useDeleteProject()
  const [apolloUpdateProject, { loading: updateLoading }] = apollo.useUpdateProject()
  const [apolloAddProject, { loading: addLoading }] = apollo.useAddProject()

  const serializeProject = (user, form) => {
    return {
      ...serializeProjectDescription(user, form),
      ...serializeProjectSettings(user, form),
    }
  }

  const serializeProjectDescription = (user, form) => {
    return {
      title: form.title,
      goal: form.goal,
      descriptionTemplate: form.description,
      description: form.description
        .map(node => serializeText(node))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim(),
      location: form.location,
      period: {
        flexible: form.period.flexible,
        from: parseDateISOString(form.period.from),
        to: parseDateISOString(form.period.to),
      },
      teamTemplate: form.team,
      team: form.team.map(n => Node.string(n)).join(' '),
      motto: form.motto,
      user_id: user.data.id,
    }
  }

  const serializeProjectSettings = (user, form) => {
    return {
      visibility: form.visibility,
      contact: form.contact ? user.data.email : NZ_EMAIL,
    }
  }

  const addProject = async (user, form) => {
    const project = serializeProject(user, form)
    notify({
      type: 'loading',
      message: 'Projekt erstellen...',
    })
    try {
      // todo update cache
      await apolloAddProject({
        variables: { project },
      })
      notify({
        type: 'success',
        message: 'Dein Projekt wurde erstellt.',
      })
      return true
    } catch (error) {
      notify({
        type: 'error',
        message: 'Sorry, dein Projekt konnten nicht erstellt werden.',
      })
      return false
    }
  }

  const updateProject = async (id, project) => {
    notify({
      type: 'loading',
      message: 'Update speichern...',
    })
    try {
      await apolloUpdateProject({
        variables: { id, project },
      })
      notify({
        type: 'success',
        message: 'Deine Einstellungen wurden aktuallisiert.',
      })
    } catch (error) {
      notify({
        type: 'error',
        message: 'Sorry, dein Update konnte nicht gepeichert werden.',
      })
    }
  }

  const deleteProject = async id => {
    const hasConfirmed = confirm('Möchtest Du dein Projekt wirklich löschen?')
    if (hasConfirmed) {
      notify({
        type: 'loading',
        message: 'Löschen...',
      })
      try {
        await apolloDeleteProject({
          variables: { id },
          update: (cache, { data }) => {
            cache.evict({ id: `projects:${data.delete_projects_by_pk.id}` })
          },
        })
        notify({
          type: 'success',
          message: 'Dein Projekt wurde gelöscht.',
        })
        return true
      } catch (error) {
        notify({
          type: 'error',
          message: 'Sorry, dein Projekt konnte nicht gelöscht werden.',
        })
        return false
      }
    } else {
      return false
    }
  }

  return {
    addProject,
    updateProject,
    deleteProject,
    addLoading,
    updateLoading,
    deleteLoading,
    serializeProjectSettings,
    serializeProjectDescription,
    serializeProject,
  }
}

export default useProjectsService
