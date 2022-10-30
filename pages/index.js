import { Box, Container } from '@chakra-ui/react'
import { AppLayout } from '../components/AppLayout'
import { Hero } from '../components/Hero'
import { CarsList } from '../components/CarsList'
import { EndSection } from '../components/EndSection'

export default function Home() {
  return (
    <AppLayout>
      <Container maxW="container.xl">
        <Hero image="../images/cars-home-page.jpg" />
        <CarsList />
        <EndSection image="../images/cars-end-page.jpg" />
      </Container>  
    </AppLayout>  
  )
}
