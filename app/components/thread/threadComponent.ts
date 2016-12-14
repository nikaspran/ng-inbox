import module from '../../appModule';
const templateUrl = <string> require('./threadTemplate.html');
require('./thread.css');

class ThreadController {
  public thread;
  public showDetails = false;
  public messages;

  constructor(public gmail) {
  }

  getSummary() {
    return this.getLastMessage().snippet;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  getLastMessage() {
    return this.thread.messages[this.thread.messages.length - 1];
  }
}

module.component('npThread', {
  bindings: {
    thread: '<'
  },
  controller: ThreadController,
  templateUrl
});
