import React from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector, createStructureSelector} from 'reselect'

import {selectCartItems, selectCartTotal} from '../../redux/cart/cart.selectrors'

import './checkout.styles.scss'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

const CheckoutPage= ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map( item =>
                <CheckoutItem item={item} key={item.id} />
            )
        }
        <div className='total'>
            <span>TOTAL: ${total}</span>
        </div>
    </div>
)

const statesProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})

export default connect(statesProps)(CheckoutPage)