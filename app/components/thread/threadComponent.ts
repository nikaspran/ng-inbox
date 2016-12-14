import module from '../../appModule';
const templateUrl = <string> require('./threadTemplate.html');

class ThreadController {
  public thread;
  public showDetails = false;
  public messages;

  constructor(private gmail) {
  }

  getSubject(message) {
    return this.gmail.getSubject(message);
  }

  getSummary() {
    return this.getLastMessage().snippet;
  }

  getBody(message) {
    return this.gmail.getBody(message);
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
