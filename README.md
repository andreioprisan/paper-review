# paper-review interview project

Application for annotating, rating and commenting scientific papers.

It is hosted on heroku. https://paper-review.herokuapp.com/

Architecture
------------

Backend is simple Rails 5 app using only few additional gems.
- `devise` for user management
- `active_model_serializers` for JSON serialization
- `factory_girl_rails` for generating test objects

Front end is React-redux based application written in ES6+7 orchestrated by `webpack`. Hard work of rendering and handling annotations is done by https://github.com/mozilla/pdf.js and https://github.com/mvanlonden/pdf-annotate.js. I had to copy over the `pdf-annotate.js` library because distribution version was broken and was fixed only few hours ago at the time of writing.

Installation
------------

Ruby version is specified in Gemfile.

```
# Rails app
bundle install

# Create DB, run migrations and initialize it with seed data
rake db:setup

# JS app
cd webpack
npm install
```

Development
-----------

```
# Rails app
rails s

# JS app
cd webpack
npm run dev
```

Tests
-----

There is a huge space for improvements. JS app is not tested, but it's linted and vice versa.

```
# Rails tests
rake test

# eslint
cd webpack
npm run lint
```

Deployment
----------

Deployment is managed by https://github.com/negativetwelve/heroku-buildpack-subdir.

Webpack folder is build using node.js buildpack which compiles assets and ruby buildpack takes care of root folder.

Ruby buildpack sets up all required ENV variables. Here are the sample values.
- `DATABASE_URL=postgres://localhost/database-name`
- `RAILS_ENV=production`
- `RAILS_LOG_TO_STDOUT=enabled`
- `RAILS_SERVE_STATIC_FILES=enabled`
- `SECRET_KEY_BASE=your-key-base`


After application is deployed run migrations and seed.
```
heroku run rake db:migrate
heroku run rake db:seed
```
