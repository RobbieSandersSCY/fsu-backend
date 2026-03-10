import db from "#db/client";

/**
 * @param {object} faculty
 * @param {string} faculty.name - employee name
 * @param {string} faculty.bio - employee bio
 * @param {string} faculty.contact_info - email address
 * @param {number} faculty.department_id - department_id for related department
 * @param {string} faculty.image_path - file path to faculty image
 * @returns {Promise<object>} the newly created professor
 */
export async function createFaculty({
  name,
  bio,
  contact_info,
  department_id,
  image_path,
}) {
  const sql = `
  INSERT INTO faculty
    (name, bio, contact_info, department_id, image_path)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const {
    rows: [faculty],
  } = await db.query(sql, [
    name,
    bio,
    contact_info,
    department_id,
    image_path,
  ]);
  return faculty;
}

/**
 *
 * @returns {Promise<object[]>} returns all faculty members
 */
export async function getFaculty() {
  const sql = `
  SELECT *
  FROM faculty
  `;
  const { rows: faculty } = await db.query(sql);
  return faculty;
}

/**
 *
 * @param {number} id desired faculty member's id number
 * @returns {Promise<object>}
 */
export async function getFacultyByIdWithDepartment(id) {
  const sql = `
  SELECT
    faculty.*,
    (
      SELECT json_agg(departments)
      FROM departments
      WHERE departments.id = faculty.department_id
    )
  FROM faculty
  WHERE id = $1
  `;
  const {
    rows: [faculty],
  } = await db.query(sql, [id]);
  return faculty;
}
