import express from "express";
const router = express.Router();
export default router;

import {
  getDepartments,
  getDepartmentByIdWithFaculty,
} from "#db/queries/departments";

// list all departments
router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

// single department with list of faculty
router.param("id", async (req, res, next, id) => {
  const department = await getDepartmentByIdWithFaculty(id);
  req.department = department;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.department);
});

// ADMIN AREA BELOW

// create new department

// update existing department

// delete department
