import { Router } from 'express';

const router = Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/api')
});

export { router as indexRouter }
