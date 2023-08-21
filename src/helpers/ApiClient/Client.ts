import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

export default class Client {
  private currentRoot: ByProjectKeyRequestBuilder;
  constructor(root: ByProjectKeyRequestBuilder) {
    this.root = root;
  }

  get root() {
    return this.currentRoot;
  }

  set root(newRoot: ByProjectKeyRequestBuilder) {
    this.currentRoot = newRoot;
  }
}
