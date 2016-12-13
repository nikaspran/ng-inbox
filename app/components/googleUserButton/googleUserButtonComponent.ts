import '../../services/google';
import module from '../../appModule';
const templateUrl = <string> require('./googleUserButtonTemplate.html');

class GoogleUserButtonController {
  constructor(public google) {
  }
}

module.component('npGoogleUserButton', {
  controller: GoogleUserButtonController,
  templateUrl
});
