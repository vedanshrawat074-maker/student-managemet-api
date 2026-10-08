// Modular routing - all /students endpoints live here
const express = require('express');
const students = require('../data/students');

const router = express.Router();

// ---------- helpers ----------
const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

// returns an error message if the body is invalid, otherwise null
const validateStudent = (body) => {
  if (!body || typeof body !== 'object') return 'Request body is required';
  const { name, course } = body;
  if (typeof name !== 'string' || name.trim() === '') return 'Name is required and must be a non-empty string';
  if (typeof course !== 'string' || course.trim() === '') return 'Course is required and must be a non-empty string';
  return null;
};

// ---------- GET /students ----------
router.get('/', (req, res) => {
  res.status(200).json(students);
});

// ---------- GET /students/:id ----------
router.get('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid student ID' });

  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  res.status(200).json(student);
});

// ---------- POST /students ----------
router.post('/', (req, res) => {
  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ error });

  const nextId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const newStudent = { id: nextId, name: req.body.name.trim(), course: req.body.course.trim() };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// ---------- PUT /students/:id ----------
router.put('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid student ID' });

  const error = validateStudent(req.body);
  if (error) return res.status(400).json({ error });

  const student = students.find((s) => s.id === id);
  if (!student) return res.status(404).json({ error: 'Student not found' });

  student.name = req.body.name.trim();
  student.course = req.body.course.trim();

  res.status(200).json(student);
});

// ---------- DELETE /students/:id ----------
router.delete('/:id', (req, res) => {
  const id = parseId(req.params.id);
  if (id === null) return res.status(400).json({ error: 'Invalid student ID' });

  const index = students.findIndex((s) => s.id === id);
  if (index === -1) return res.status(404).json({ error: 'Student not found' });

  const [deleted] = students.splice(index, 1);
  res.status(200).json({ message: 'Student deleted successfully', student: deleted });
});

module.exports = router;
