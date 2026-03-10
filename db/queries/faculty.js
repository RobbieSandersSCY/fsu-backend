import db from "#db/client";

/**
 *
 * @param {string} name - employee name
 * @param {string} bio - employee bio
 * @param {string} contact_info - email address
 * @param {string} image_path - folder_path
 * @returns
 */
export async function createFaculty({
  name,
  bio,
  contact_info,
  image_path,
}) {
  const sql = `
  INSERT INTO faculty
    (name, bio, contact_info, image_path)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [faculty],
  } = await db.query(sql, [name, bio, contact_info, image_path]);
  return faculty;
}
