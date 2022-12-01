import React from 'react'

export default function InputField(props) {
    const { name, placeholder, state, onChangeHanlder, error, classes } = props;
    return (
        <input
            name={name}
            value={state}
            placeholder={placeholder}
            className={`my-2 bg-slate-100 w-full h-12 rounded-lg border-2 border-slate-300 p-2 pl-4 focus-visible:border-slate-100 flex items-center hover:border-blue-500 ${error && "border-red-400"} ${classes ? classes : ''}`}
            onChange={onChangeHanlder}
            {...props}
        />
    )
}
