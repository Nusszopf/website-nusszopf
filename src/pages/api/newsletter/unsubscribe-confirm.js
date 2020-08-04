/* eslint-disable no-unused-vars */
import sgClient from '@sendgrid/client'
import jwt from 'jsonwebtoken'
import runMiddleware, { rateLimiter } from '../../../utils/functions/runMiddleware.function'
import { fetchWithAdminAuth } from '../../../utils/functions/api.function'
import { DELETE_LEAD } from '../../../utils/hasura/mutations/newsletter.mutation'

const ERROR_CONSTRAINT = 'constraint-violation'

export default async function unsubscribeConfirm(req, res) {
  await runMiddleware(req, res, rateLimiter)
  const { token } = req.body
  sgClient.setApiKey(process.env.SENDGRID_API_KEY)
  try {
    const { leadId } = jwt.verify(token, process.env.EMAIL_SECRET)
    const lead = await deleteLead(leadId)
    if (lead) {
      const contactId = await getContactId(sgClient, lead.email, process.env.SENDGRID_LIST_ID)
      if (contactId) {
        await deleteContact(sgClient, contactId)
        res.status(200).json({ email: lead.email, name: lead.name })
      } else {
        res.status(404).end(`lead with id ${leadId} was not found in sendgrid`)
      }
    } else {
      res.status(404).end(`lead with id ${leadId} was not found in backend`)
    }
  } catch (error) {
    console.error(error)
    const status = error.response?.errors[0]?.extensions?.code === ERROR_CONSTRAINT ? 400 : error.status ?? 500
    res.status(status).end(error.message)
  }
}

const deleteLead = async id => {
  const res = await fetchWithAdminAuth(DELETE_LEAD, { id })
  return await res?.delete_leads_by_pk
}

const getContactId = async (sgClient, email, listId) => {
  const reqContact = {
    method: 'POST',
    url: '/v3/marketing/contacts/search',
    body: {
      query: `email LIKE '${email}' AND CONTAINS(list_ids, '${listId}')`,
    },
    json: true,
  }
  const [response, body] = await sgClient.request(reqContact)
  return body.result[0]?.id
}

const deleteContact = async (sgClient, leadId) => {
  const reqContact = {
    method: 'DELETE',
    url: `/v3/marketing/contacts?ids=${leadId}`,
    body: '{}',
  }
  await sgClient.request(reqContact)
}