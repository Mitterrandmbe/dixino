import React from 'react'
import { Accordeon } from '../Accordeon';

import { faqListing } from '@/app/libs/data';

const Faq = () => {
  
    const faqs = faqListing.map((faq, index) => (
        <Accordeon 
            question={faq.question}
            answer={faq.answer}
            key={index}
        />

    ))
  
    return (
    <div className='bg-neutral-200 w-screen flex flex-col items-center py-20'>
        {/* <div className='bg-white rounded-lg p-8 w-4/5 lg:w-1/2'>
            <h2 className='text-4xl font-semibold text-center'>FAQ</h2>
            {faqs}
        </div> */}
    </div>
  )
}

export default Faq