import '../index.css';
import { TextWandler } from './textwandler/text-wandler';
import { setupServiceWorker } from './helper/service-worker';
import { setupResizeHandler } from './helper/resize-handler';
import { APP_WEBPACK_MODE } from './helper/globals';

(async () => {
    console.log('APP_WEBPACK_MODE', APP_WEBPACK_MODE);
    if (APP_WEBPACK_MODE === 'production') {
        setupServiceWorker();
    }
    await TextWandler.getInstance();
    setupResizeHandler();
})();
