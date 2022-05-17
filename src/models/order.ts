import client from "../database";

export type Order = {
  id?: string;
  status: string;
  userId: string;
};

export type OrderProducts = {
  id?: string;
  productId: string;
  orderId: string;
  quantity: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders";
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE id = ($1)";
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const checkUser = "SELECT * FROM users WHERE id = ($1)";
      const checkedUser = await conn.query(checkUser, [order.userId]);
      if (checkedUser.rows.length < 1) "This user does not exist";
      const values = [order.status, order.userId];
      const sql =
        "INSERT INTO orders (order_status, userid) VALUES ($1, $2) RETURNING *";
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async addProducts(
    quantity: number,
    orderId: string,
    productId: number
  ): Promise<OrderProducts> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO order_products (quantity, orderid, productid) VALUES ($1, $2, $3) RETURNING *";
      const res = await conn.query(sql, [quantity, orderId, productId]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
