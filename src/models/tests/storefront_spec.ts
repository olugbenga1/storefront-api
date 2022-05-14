import { User, UserStore } from "../user";

const store = new UserStore();

describe("Storefront model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
  it("index should return an array of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
