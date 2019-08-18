[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

[![DerMatz on Twitter](https://img.shields.io/twitter/follow/_dermatz.svg?style=social&label=Follow%20@_dermatz)](https://twitter.com/_dermatz/)

# Woodoo Frontend Buildtool 2.2.0
- Author: Mathias Elle
- E-Mail: hello@dermatz.de
- Website: https://www.dermatz.de

Woodoo Buildtool is a standalone gulp setup with all necessary modern gulp dependencies to build
and create your frontend projects. Woodoo Buildtool come with a config file to add your project specific pathes 
and variables (`gulp_config.json`). 

Read more about it in the Getting Started section below this part.


## Gulp Features
- NPX Setup
- Gulp 4.x
- Sass 4 Support
- Babel 8
- CSS Minify & Sourcemaps
- CSS Autoprefixer
- SCSS Linter
- JS Concatination for Head-js, Lib's and Footer-JS
- JS Minification
- JS Linter
- Browser-Sync (Multi-Device Livepreview)
- Image-Optimisation
- Automatic Setup Process via `npx woodoo-buildtools`
- Automatic merge of your Project package.json with `gulp update_json` or `npm run woodoo-init`

## Getting Started with full automatic NPM Setup 
In this case the Buildtool setup will create and install all necessary files.

This might take only a few seconds 

```

# 1— Navigate into your Project/Theme and run:

npx woodoo-buildtools

# 2— Now configure variables inside the woodoo-buildtools/gulp_config.json file
# 3— Finish the Setup with:

npm run woodoo-init

```
Just follow the install instructions.

---
#### Just a tip: Get a perfect folder structure
To get best results you can get this sample-project structure.
```
../YourTheme/
  |
  ├── dist (will be automaticly create by running the default gulp-task ($ gulp) depending of your entries in gulp_config.json)
  |    ├── css
  |    |    ├── main.css
  |    |    └── main.css.map (will be autogenerated)
  |    ├── js
  |    |    └── main.min.js
  |    └── images
  |         ├── image-one.jpg (minified)
  |         └── image-two.jpg (minified)
  └── assets
       ├── images
       |    ├── image-one.jpg
       |    └── image-two.jpg
       |
       ├── js
       |    ├── lib
       |    |     ├── my-script.js
       |    |     └── my-script2.js
       |    ├── head
       |    |     ├── my-script.js
       |    |     └── my-script2.js
       |    ├── footer
       |    |     ├── my-script.js
       |    |     └── my-script2.js
       └── scss
            └── project.scss
```
---

Issue-Reporting
---
Feel free to report issues or add pull-requests. Thanks for your support!

Thanks goes to
--- 
- Inspiration for the installation process by https://github.com/ahmadawais 

License
---
This project is licensed under the Open Software License 3.0. [Read more](https://choosealicense.com/licenses/osl-3.0/#)


### Copyright

(c) 2018 - 2019 Mathias Elle
