import './vendor';
import './components/inbox/inboxComponent';
import './services/google';
import './services/gmail';

angular.module('np.inbox', [
  'np.app',
  'ngSanitize',
  'ngMaterial'
]);

angular.bootstrap(document, ['np.inbox'], {strictDi: true});
