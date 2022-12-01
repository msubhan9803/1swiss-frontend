import React from 'react'
import InputField from 'components/controls/InputField';

export default function OfferFilter({ amountFrom, amountTo, handleAmountFromFilter, handleSortChange }) {
  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-2 mx-2'>
        <InputField
          name="amountFrom"
          placeholder="Amount From"
          state={amountFrom}
          onChangeHanlder={handleAmountFromFilter}
          type="number"
          />
      </div>

      <div className='col-span-2 mx-2'>
        <InputField
          name="amountTo"
          placeholder="Amount To"
          state={amountTo}
          onChangeHanlder={handleAmountFromFilter}
          type="number"
        />
      </div>

      <div className='col-span-2 mx-2'>
        <select
          onChange={e =>  handleSortChange(e.target.value)}
          className={`block appearance-none w-full my-4 bg-slate-100 cursor-default rounded-lg bg-white p-2 pl-4 w-full h-12 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 sm:text-sm`}
        >
          <option value="">Sort by</option>
          <option value="asc">Amount - Ascending</option>
          <option value="desc">Amount - Descending</option>
        </select>
      </div>
    </div>
  )
}
