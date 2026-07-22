import Header from "./element/Header";
import Footer from "./element/Footer";
import CartDrawer from '../page/cart/cart';
import { Outlet } from "react-router-dom";

function Default() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
            <CartDrawer />
        </div>
    );
}

export default Default;