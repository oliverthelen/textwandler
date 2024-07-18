import '../index.css';
import { TextWandler } from './textwandler/text-wandler';

(async () => {
    // setupServiceWorker();
    const textWandler = await TextWandler.getInstance();
})();
