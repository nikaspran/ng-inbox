import 'angular';
import 'angular-material';

import './components/inbox/inboxComponent';

angular.module('np.inbox', [
  'np.app',
  'ngMaterial'
]);

angular.bootstrap(document, ['np.inbox'], {strictDi: true});
