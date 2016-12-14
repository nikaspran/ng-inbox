import '../googleUserButton/googleUserButtonComponent';
import '../threads/threadsComponent';

import module from '../../appModule';
const templateUrl = <string> require('./inboxTemplate.html');
require('./inbox.css');

class InboxController {
  public threads = [];
  private nextPageToken;
  public loading = false;
  public finished = false;

  constructor(public google) {
    this.loadMoreThreads();
  }

  loadMoreThreads() {
    if (!this.google.user || this.loading || this.finished) {
      return;
    }

    this.loading = true;
    this.google.getThreads(this.nextPageToken)
      .then(response => {
        this.finished = !response.nextPageToken;
        this.nextPageToken = response.nextPageToken;
        [].push.apply(this.threads, response.threads);
      })
      .finally(() => this.loading = false)
  }
}

module.component('npInbox', {
  controller: InboxController,
  templateUrl
});
