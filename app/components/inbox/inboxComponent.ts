import '../googleUserButton/googleUserButtonComponent';
import '../threads/threadsComponent';

import module from '../../appModule';
const templateUrl = <string> require('./inboxTemplate.html');

class InboxController {
  public threads;
  private nextPageToken;

  constructor(public google) {
    google.getThreads().then(threads => {
      this.nextPageToken = threads.nextPageToken;
      this.threads = threads.threads;
    });
  }
}

module.component('npInbox', {
  controller: InboxController,
  templateUrl
});
