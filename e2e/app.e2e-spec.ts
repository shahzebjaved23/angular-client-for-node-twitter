import { NodeTwitterPage } from './app.po';

describe('node-twitter App', () => {
  let page: NodeTwitterPage;

  beforeEach(() => {
    page = new NodeTwitterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
