import { getDepartments } from "#db/queries/departments";
import express from "express";
const router = express.Router();
export default router;

// list all departments
router.get("/", async (req, res) => {
  const departments = await getDepartments();
  res.send(departments);
});

// single department with list of faculty
