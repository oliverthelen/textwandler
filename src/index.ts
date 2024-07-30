import '../index.css';
import { TextWandler } from './textwandler/text-wandler';
import { setupServiceWorker } from './helper/service-worker';
import { setupResizeHandler } from './helper/resize-handler';

(async () => {
    setupServiceWorker();
    const textWandler = await TextWandler.getInstance();
    setupResizeHandler();
})();
