import express from "express";
const router = express.Router();
export default router;

import {
  getFaculty,
  getFacultyByIdWithDepartment,
} from "#db/queries/faculty";

// list all faculty
router.get("/", async (req, res) => {
  const faculty = await getFaculty();
  res.send(faculty);
});

// single faculty with department attached
router.param("id", async (req, res, next, id) => {
  const faculty = await getFacultyByIdWithDepartment(id);
  req.faculty = faculty;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.faculty);
});

// ADMIN AREA BELOWs

// create new faculty

// update existing faculty

// delete faculty member
