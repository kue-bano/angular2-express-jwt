import { Angular2ExpressJwtPage } from './app.po';

describe('angular2-express-jwt App', function() {
  let page: Angular2ExpressJwtPage;

  beforeEach(() => {
    page = new Angular2ExpressJwtPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
