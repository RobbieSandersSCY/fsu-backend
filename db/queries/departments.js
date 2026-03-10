import db from "#db/client";

/**
 *
 * @param {string} name - Department Name
 * @param {string} description - Department description
 * @param {string} contact_info - email address
 * @param {string} image_path - folder_path
 * @returns
 */
export async function createDepartment({
  name,
  description,
  contact_info,
  image_path,
}) {
  const sql = `
  INSERT INTO departments
    (name, description, contact_info, image_path)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `;
  const {
    rows: [department],
  } = await db.query(sql, [
    name,
    description,
    contact_info,
    image_path,
  ]);
  return department;
}

export async function getDepartments() {
  const sql = `
  SELECT *
  FROM departments
  `;
  const { rows: departments } = await db.query(sql);
  return departments;
}
