import './style/root.css'
import './style/style.css'
import { createHomePage } from "./pages/home";
import { getLocalitation } from './functions/localitation';
import { events } from './functions/eventListenner';


document.addEventListener('DOMContentLoaded', () => {
    createHomePage();
    getLocalitation();
    events();
})