import { gateway as MoltinGateway } from '@moltin/sdk'

const VUE_APP_MOLTIN_CLIENT_ID = process.env.VUE_APP_MOLTIN_CLIENT_ID || 'EdP3Gi1agyUF3yFS7Ngm8iyodLgbSR3wY4ceoJl0d2'

const Moltin = MoltinGateway({
  client_id: VUE_APP_MOLTIN_CLIENT_ID,
})

export default {

  getHomepageProducts() {
    return Moltin.Products.Filter({}).With('main_image').Limit(8).All()
  },

  findBySlug(slug) {
    return Moltin.Products.Filter({
      eq: {
        slug: slug
      }
    }).With(['main_image', 'brands']).Limit(1).All()
  },

  getCart() {
    return Moltin.Cart().Items()
  },

  addToCart(productId, qty) {
    return Moltin.Cart().AddProduct(productId, qty)
  },

  removeFromCart(itemId) {
    return Moltin.Cart().RemoveItem(itemId)
  },

  checkout(customerId, billing, shipping) {
    return Moltin.Cart().Checkout(customerId, billing, shipping)
  },

  pay(orderId, paymentData) {
    return Moltin.Orders.Payment(orderId, paymentData)
  }

}
