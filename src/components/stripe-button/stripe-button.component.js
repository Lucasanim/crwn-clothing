import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckouButton = ({price}) => {
    const priceForStripe = price *100
    const publishableKey = 'pk_test_51IKQbmF87Y56UerjUpytRBOmTyAXc5nBtvZKl62OyKFm5fQ0u08yPSPEAZdnRs2czoxfrE3WAGj1hMFdg6BdwDvr00M62xa7F9'

    const onTOken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN clothing'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onTOken}
            stripeKey={publishableKey}
        />
    )

}

export default StripeCheckouButton
