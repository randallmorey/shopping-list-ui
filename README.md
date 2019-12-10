# shopping-list-ui

An efficient shopping list for efficient people.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [Mozilla Firefox](https://www.mozilla.org/en-us/firefox/)

## Installation

* `git clone <repository-url>` this repository
* `cd shopping-list-ui`
* `npm install`

## Running / Development

* `npm start` to run with mock data
* `npm run start:firebase` to run against the Firebase development environment
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at
  [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `npm test`

### Linting

* Lint all:  `npm run lint`
* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:sass`

### Building

* `npm run build` (development)
* `npm run build:production` (production)

### Deploying

This application is automatically deployed when merged to a mainline branch.

## Contributing

Contributions consistent with the style and quality of existing code are
welcomed.  Be sure to follow the guidelines below.

Check the issues page of this repository for available work.

### Language Localization

This project uses [ember-i18next](https://github.com/OCTRI/ember-i18next) for
language localization.  Templates should reference content rather than hardcode
it.  Place new translations for each language in `public/locales/`.

### Models & Mocks

A full suite of mock data with mock API endpoints is generated at runtime via
[ember-cli-mirage](https://www.ember-cli-mirage.com).  Newly added models must
include mocks in `mirage/`.

### Accessibility

Accessibility is a core feature and must be considered for all contributions.
Automated a11y testing is performed via
[ember-a11y-testing](https://github.com/ember-a11y/ember-a11y-testing).

### Styles

This project is based on Bulma and uses OOCSS with `sass` syntax.  Styles
are neatly separated by component or type into **layout**:  styles that affect
size and position, and **theme**:  purely presentational concerns like color,
font, and other styles that don't affect layout.  This makes it easier to
manage multiple presentational themes, such as standard vs high-contrast and
light vs dark, though multiple themes are not yet realized.

When an element requires multiple utility or styling classes, it's an
indication that it may need a new class name that extends them.  Refer to
existing styles as a guide.

Whenever possible, styles should be reusable across multiple components.  This
means overly concrete class names should be avoided.  For example, a custom
alert for `.alert-resouce-not-found` could either use an existing generic alert
style, or a more reusable class name such as `.alert-response-error` that
covers a broader potential set of cases.  This means thinking about style
classes independently of application components.

### Tests

All new features are expected to include tests with 100% coverage.  All code
is expected to pass lint checks.

### Branching & Committing

This project follows [a successful git branching model][nvie-git-branching] and
uses [commitizen][commitizen] and
[cz-conventional-changelog][cz-conventional-changelog].  Commitizen helps to
ensure that commit messages remain well-formatted and consistent across
different contributors.

[Watch a helpful video about commitizen][commitizen-video], but follow the
directions here for actual usage within this project.

To start work on a new change, pull the latest `develop` and create
a new _topic branch_ (e.g. `feature-resume-model`, `chore-test-update`,
`bugfix-bad-bug`).  Work should be committed to
[topic branches][nvie-git-branching] only, never directly to mainline branches.
To begin a commit, stage changes as usual:

```
git add .
```

To commit, run the following command (instead of `git commit`) and follow the
directions:

```
npm run commit
```

When committing in this manner, _tests are executed automatically and all tests
must pass before the commit may be finalized_.  If tests fail, please address
the issue(s) and try the commit procedure again.

We recommend making incremental commits at logical stopping points whenever
possible, rather than large monolithic commits at the end of a feature.

### Pull Requests

When a topic branch is ready to merge, submit a pull request from the topic
branch into `develop` via GitHub.  Pull requests are automatically tested in CI
and may only be merged after all checks pass successfully.  At that time,
a core team member may merge the PR into `develop`.

### Issue References

Commit messages and pull requests should
[short link to GitHub issues][issue-autolinking] when referencing information in
the issue.  Commits and PRs that fix or resolve an issue should
[close the issue in the message][issue-closing].


[nvie-git-branching]: http://nvie.com/posts/a-successful-git-branching-model/
[commitizen]: https://www.npmjs.com/package/commitizen
[cz-conventional-changelog]: https://www.npmjs.com/package/cz-conventional-changelog
[commitizen-video]: https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-committing-a-new-feature-with-commitizen
[issue-autolinking]: https://help.github.com/articles/autolinked-references-and-urls/
[issue-closing]: https://help.github.com/articles/closing-issues-using-keywords/
