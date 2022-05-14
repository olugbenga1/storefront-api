import client from "../database";

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products";
      const conn = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`Cannot return products ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql =
        "INSERT into products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
      const conn = await client.connect();
      const values = [product.name, product.price, product.category];
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot create product ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id = ($1)";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot show product ${error}`);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const sql = "DELETE FROM users WHERE id = ($1) RETURNING *";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete product ${error}`);
    }
  }
}
