module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: { 
    "prettier/prettier": 0,
    "comma-dangle": 0,
    "no-trailing-spaces": 0,
    "semi": 0,
    "quotes": 0,
    "eol-last": 0,
    "react-native/no-inline-styles": 0,
    "curly": 0,
    "react-hooks/exhaustive-deps": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  },
  parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
    }
  },
  parser: "babel-eslint",
};
