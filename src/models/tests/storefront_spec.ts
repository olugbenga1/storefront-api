import { User, UserStore } from "../user";
import { Product, ProductStore } from "../product";
import { Order, OrderStore } from "../order";

const user = new UserStore();
const product = new ProductStore();
const order = new OrderStore();

describe("user model", () => {
  it("should have an index method", () => {
    expect(user.index).toBeDefined();
  });
  it("index should return an array of users", async () => {
    const result = await user.index();
    expect(result).toEqual([]);
  });
});

describe("product model", () => {
  it("should have an index method", () => {
    expect(product.index).toBeDefined();
  });
  it("index should return an array of products", async () => {
    const result = await product.index();
    expect(result).toEqual([]);
  });
});

describe("order model", () => {
  it("should have an index method", () => {
    expect(order.index).toBeDefined();
  });
  it("index should return an array of products", async () => {
    const result = await order.index();
    expect(result).toEqual([]);
  });
});
