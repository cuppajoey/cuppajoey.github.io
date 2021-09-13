const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const zip = require('gulp-zip');
const through2 = require( 'through2' );  

const source = __dirname,
    distribution = __dirname + '/dist';  

const touch = () => through2.obj( function( file, enc, cb ) {
    if ( file.stat ) {
        file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
    }
    cb( null, file );
});


/**
 * Compile files from assets/sass into both assets/css
 */
function compileSass(done) {
    src('assets/sass/app.sass')
    .pipe(sass({ includePaths: ['sass'], outputStyle: 'uncompressed' })
        .on('error', sass.logError)
    )
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(touch())
    .pipe(dest('assets/css'));
    done();
}

/**
 * Compile files from assets/sass into both assets/css
 */
function deploySass(done) {
    src('assets/sass/app.sass')
    .pipe(sass({ includePaths: ['sass'], outputStyle: 'compressed' })
        .on('error', sass.logError)
    )
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(touch())
    .pipe(dest('assets/css'));
    done();
}

/**
 * Watch Sass files for changes
 */
function watchSass() {
    watch('assets/sass/*.sass', compileSass);
}

/**
 * Deploy production package
 */
function deploy() {
    console.log('Compiling sass');

    compileSass

    console.log('Building files');
  
    src([
        source + '/**/*',
        '!' + source + '/node_modules',
        '!' + source + '/node_modules/**/*',
        '!' + source + '/assets/sass',
        '!' + source + '/assets/sass/**/*',
    ], { base: source })
        .pipe( zip('cuppajoey.zip') )
        .pipe( dest(distribution) )
    done();

    console.log('Finished Build');
}

/**
 * Copy package with sass files included
 */
function copy() {
    src([
        source + '/**/*',
        '!' + source + '/node_modules',
        '!' + source + '/node_modules/**/*'
    ], { base: source })
        .pipe( zip('anthem-copy.zip') )
        .pipe( dest(distribution) )
    done();
}

/**
 * Default task, running just `gulp` will compile the sass, concatenate css, and watch files
 */
exports.deploy = deploy;
exports.copy = copy;
exports.default = series(deploySass, watchSass);
