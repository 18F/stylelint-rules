
# stylelint-rules
A style (CSS, Sass) linter for the 18F style guide

The aim of this module is to present a sensible set of linting defaults for
front-end projects, without requiring an additional dependency on ruby. It
leverages stylelint and postCSS to perform many of the same linting functions as
scss-lint.

---

## Usage Information

To get started, run `npm install --save-dev @18f/stylelint-rules`. This adds the module
to your project and saves the dependency to your package.json.

stylelint-rules provides two ways to run its linter: via the command line, and
via gulp.

### Run via gulp
To run the linter using gulp, import the module into your gulpfile:
`var stylelint = require('@18f/stylelint-rules');`

The stylelint function accepts two arguments:
  * `files`: **required** A glob of files you want to lint. For example './src/scss/\*\*/*.scss'

  * `options`: **optional** An object of configuration options.
    ```
    {
      syntax: Syntax the linter validates against. Valid options are `scss|css|less`. Defaults to scss
      ignore: A glob (or array of globs) of files the linter should ignore,
      config: A path to a stylelint config file. File should use the same
      conventions as the config file found in this repository, exporting a
      single javascript object.

    }
    ```

Example gulp task:

```
var lintFunction = stylelint('./src/css/**/*.scss', {
  ignore: 'some/lib/**/*.scss'
});

gulp.task('my-lint-task', lintFunction);
```

### Run via the command line
The linter can also be run using the command line. The script is installed in
the .bin folder of your node_modules directory. The only required argument to the script is a glob of directories (or path to a single file) to be linted.

For example: `node_modules/.bin/18f-stylelint-rules "./path/to/sass/**/*.scss"`

Additionally, the CLI exposes the following options:

```
-s, --syntax [scss|css|less], Linter syntax. Defaults to scss.
-i, --ignore-files [string], Glob of directories or files to ignore
-f, --formatter [verbose|json|string], Output formatter. Defaults to verbose.
-c, --config [rules], Path to a js file that exports an object describing additional rules.
```

## Contributing
Please see [CONTRIBUTING.md](./CONTRIBUTING.md).
