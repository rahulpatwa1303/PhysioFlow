import React from 'react'

function NavigationButton({isActive,icon}) {
  return (
    <div className={`${isActive ? 'bg-activateColor' : 'bg-transparent'} rounded-xl p-2`}>
        {icon}
    </div>
  )
}

export default NavigationButton