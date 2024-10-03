import '../index.css';
import { TextWandler } from './textwandler/text-wandler';
import { setupServiceWorker } from './helper/service-worker';
import { setupResizeHandler } from './helper/resize-handler';
import { APP_WEBPACK_MODE } from './helper/globals';

(async () => {
    if (APP_WEBPACK_MODE === 'production') {
        setupServiceWorker();
    }
    await TextWandler.getInstance();


                console.log('TEST');

    
    setupResizeHandler();
})();
