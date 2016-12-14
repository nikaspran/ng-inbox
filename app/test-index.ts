import './vendor';
import 'angular-mocks';

const testsContext = (<any> require).context('.', true, /.spec$/);
testsContext.keys().forEach(path => {
  testsContext(path);
});
