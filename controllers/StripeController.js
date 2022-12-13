import Stripe from 'stripe';
// this secret key in frontend theere is the publisible key
const stripe = new Stripe("sk_test_51LfITCSIwAzANlK4iG5oJxo04HhfvqLe6nSvNoaXbmjNIVfnaMcEdDat2pjCURiFjEIe7QgpQ0FSMvZ820PWw9L800vu6AzIgh");


// const YOUR_DOMAIN = 'http://localhost:3000'
// While deploying at the heroku
const YOUR_DOMAIN = 'http://localhost:5000'

const getStripe=async (req,res)=>{
   
    // console.log(req.body)

    // res.status(201).json({msg:"the post is here"})
    
    if (req.method === 'POST') {
      try {
        const params = {
          // submit_type: 'pay',
          mode: 'payment',
          // payment_method_types: ['card'],
          // billing_address_collection: 'auto',
        //   shipping_options: [
        //     { shipping_rate: 'shr_1Kn3IaEnylLNWUqj5rqhg9oV' },
        //   ],
          // line_items: req.body.map((item) => {
          line_items: req.body.cartItems.map((item) => {
            

            // console.log(item.product[0] )
            // const img = item.image[0].asset._ref;
            // const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');
  
            return {
              price_data: { 
                currency: 'usd',
                product_data: { 
                  name: item.product[0].name,
                  // name: item.name,
                  // images: ["https://res.cloudinary.com/dnbdpdm5n/image/upload/v1662620524/lyqupcjrtnctlu6agyge.jpg"],
                images:[item.product[0].image]
                },
                unit_amount: item.product[0].price * 100,
                // unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                minimum: 1,
              },
              quantity: item.product[0].productQuantity  || 1
              // quantity: item.quantity
              // quantity:2
            }
          }),
          success_url: `${YOUR_DOMAIN}/success`,
          cancel_url: `${YOUR_DOMAIN}/canceled`
        }
  
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
  
        res.status(200).json(session);
      } 
      catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }  
}

export {getStripe}