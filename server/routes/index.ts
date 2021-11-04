import express from 'express';
import { AboutPageDisplay, ContactPageDisplay, HomePageDisplay, ProjectPageDisplay, ServicesPageDisplay } from '../controllers';
const router = express.Router();

/*get home page*/
router.get('/', HomePageDisplay);

router.get('/about', AboutPageDisplay);

router.get('/projects', ProjectPageDisplay);

router.get('/services', ServicesPageDisplay);

router.get('/contact', ContactPageDisplay);

export default router;
