import React from 'react'

const DeleteAlertContent = ({
    content,
    onDelete
}) => {
  return (
    <div className='p-5'>
        <p className='text-[14px]'>{content}</p>

        <div className='flex justify-end mt-6'>
            <button type="button" className='bg-gradient-to-r from-[#FF9324] via-[#e99a4b] to-[#FF6B6B] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:shadow-xl hover:scale-105 border border-white/50 transition-all duration-300 cursor-pointer backdrop-blur-sm' onClick={onDelete}>
                Delete
            </button>

        </div>
    </div>
  )
}

export default DeleteAlertContent
