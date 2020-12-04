import { useToasts } from 'ui-library/services/Toasts.service'
import apollo from './apollo.service'
import { Node } from 'slate'

import { serializeText } from 'ui-library/services/RichTextEditor.service'
import { NZ_EMAIL } from '../enums'
import { parseDateISOString } from '../helper'

const useProjectsService = props => {
  const { notify } = useToasts()
  const [apolloDeleteProject, { loading: deleteLoading }] = apollo.useDeleteProject()
  const [apolloUpdateProject, { loading: updateLoading }] = apollo.useUpdateProject()
  const [apolloAddProject, { loading: addLoading }] = apollo.useAddProject(props?.user?.data?.id)

  const [apolloAddRequests, { loading: addRequestsLoading }] = apollo.useAddRequests()
  const [apolloAddRequest, { loading: addRequestLoading }] = apollo.useAddRequest(props?.project?.id)
  const [apolloUpdateRequest, { loading: updateRequestLoading }] = apollo.useUpdateRequest()
  const [apolloDeleteRequest, { loading: deleteRequestLoading }] = apollo.useDeleteRequest()

  const serializeRequest = (id, request) => {
    return {
      title: request.title,
      category: request.category,
      description: request.description
        .map(node => serializeText(node))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim(),
      descriptionTemplate: request.description,
      created_at: request.created_at,
      project_id: id,
    }
  }

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
      const res = await apolloAddProject({ variables: { project } })
      if (form.requests.length > 0) {
        const requests = form.requests.map(request => serializeRequest(res.data.insert_projects_one.id, request))
        await apolloAddRequests({ variables: { requests } })
      }
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
      message: 'Änderungen speichern...',
    })
    try {
      // todo update cache
      await apolloUpdateProject({
        variables: { id, project },
      })
      notify({
        type: 'success',
        message: 'Deine Projekt wurde aktualisiert.',
      })
    } catch (error) {
      notify({
        type: 'error',
        message: 'Sorry, deine Änderungen konnte nicht gepeichert werden.',
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

  const addRequest = async (id, _request) => {
    notify({
      type: 'loading',
      message: 'Gesuch erstellen...',
    })
    try {
      const request = serializeRequest(id, _request)
      await apolloAddRequest({ variables: { request } })
      notify({
        type: 'success',
        message: 'Dein Gesuch wurde erstellt.',
      })
      return true
    } catch (error) {
      notify({
        type: 'error',
        message: 'Sorry, dein Gesuch konnte nicht erstellt werden.',
      })
      return false
    }
  }

  const updateRequest = async _request => {
    notify({
      type: 'loading',
      message: 'Änderungen speichern...',
    })
    try {
      const { created_at, ...request } = serializeRequest(_request.project_id, _request)
      await apolloUpdateRequest({ variables: { id: _request.id, request } })
      notify({
        type: 'success',
        message: 'Dein Gesuch wurde aktualisiert.',
      })
      return true
    } catch (error) {
      notify({
        type: 'error',
        message: 'Sorry, dein Gesuch konnte nicht aktualisiert werden.',
      })
      return false
    }
  }

  const deleteRequest = async id => {
    const hasConfirmed = confirm('Möchtest Du dein Gesuch wirklich löschen?')
    if (hasConfirmed) {
      notify({
        type: 'loading',
        message: 'Löschen...',
      })
      try {
        await apolloDeleteRequest({
          variables: { id },
          update: (cache, { data }) => {
            // todo
            console.log(cache)
            cache.evict({ id: `requests:${data.delete_requests_by_pk.id}` })
          },
        })
        notify({
          type: 'success',
          message: 'Dein Gesuch wurde gelöscht.',
        })
        return true
      } catch (error) {
        notify({
          type: 'error',
          message: 'Sorry, dein Gesuch konnte nicht gelöscht werden.',
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
    deleteRequest,
    addRequest,
    updateRequest,
    addLoading,
    updateLoading,
    deleteLoading,
    addRequestsLoading,
    addRequestLoading,
    deleteRequestLoading,
    updateRequestLoading,
    serializeProjectSettings,
    serializeProjectDescription,
    serializeProject,
  }
}

export default useProjectsService