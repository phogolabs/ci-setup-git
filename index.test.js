const {envup} = require('./setup');

test('test env', () => {
  process.env['GITHUB_REPOSITORY'] = 'phogolabs/ci-setup-git';
  // execute the env
  envup()
  // check the env
  expect(process.env['GOPRIVATE']).toEqual('github.com/phogolabs/*');
})
