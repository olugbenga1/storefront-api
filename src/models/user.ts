import bcrypt from "bcrypt";
import client from "../database";

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

const pepper = process.env.BCRYPT_PASSWORD;
const saltrounds = <string>process.env.SALT_ROUNDS;

// UserStore class for defining models
export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT * FROM users";
      const conn = await client.connect();
      const res = await conn.query(sql);
      conn.release();
      return res.rows;
    } catch (error) {
      throw new Error(`Cannot return users ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (firstname, lastname, password_digest) VALUES ($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const hash = await bcrypt.hash(
        user.password + pepper,
        parseInt(saltrounds)
      );
      const res = await conn.query(sql, [user.firstname, user.lastname, hash]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(
        `Cannot create new user ${user.firstname}, ${user.lastname} >> ${error}`
      );
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id =($1)";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot show user ${error}`);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id = ($1) RETURNING *";
      const conn = await client.connect();
      const res = await conn.query(sql, [id]);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw new Error(`Cannot delete user. ${error}`);
    }
  }

  async updatePassword(id: string, user: User): Promise<User> {
    try {
      const sql =
        "UPDATE users SET password_digest = ($1) WHERE id = ($2) RETURNING *";
      const hash = await bcrypt.hash(
        user.password + pepper,
        parseInt(saltrounds)
      );
      const values = [hash, id];
      const conn = await client.connect();
      const res = await conn.query(sql, values);
      conn.release();
      return res.rows[0];
    } catch (error) {
      throw Error(`Cannot update password. ${error}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    try {
      const sql =
        "SELECT password_digest FROM users WHERE firstname = ($1) AND lastname = ($2)";
      const conn = await client.connect();
      const res = await conn.query(sql, [firstname, lastname]);
      if (res.rows.length) {
        const user = res.rows[0];
        const correctPassword = await bcrypt.compare(
          password + pepper,
          user.password_digest
        );
        if (correctPassword) {
          return user;
        }
      }
      return null;
    } catch (error) {
      throw new Error(`Unable to authenticate user ${error}`);
    }
  }
}
