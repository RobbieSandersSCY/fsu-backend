import db from "#db/client";
import bcrypt from "bcrypt";

/**
 *
 * @param {text} username
 * @param {text} password
 * @returns {Promise<object[]>} newly created user
 */
export async function createUser(username, password) {
  const sql = `
  INSERT INTO users
    (username, password)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

/**
 *
 * @param {string} username
 * @param {string} password
 * @returns {Promise<object[]>}
 */
export async function getUserByUsernameAndPassword(
  username,
  password,
) {
  const sql = `
  SELECT *
  FROM users
  WHERE username = $1
  `;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
}

/**
 *
 * @param {number} id - id of the desired user
 * @returns {Promise<object[]>} user - returns user with matching id
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
