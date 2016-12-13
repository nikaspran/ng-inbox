import module from '../../appModule';
const templateUrl = <string> require('./inboxTemplate.html');

class InboxController {
  constructor() {
    console.log('Hello world x!');
  }
}

module.component('npInbox', {
  controller: InboxController,
  templateUrl
});
