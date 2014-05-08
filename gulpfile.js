var gulp = require('gulp')
var through2 = require('through2')
var path = require('path')

function replaceProcessEnv() {
  return through2.obj(function(file, encoding, done) {
    var original = file.contents.toString('utf8');
    var reactExpression = path.basename(file.path) === 'React.js' ? 'React' : "require('./React')";
    var replaced = original.replace(/"production" !== process.env.NODE_ENV/g, reactExpression + ".__DEV__ === true")
    file.contents = new Buffer(replaced);
    this.push(file);
    done();
  });
}

gulp.task('default', function(done) {
  return gulp.src('./node_modules/react/lib/*.js')
             .pipe(replaceProcessEnv())
             .pipe(gulp.dest('./lib/'))
})
