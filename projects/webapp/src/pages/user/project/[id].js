import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { MapPin, Calendar, Send, Share2 } from 'react-feather'
import { Text, Button } from 'ui-library/stories/atoms'

import { FramedGridCard } from 'ui-library/stories/templates'
import projectsMock from 'ui-library/assets/mocks/projects.mock'
import { Page } from '../../../containers'

const Project = () => {
  const router = useRouter()
  const [project, setProject] = useState()
  const { id } = router.query

  useEffect(() => {
    const project = projectsMock.find(project => project.id === id)
    setProject(project)
  }, [id])
  console.log(project)

  return (
    <Page
      navHeader={{ visible: true, goBackUri: 'back' }}
      showFooter={false}
      noindex={true}
      className="text-lilac-800 bg-lilac-100">
      <FramedGridCard
        className="lg:mb-20 lg:mt-12"
        bodyColor="bg-white lg:bg-lilac-100"
        headerColor="bg-lilac-400 lg:bg-lilac-100">
        <FramedGridCard.Header className="bg-lilac-400">
          <div className="flex flex-col flex-wrap lg:flex-row lg:justify-between lg:items-center">
            <div className="lg:pr-12 lg:w-7/12">
              <Text as="h1" variant="textLg" className="mb-2">
                {project?.title}
              </Text>
              <Text variant="textSm" className="hyphens-auto">
                {project?.goal}
              </Text>
            </div>
            <div className="flex flex-row items-center order-last mt-5 mb-2 lg:w-5/12 lg:order-none lg:mt-10 lg:mb-0 lg:justify-end">
              <Button
                iconLeft={<Send className="mt-px mr-2 -ml-1" />}
                variant="outline"
                color="lilac800"
                className="mr-5">
                Kontaktieren
              </Button>
              <Button iconLeft={<Share2 className="mt-px mr-2 -ml-1" />} variant="outline" color="lilac800">
                Teilen
              </Button>
            </div>
            <div className="flex flex-col w-full mt-3 sm:flex-row sm:items-center">
              <div className="flex items-center sm:mr-8">
                <MapPin size={20} className="mr-2" />
                <Text variant="textSm">{project?.location ? 'Ort' : 'unabhängig von Ort'}</Text>
              </div>
              <div className="flex items-center mt-1 sm:mt-0">
                <Calendar size={20} className="mr-2" />
                <Text variant="textSm">{project?.time ? 'Zeit' : 'keine Zeitbegrenzung'}</Text>
              </div>
            </div>
          </div>
        </FramedGridCard.Header>
        <FramedGridCard.Body gap="medium" className="grid-flow-row bg-white ">
          <FramedGridCard.Body.Col variant="twoCols" className="lg:col-start-2">
            <div>
              <Text className="mb-2">Um was geht es?</Text>
              <Text variant="textSm">{project?.description}</Text>
            </div>
            <div className="mt-8">
              <Text className="mb-2">Wer steckt dahinter?</Text>
              <Text variant="textSm">{project?.team}</Text>
            </div>
            <div className="mt-8">
              <Text variant="textSmMedium" className="italic">
                Motto: {project?.motto}
              </Text>
            </div>
          </FramedGridCard.Body.Col>
          <FramedGridCard.Body.Col variant="twoCols" className="row-start-1 100 lg:row-start-auto lg:ml-16">
            <Text>Aktuelle Gesuche</Text>
          </FramedGridCard.Body.Col>
          <FramedGridCard.Body.Col variant="oneCol" className="mt-10">
            <Text variant="textSm">Erstellt am ...</Text>
          </FramedGridCard.Body.Col>
        </FramedGridCard.Body>
      </FramedGridCard>
    </Page>
  )
}

export default Project
