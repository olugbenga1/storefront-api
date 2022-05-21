import client from "../database";

export class DashboardQueries {
  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT name, price, order_id FROM products INNER JOIN order_products ON product.id = order_products.id";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("unable to get products and orders");
    }
  }
}
