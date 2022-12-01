import React from 'react'

export default function TextView2({ text, onClickHandler, className, icon }) {
    return (
        <div
            className={`my-2 bg-slate-100 w-full h-12 rounded-lg border-2 border-slate-300 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500 cursor-pointer ${className}`}
            onClick={onClickHandler}
        >
            {text}
            {icon}
        </div>
    )
}
