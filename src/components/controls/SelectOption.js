import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

export default function SelectOption({ index, value, options, onChangeHandler }) {
    const [open, setOpen] = useState(false);

    const handleChange = value => {
        onChangeHandler(index, value)
    }

    return (
        <div className="inline-block relative w-full">
            <select
                onChange={e => handleChange(e.target.value)}
                className={`block appearance-none w-full bg-slate-100 cursor-default rounded-lg bg-white p-2 pl-4 w-full h-12 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm`}
            >
                <option value="">Veuillez sélectionner</option>
                {options.map((elem, elemIdx) => (
                    <option>{elem}</option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
        </div>
    )
}