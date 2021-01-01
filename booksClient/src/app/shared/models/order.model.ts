import { Cart } from './cart.model';

export class Order {
  _id?: String;
  user_id: String;
  created_at?: Date;
  items: Cart[];
  total: Number;
  address: Address;
}
class Address {
  name: String;
  line_1: String;
  line_2: String;
  pincode: Number;
  state: String;
}
