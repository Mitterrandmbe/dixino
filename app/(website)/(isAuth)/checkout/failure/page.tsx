import Failure from '@/app/components/Failure'
import React from 'react'

const FailurePage = () => {
  return (
    <div
        className="flex flex-col gap-4 h-screen items-center lg:justify-center pt-12 lg:p-0"
    >
        <Failure />
    </div>
  )
}

export default FailurePage