import './gmail';
import base64url from 'base64url';

describe('gmail', () => {
  let gmail;

  beforeEach(angular.mock.module('np.app'));
  beforeEach(inject((_gmail_) => {
    gmail = _gmail_;
  }));

  describe('getSubject()', () => {
    it('should return the "Subject" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'Subject', value: 'Some Subject'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getSubject(message)).toEqual('Some Subject');
    });
    it('should return undefined if there is no "Subject" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getSubject(message)).toEqual(undefined);
    });
  });

  describe('getFrom()', () => {
    it('should return the "From" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'From', value: 'Some Person <some@person.com>'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getFrom(message)).toEqual('Some Person <some@person.com>');
    });
    it('should return undefined if there is no "From" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getFrom(message)).toEqual(undefined);
    });
  });

  describe('getTo()', () => {
    it('should return the "To" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'To', value: 'Some Person <some@person.com>'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getTo(message)).toEqual('Some Person <some@person.com>');
    });
    it('should return undefined if there is no "To" header', () => {
      const message = {
        payload: {
          headers: [
            {name: 'Something', value: 'Some Value'},
            {name: 'Something Else', value: 'Some Value'}
          ]
        }
      };
      expect(gmail.getTo(message)).toEqual(undefined);
    });
  });

  describe('getBody()', () => {
    it('should return the html body of a message without nesting', () => {
      const message = {
        payload: {
          mimeType: 'text/html', body: {data: base64url.encode('Html Body')}
        }
      };
      expect(gmail.getBody(message)).toEqual('Html Body');
    });
    it('should fall back to a plain text body if no html body present', () => {
      const message = {
        payload: {
          mimeType: 'text/plain', body: {data: base64url.encode('Plain Text Body')}
        }
      };
      expect(gmail.getBody(message)).toEqual('Plain Text Body');
    });
    it('should return the html body of a message with a simple structure', () => {
      const message = {
        payload: {
          mimeType: 'multipart/*',
          parts: [
            {mimeType: 'text/plain', body: {data: base64url.encode('Plain Text Body')}},
            {mimeType: 'text/html', body: {data: base64url.encode('Html Body')}}
          ]
        }
      };
      expect(gmail.getBody(message)).toEqual('Html Body');
    });
    it('should return the html body of multipart messages', () => {
      const message = {
        payload: {
          mimeType: 'multipart/*',
          parts: [
            {mimeType: 'application/pdf', body: {data: base64url.encode('some pdf')}},
            {
              mimeType: 'multipart/alternative',
              parts: [
                {mimeType: 'text/plain', body: {data: base64url.encode('Plain Text Body')}},
                {mimeType: 'text/html', body: {data: base64url.encode('Html Body')}}
              ]
            },
            {mimeType: 'text/plain', body: {data: base64url.encode('Plain Text Body')}}
          ]
        }
      };
      expect(gmail.getBody(message)).toEqual('Html Body');
    });
  });
});
