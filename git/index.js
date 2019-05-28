const git = require('nodegit');
const path = require('path');
const fs = require('fs-extra');
const repoDir = './client/theme';
const colors = require('colors');

exports.init = (app) => {
  git.Repository.open(path.resolve(repoDir))
  .then(function(repo) {
    console.log('[git] Repository found'.blue);
    app.set('repo', repo);
  })
  .catch(function() {
    console.log('[git] Creating repository'.blue);
    // Create themes git
    // Ensure we have a themes directory
    fs.ensureDir(path.resolve(repoDir))
    .then(function() {
      // Initialize repository
      return git.Repository.init(path.resolve(repoDir), 0);
    })
    .then(function(repo) {
      app.set('repo', repo);
      return fs.writeFile(path.join(repo.workdir(), 'log.md'), `theme created: ${Date.now()}`);
    })
    .then(function(){
      return app.get('repo').refreshIndex();
    })
    .then(function(idx) {
      app.set('gitIndex', idx);
    })
    .then(function() {
      return app.get('gitIndex').addAll(['.']);
    })
    .then(function() {
      return app.get('gitIndex').write();
    })
    .then(function() {
      return app.get('gitIndex').writeTree();
    })
    .then(function(oid) {
      var author = git.Signature.now('George Butter',
        'threeninenineone@gmail.com');
      var committer = git.Signature.now('George Butter',
        'butsandcats@github.com');

      // Since we're creating an inital commit, it has no parents. Note that unlike
      // normal we don't get the head either, because there isn't one yet.
      return app.get('repo').createCommit("HEAD", author, committer, ":sparkles: Initial commit", oid, []);
    })
    .then(function(commitId) {
      console.log(`[git] New Commit: ${commitId}`.blue);
      app.get('repo').createBranch('master', commitId, true);
    })
  });
}
