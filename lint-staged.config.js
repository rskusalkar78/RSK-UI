module.exports = {
  'src/**/*.{ts,tsx}': [
    'eslint --fix',
    'prettier --write'
  ],
  'src/**/*.css': [
    'prettier --write'
  ],
  '**/*.{json,md}': [
    'prettier --write'
  ]
};