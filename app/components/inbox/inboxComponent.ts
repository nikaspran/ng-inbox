import '../googleUserButton/googleUserButtonComponent';

import module from '../../appModule';
const templateUrl = <string> require('./inboxTemplate.html');

class InboxController {
  constructor(public google) {
    google.getThreads().then(threads => {
      console.log(threads);
    });
  }
}

module.component('npInbox', {
  controller: InboxController,
  templateUrl
});
