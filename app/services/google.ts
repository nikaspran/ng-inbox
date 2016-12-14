import module from '../appModule';

class Google {
  private whenReady;
  private gapi;
  user;

  constructor($window, private $q, private $rootScope) {
    this.gapi = $window.gapi;
    this.whenReady = this.initialiseApi()
      .then(() => this.listenForSignInStatus())
      .catch(error => console.log(error));
  }

  private listenForSignInStatus() {
    const setUserIf = signedIn => {
      if (signedIn) {
        this.user = this.gapi.auth2.getAuthInstance().currentUser.get();
      } else {
        this.user = null;
      }
    };

    setUserIf(this.gapi.auth2.getAuthInstance().isSignedIn.get());
    this.gapi.auth2.getAuthInstance().isSignedIn.listen(signedIn => {
      setUserIf(signedIn);
      this.$rootScope.$digest();
    });
  }

  private initialiseApi() {
    return this.$q((resolve, reject) => {
      this.gapi.load('client:auth2', () => {
        this.gapi.client.init({
          discoveryDocs: [
            'https://people.googleapis.com/$discovery/rest',
            'https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'
          ],
          clientId: process.env.GOOGLE_CLIENT_ID,
          scope: 'profile https://www.googleapis.com/auth/gmail.readonly',
        }).then(resolve, ({error}) => reject(error.message))
      })
    });
  }

  signIn() {
    return this.whenReady.then(() => this.gapi.auth2.getAuthInstance().signIn());
  }

  signOut() {
    return this.whenReady.then(() => this.gapi.auth2.getAuthInstance().signOut());
  }

  getThreads(pageToken) {
    return this.whenReady.then(() => this.gapi.client.gmail.users.threads.list({
      userId: 'me',
      pageToken
    }))
      .then(response => response.result)
      .then(result => this.$q.all({
        nextPageToken: result.nextPageToken,
        threads: this.batchAll(result.threads.map(thread => this.getThreadDetails(thread.id)))
      }));
  }

  getMessagesByIds(ids) {
    return this.whenReady.then(() => this.batchAll(ids.map(id => this.getMessage(id))));
  }

  private getMessage(id) {
    return this.gapi.client.gmail.users.messages.get({
      userId: 'me',
      id
    });
  }

  private getThreadDetails(threadId) {
    return this.gapi.client.gmail.users.threads.get({
      userId: 'me',
      id: threadId
    })
  }

  private batchAll(requests) {
    const batch = this.gapi.client.newBatch();
    requests.forEach((request, index) => batch.add(request, {id: index}));

    return batch
      .then(response => response.result)
      .then(responses => requests.map((request, index) => responses[index].result)); // response might not be in order, reindex
  }
}

module.service('google', Google);
