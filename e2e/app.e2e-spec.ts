import { ProjectCalculatorPage } from './app.po';

describe('project-calculator App', function() {
  let page: ProjectCalculatorPage;

  beforeEach(() => {
    page = new ProjectCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
