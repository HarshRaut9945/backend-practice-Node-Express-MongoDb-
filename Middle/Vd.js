import express from 'express';
import { body, validationResult } from 'express-validator';

const app = express();

app.set("view engine", 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.json());

var validationRegistration = [
  body('fullname')
    .notEmpty().withMessage('Fullname is required')
    .isLength({ min: 3 }).withMessage('Fullname must be at least 3 characters long')
    .trim()
    .isAlpha().withMessage('Fullname must contain only letters')
    .custom((value) => {
      if(value==='admin'){
        throw new Error('This name is not allowed');
      }
      return true;
    })
    .customSanitizer(value=>value.toLowerCase()                                                                                                                                                                                                                                                                                                                              )
    ,

  body('email').isEmail().withMessage('Valid email is required'),

  body('password')
    .isLength({ min: 6, max: 10 })
    .withMessage('Password must be between 6 and 10 characters long'),

  body('gender').notEmpty().withMessage('Gender is required'),

  body('terms')
    .equals("on").withMessage('You must accept terms and conditions'),
];

app.get('/myform', (req, res) => {
  res.render('myform',{errors:0});
});

app.post('/saveform', validationRegistration, (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
        res.send(req.body);
  }
  res.render("myform", {errors: errors.array() });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
