/* eslint-env node */
module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [ 
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [],
    "rules": {
        "indent": [
            "error",
            2  
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0,
        "no-unused-vars": "warn",
        "no-undef": "warn"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }