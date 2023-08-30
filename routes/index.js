import { Router } from 'express';

const router = Router()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(process.cwd() + '../public/index.html')
});

export { router as indexRouter }
