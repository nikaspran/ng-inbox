import module from '../appModule';
import base64url from 'base64url';

class Gmail {
  constructor() {
  }

  private getHeaderValue(message, key) {
    const matchingValues = message.payload.headers
      .filter(header => header.name === key)
      .map(header => header.value);
    return matchingValues[0];
  }

  getSubject(message) {
    return this.getHeaderValue(message, 'Subject');
  }

  getFrom(message) {
    return this.getHeaderValue(message, 'From');
  }

  getTo(message) {
    return this.getHeaderValue(message, 'To');
  }

  getBody(message) {
    const text = ( // TODO: optimise to only DFS once
      this.deepFindWithMimeType([message.payload], 'text/html') ||
      this.deepFindWithMimeType([message.payload], 'text/plain')
    );
    return text && base64url.decode(text.body.data);
  }

  private deepFindWithMimeType(fromParts, mimeType) {
    return fromParts.map(part => {
      if (part.mimeType === mimeType) {
        return part;
      }

      if (part.mimeType.indexOf('multipart') === 0) {
        return this.deepFindWithMimeType(part.parts, mimeType);
      }
    }).filter(value => value)[0];
  }
}

module.service('gmail', Gmail);
