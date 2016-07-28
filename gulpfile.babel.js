// generated on 2016-07-19 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('styles:sys', () => {
  return gulp.src('app/sys/css/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/sys/css'))
    .pipe(gulp.dest('dist/sys/css'))
    .pipe(reload({stream: true}));
});
gulp.task('styles:plugins', () => {
  return gulp.src('app/plugins/**/css/*.css')
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/plugins'))
    .pipe(gulp.dest('dist/plugins'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts:sys', () => {
  return gulp.src('app/sys/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/sys/js'))
    .pipe(gulp.dest('dist/sys/js'))
    .pipe(reload({stream: true}));
});
gulp.task('scripts:plugins', () => {
  return gulp.src('app/plugins/**/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/plugins'))
    .pipe(gulp.dest('dist/plugins'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/sys/js/*.js'));
gulp.task('lint', lint('app/plugins/**/js/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html:sys', ['styles:sys', 'scripts:sys'], () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', () => {
      $.uglify()
      console.log(12);
    }))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});
gulp.task('html:plugins', ['styles:plugins', 'scripts:plugins'], () => {
  return gulp.src('app/plugins/**/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist/plugins'));
});

gulp.task('images:sys', () => {
  return gulp.src('app/sys/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/sys/images'));
});
gulp.task('images:plugins', () => {
  return gulp.src('app/plugins/smartIMG/images/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/plugins/smartIMG/images'));
});

// gulp.task('fonts', () => {
//   return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
//     .concat('app/fonts/**/*'))
//     .pipe(gulp.dest('.tmp/fonts'))
//     .pipe(gulp.dest('dist/fonts'));
// });

gulp.task('extras:sys', () => {
  return gulp.src('app/sys/**/**/*')
    .pipe(gulp.dest('dist/sys'));
});
gulp.task('extras:plugins', () => {
  return gulp.src('app/plugins/**/version.json')
    .pipe(gulp.dest('app/plugins/**'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles:sys', 'styles:plugins', 'scripts:sys', 'scripts:plugins', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    'app/sys/images/**/*',
    'app/plugins/**/*.html',
    'app/plugins/**/images/*'
  ]).on('change', reload);

  gulp.watch('app/sys/css/*.css', ['styles:sys']);
  gulp.watch('app/sys/js/*.js', ['scripts:sys']);
  gulp.watch('app/plugins/**/css/*.css', ['styles:plugins']);
  gulp.watch('app/plugins/**/js/*.js', ['scripts:plugins']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

// gulp.task('serve:test', ['scripts'], () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/scripts': '.tmp/scripts',
//         '/bower_components': 'bower_components'
//       }
//     }
//   });

//   gulp.watch('app/scripts/**/*.js', ['scripts']);
//   gulp.watch('test/spec/**/*.js').on('change', reload);
//   gulp.watch('test/spec/**/*.js', ['lint:test']);
// });

// inject bower components
gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap.js'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', [/*'lint',*/ 'html:sys', 'html:plugins', 'images:sys', 'images:plugins', 'extras:sys', 'extras:plugins'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
