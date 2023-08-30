import "@/styles/globals.scss"
import { UserProvider } from "@/context/UserContext";
import { CartProvider } from "@/context/CartContext"
import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
      return (
          <UserProvider>
              <CartProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
              </CartProvider>
          </UserProvider>
      )
}
