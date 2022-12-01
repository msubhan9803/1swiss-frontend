import React from 'react'
import InputMask from "react-input-mask";

export default function DateInput({ className, placeholder, name, value, onChangeHandler }) {
    return (
        <InputMask
            name={name}
            mask="99/99/9999"
            value={value}
            placeholder={placeholder}
            onChange={onChangeHandler}
            className={`bg-slate-100 w-full h-12 rounded-lg border border-slate-100 p-2 focus-visible:border-slate-100 ${className}`}
        />
    )
}
