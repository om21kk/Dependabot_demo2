# Dependabot Test Project

This project contains intentionally vulnerable dependencies to test Dependabot functionality.

## Vulnerable Dependencies Included:
- `lodash@4.17.4` - Contains prototype pollution vulnerabilities
- `express@4.16.0` - Contains various security issues
- `moment@2.19.3` - Contains ReDoS vulnerabilities  
- `axios@0.18.0` - Contains various security vulnerabilities
- `webpack@4.29.0` - Contains security issues

## Setup:
```bash
npm install
npm start
```

## Expected Dependabot Behavior:
Once pushed to GitHub with Dependabot enabled, you should see:
1. Security alerts in the Security tab
2. Automated pull requests to update vulnerable dependencies
3. Dependency graph showing vulnerable packages

## Testing:
- Push this to a GitHub repository
- Enable Dependabot security updates in repository settings
- Wait for Dependabot to scan and create PRs