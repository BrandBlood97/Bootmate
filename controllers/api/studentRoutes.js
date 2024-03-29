const router = require("express").Router();
const { Student } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const studentData = await Student.findAll({
      attributes: { exclude: ["password"] },
    });
    const students = studentData.map((student) => student.get({ plain: true }));
    res.render('allStudents', {students});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:first_name", withAuth, async (req, res) => {
  try {
    const studentData = await Student.findOne({
      where: { first_name: req.params.first_name },
      attributes: { exclude: ["password"] },
    });
    if (!studentData) {
      res.status(404).json({ message: "No student found with this name!" });
      return;
    }
    res.json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/work/:looking", withAuth, async (req, res) => {
  try {
    const studentData = await Student.findAll({
      where: { looking_for_work: req.params.looking === "true" },
      attributes: { exclude: ["password"] },
    });
    if (!studentData) {
      res.status(404).json({ message: "No student found!" });
      return;
    }
    res.json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/student/seeking/:collab", withAuth, async (req, res) => {
  try {
    const studentData = await Student.findAll({
      where: { seeking_collab: req.params.collab === "true" },
      attributes: { exclude: ["password"] },
    });
    if (!studentData) {
      res.status(404).json({ message: "No student found!" });
      return;
    }
    res.json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const studentData = await Student.create(req.body);
    req.session.save(() => {
      req.session.student_id = studentData.id;
      req.session.logged_in = true;
      res.status(200).json(studentData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const studentData = await Student.findOne({
      where: { email: req.body.email },
    });
    if (!studentData) {
      res.status(400).json({ message: "Incorrect email or password!" });
      return;
    }

    const validPassword = await studentData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: "Incorrect email or password!" });
      return;
    }

    req.session.save(() => {
      req.session.student_id = studentData.id;
      req.session.logged_in = true;
      res.json({ student: studentData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const studentData = await Student.destroy({
      where: { id: req.params.id },
    });
    if (!studentData) {
      res.status(404).json({ message: "No student found with this id!" });
      return;
    }
    res.status(200).json(studentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router