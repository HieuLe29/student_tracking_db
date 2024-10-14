const express = require('express');
const {sequelize, Year, Classroom, Subject, Student} = require('./models');
const subject = require('./models/subject');
const { where } = require('sequelize');
const { Op } = require('sequelize');
 
const app = express();
app.use(express.json());

//Year
app.post('/years', async (req, res) => {
          const {year_name, start_date, end_date} = req.body;
          try {
                    const year = await Year.create({year_name, start_date, end_date}); 
                    return res.json(year);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.get('/years', async (req, res) => {
          try {
                    const years = await Year.findAll();
                    return res.json(years);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.put('/years/:uuid', async (req, res) => {
          const uuid = req.params.uuid;
          const {year_name, start_date, end_date} = req.body;
          try {
                    const year = await Year.findOne({where: {uuid}});
                    await year.update({year_name, start_date, end_date});
                    return res.json(year);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

//Classroom
app.post('/classrooms', async (req, res) => {
          const {yearUuid, class_name} = req.body;
          try {    
                    const year = await Year.findOne({where: {uuid: yearUuid}});
                    // return res.json(year.id);
                    const classroom = await Classroom.create({class_name, year_id: year.id})
                    return res.json(classroom);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.get('/classrooms', async (req, res) => {
          try {
                    const classerooms = await Classroom.findAll();
                    // const classerooms = await Classroom.findAll({include: ['year']});
                    return res.json(classerooms);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.put('/classrooms/:uuid', async (req, res) => {
          const uuid = req.params.uuid;
          const {class_name, year_id} = req.body;
          try {
                    const classroom = await Classroom.findOne({where: {uuid}});
                    await classroom.update({class_name, year_id});
                    return res.json(classroom);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

//SUBJECT
app.post('/subjects', async (req, res) => {
          const {subject_name, credits} = req.body;
          try {    
                    const subject = await Subject.create({subject_name, credits});
                    return res.json(subject);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.get('/subjects', async (req, res) => {
          try {
                    const subjects = await Subject.findAll();
                    return res.json(subjects);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.put('/subjects/:uuid', async (req, res) => {
          const uuid = req.params.uuid;
          const {subject_name, credits} = req.body;
          try {
                    const subject = await Subject.findOne({where: {uuid}});
                    await subject.update({subject_name, credits});
                    return res.json(subject);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

//Student
app.post('/students', async (req, res) => {
          const {student_name, date_of_birth, email, classroom_id, year_id} = req.body;
          try {    
                    const student = await Student.create({student_name, date_of_birth, email, classroom_id, year_id});
                    return res.json(student);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.get('/students', async (req, res) => {
          try {
                    const students = await Student.findAll();
                    return res.json(students);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})        

app.get('/students/search', async (req, res) => {
          const {student_name, email, classroom_id} = req.query;
          try {
                    const whereClause = {};
                    if (student_name) whereClause.student_name = {[Op.like]: `%${student_name}%`};
                    if (email) whereClause.email = {[Op.like]: `%${email}%`};
                    if (classroom_id) whereClause.classroom_id = classroom_id;

                    const students = await Student.findAll({where: whereClause});

                    if (students.length ===  0) {
                              return res.status(404).json({error: 'Student not found!'})
                    }

                    return res.json(students);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.put('/students/:uuid', async (req, res) => {
          const uuid = req.params.uuid;
          const {student_name, date_of_birth, email, classroom_id, year_id} = req.body;
          try {
                    const student = await Student.findOne({where: {uuid}});
                    await student.update({student_name, date_of_birth, email, classroom_id, year_id});
                    return res.json(student);
          } catch (err) {
                    console.log(err);
                    return res.status(500).json({error: err.message});
          }
})

app.listen({ port: 5000 }, async () => {
          console.log('Server up on http://localhost:5000')
          await sequelize.authenticate();
          console.log('Database Connected!')
})

