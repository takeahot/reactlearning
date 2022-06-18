import { Cart } from "../../../reactlesson5/src/store/cart";
import { Order } from "../../../reactlesson5/src/store/order";

export class RootStore {
    constructor () {
        this.cart = new Cart(this);
        this.order = new Order(this);
    }
}

export default new RootStore;