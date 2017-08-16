import { GmFrontendPage } from './app.po';

describe('gm-frontend App', () => {
  let page: GmFrontendPage;

  beforeEach(() => {
    page = new GmFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
