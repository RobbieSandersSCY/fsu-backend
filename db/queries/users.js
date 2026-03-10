import db from "#db/client";
import bcrypt from "bcrypt";

/**
 *
 * @param {number} id
 * @returns {Array} user - returns user with matching id
 */
export async function getUserById(id) {
  const sql = `
  SELECT *
  FROM users
  WHERE id = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  return user;
}
