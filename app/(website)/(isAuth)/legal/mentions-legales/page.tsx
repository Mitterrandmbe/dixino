import Container from '@/app/components/Container'
import React from 'react'

const MentionLegalesFrPage = () => {
  return (
    <Container>
        <div className='w-full h-screen'>
            <iframe 
                src='/pdfs/legalFr.pdf#toolbar=0'
                width="100%"
                height="800"
                allowFullScreen
                style={{height: "800px", width: "100%"}}
            />

        </div>
    </Container>
  )
}

export default MentionLegalesFrPage