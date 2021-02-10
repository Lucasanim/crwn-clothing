import React from 'react'

import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'

import CartItem from '../cart-item/cart-item.component'

const CartDopdown = ({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>
            {

                cartItems.map( cart => <CartItem key={cart.id} item={cart} />)
            }
        </div>
        <CustomButton>GO TO CHECKOUT</CustomButton>
    </div>
)

const mapStateToProps = ({cart: {cartItems}}) => ({
    cartItems
})

export default connect(mapStateToProps)(CartDopdown)
