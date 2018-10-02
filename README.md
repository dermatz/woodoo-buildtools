[![Build Status](https://travis-ci.org/dermatz/woodoo-buildtools.svg?branch=master)](https://travis-ci.org/dermatz/woodoo-buildtools)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

# Woodoo Frontend Buildtool 1.5.0
- Creates you a own project independent build process
- Author: Mathias Elle
- E-Mail: hello@dermatz.de
- Website: https://www.dermatz.de

Woodoo Buildtool is a standalone gulp setup with all necessary gulp tools to build
and create your frontend projects. Woodoo Buildtool come with a config file to add
your project specific pathes and variables (`gulp_config.json`). Read more about it
in the Getting Started section below this part.

## Gulp Features
- Gulp 3.x
- Sass 4 Support
- CSS Minify & Sourcemaps
- CSS Autoprefixer
- CSS Linter
- JS Concatination
- JS Minify
- JS Linter
- Spritemaps (PNG/SVG)
- Imageoptimisation
- Automatic Setup Process
- Automatic merge of your Project package.json

## Getting Started with automatic Setup
In this case the Buildtool setup will create and install all necessary files.

## 1. Installation
### Step 1: Installation Woodoo with Composer
Add following lines to your composer.json
```
  "extra": {
    "installer-paths":{
      "./woodoo-buildtools/core": ["dermatz/woodoo-buildtools"]
    }
  }
```

Now run these commands in your project root to install woodoo buildtools in root/woodoo-buildtools
```
composer.phar config repositories.woodoo-buildtools git https://gitlab.com/dermatz/woodoo-buildtools.git
composer.phar require dermatz/woodoo-buildtools --dev "^1.4.0"
```

### Step 2: Woodoo Setup

Just switch into Woodoo-Buildtool folder and run the install script
```
cd woodow-buildtools
sh core/setup.sh
```

Follow the instructions in setup. 
During the setup you will get new files in the woodoo-buildtools folder, if they are not exist.
After the Setup you can easily build your whole frontend project
from woodoo-buildtools folder. Just run `gulp` from the woodoo buildtool folder in your console.

## Update Woodoo with Project NPM Packages
In this case you can run `gulp update-packages` in the woodoo-buildtools folder.
The tool will look into your project folder and merge the json with the woodoo packages. 

## Issue-Reporting
Feel free to report issues or add pull-requests. Thanks for your support!

## License
This project is licensed under the Open Software License 3.0. [Read more](https://choosealicense.com/licenses/osl-3.0/#)

## Copyright

(c) 2018 Mathias Elle
