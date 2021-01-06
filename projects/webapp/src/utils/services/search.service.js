import { useEffect, useState, useContext, createContext } from 'react'
import PropTypes from 'prop-types'
import { throttle } from 'lodash'
import MeiliSearch from 'meilisearch'

// Improvments:
// - Set  `searchable-attributes`
// - Set `displayed-attributes`

// TODO
// 1. grouping
// 2. no results state
// 3. initial state
// 4. crop text length
// 5. new combobox component for serach
// 6. profile back route

export const SearchContext = createContext({})
export const useSearch = () => useContext(SearchContext)

export const SearchContextProvider = ({ children }) => {
  const [client, setClient] = useState()
  const [index, setIndex] = useState()
  const [term, setTerm] = useState('')
  const [hits, setHits] = useState([])
  const [filter, setFilter] = useState({
    financials: true,
    rooms: true,
    companions: true,
    materials: true,
    others: true,
  })

  useEffect(() => {
    const _client = new MeiliSearch({
      apiKey: process.env.MEILI_API_KEY,
      host: process.env.MEILI_DOMAIN,
    })
    const _index = _client.index('items')
    setClient(_client)
    setIndex(_index)
  }, [])

  const search = throttle(async (_term, _filter) => {
    setFilter(_filter)
    const filterQuery = Object.entries(_filter)
      .filter(item => !item[1])
      .map(item => `req_type != ${item[0]}`)
      .join(' AND ')
    try {
      const _hits = await index.search(_term, {
        limit: 100,
        attributesToRetrieve: ['itemsId', 'groupId', 'type', 'pro_title', 'pro_goal', 'req_type'],
        attributesToHighlight: [
          'pro_title',
          'pro_goal',
          'pro_description',
          'pro_team',
          'pro_motto',
          'pro_location_text',
          'pro_author',
          'req_title',
          'req_description',
        ],
        filters: filterQuery.length > 0 ? filterQuery : null,
      })
      setHits(_hits)
    } catch (error) {
      console.error(error)
    }
  }, 250)

  return <SearchContext.Provider value={{ term, setTerm, filter, hits, search }}>{children}</SearchContext.Provider>
}

SearchContextProvider.propTypes = {
  children: PropTypes.node,
}
