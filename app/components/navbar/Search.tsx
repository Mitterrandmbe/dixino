'use client';

import React from 'react'

const Search = () => {
  return (
    <div
        className='
            border-[1px]
            w-full
            lg:w-10/12
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-lg
            transition
            cursor-pointer
        '
    >
        <div
            className='
                flex
                flex-row
                items-center
                justify-between
                px-2

            '
        >
            <div
                className='
                    text-sm
                    text-neutral-800
                    font-normal
                    px-6
                '
            >
                Quoi?
            </div>
            <div
                className='
                    text-sm
                    text-neutral-800
                    font-normal
                    px-6
                    border-x-[1px]
                '
            >
                Où?
            </div>
            <div
                className='
                    text-sm
                    text-neutral-800
                    font-normal
                    px-6
                    border-r-[1px]
                '
            >
                Quand?
            </div>
            <div
                className='
                    p-4
                    bg-primary
                    rounded-full
                    text-white
                    cursor-pointer
                    hover:bg-primaryDark
                '
            >
                Go
            </div>

        </div>

    </div>
  )
}

export default Search