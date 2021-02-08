import React from 'react'
import './menu-item.styles.scss'

const MenuItem = ({title, imageUrl, size}) => {
    return <div 
            className={`${size} menu-item`}
        >
        <div
            className='backgroun-image'
            style={{backgroundImage:`url(${imageUrl})`}}
        >
        </div>
        <div className='content'>
            <h1 className='title' >{title.toUpperCase()}</h1>
            <span className='subtitle' >b</span>
        </div>
        
    </div>
}

export default MenuItem