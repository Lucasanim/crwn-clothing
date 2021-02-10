import React from 'react'

import {connect} from 'react-redux'

import CustomButton from '../custom-button/custom-button.component'
import './cart-dropdown.styles.scss'

import CartItem from '../cart-item/cart-item.component'

import { selectCartItems } from '../../redux/cart/cart.selectrors'

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

const mapStateToProps = state => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps)(CartDopdown)
