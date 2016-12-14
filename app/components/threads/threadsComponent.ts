import '../thread/threadComponent';

import module from '../../appModule';
const templateUrl = <string> require('./threadsTemplate.html');

class ThreadsController {
  public threads;
}

module.component('npThreads', {
  bindings: {
    threads: '<'
  },
  controller: ThreadsController,
  templateUrl
});
