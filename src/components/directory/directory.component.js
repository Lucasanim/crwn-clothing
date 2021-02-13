import React from 'react'
import {connect} from 'react-redux'

import './directory.styles.scss'
import MenuItem from '../menu-item/menu-item.cmponent'

import {selectDirectorySections} from '../../redux/directory/directory.selectors'
import {createStructuredSelector} from 'reselect'

const Directory = ({ sections }) => {
    
  return (
    <div className='directory-menu'>
        {
            sections.map(({ id, ...otherSectionProps }) => {
                return <MenuItem
                    key={id}
                    {...otherSectionProps} //title,image,link
                />
            })
        }
    </div>
  )
}

const states = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(states)(Directory)