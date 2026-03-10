import db from "#db/client";

/**
 * @param {object} department
 * @param {string} department.name - department Name
 * @param {string} department.description - department description
 * @param {string} department.contact_info - email address
 * @param {string} department.image_path - path to the department image
 * @returns {object} the newly create department
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

/**
 *
 * @returns {Promise<object[]>} returns all departments
 */
export async function getDepartments() {
  const sql = `
  SELECT *
  FROM departments
  `;
  const { rows: departments } = await db.query(sql);
  return departments;
}

/**
 *
 * @param {number} id id of the desired department
 * @returns {Promise<object[]>}
 */
export async function getDepartmentByIdWithFaculty(id) {
  const sql = `
  SELECT
    departments.*,
    (
      SELECT json_agg(faculty)
      FROM faculty
      WHERE faculty.department_id = departments.id
    )
  FROM departments
  WHERE id = $1
  `;
  const {
    rows: [department],
  } = await db.query(sql, [id]);
  return department;
}
