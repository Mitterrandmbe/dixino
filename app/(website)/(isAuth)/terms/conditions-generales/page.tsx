import Container from '@/app/components/Container'
import React from 'react'

const TermsFrPage = () => {
  return (
    <Container>
        <div className='w-full h-screen'>
            <iframe 
                src='/pdfs/termsFr.pdf'
                width="100%"
                height="800"
                allowFullScreen
                style={{height: "800px", width: "100%"}}
            />

        </div>
    </Container>
  )
}

export default TermsFrPage