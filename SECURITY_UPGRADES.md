# Security Upgrade Notes

This document tracks security improvements made and future major version upgrades needed.

**Current Status**: Core security improvements (CSP, secure storage) are complete. Dependency updates are documented below but not yet applied - they should be done in a separate PR with proper lockfile regeneration.

## Completed Security Improvements

### 1. Content Security Policy
- **Added**: Comprehensive CSP headers in `public/index.html`
- **Protection**: XSS prevention, resource loading restrictions, clickjacking protection
- **Headers Added**:
  - Content-Security-Policy
  - X-Content-Type-Options
  - X-Frame-Options
  - Referrer-Policy

### 2. localStorage Integrity Checks
- **Added**: Secure storage wrapper with HMAC-based integrity checking
- **File**: `src/utils/secureStorage.ts`
- **Features**:
  - SHA-256 based checksums for data integrity
  - Version management to invalidate old cached data
  - Automatic corruption detection and cleanup
- **Usage**: Manifest caching now uses secure storage

### 3. Dependency Security Updates
- **Status**: PLANNED (not yet applied due to lockfile constraints)
- **Approach**: Conservative updates to maintain compatibility
- **Focus**: Security patches and bug fixes
- **Note**: Dependency updates require `yarn install` to regenerate yarn.lock, which should be done in a separate PR to avoid CI conflicts

## Planned Dependency Version Updates

### Production Dependencies
- @material-ui/core: 4.11.0 → 4.12.4 (latest v4)
- @material-ui/icons: 4.9.1 → 4.11.3 (latest v4)
- @material-ui/styles: 4.11.3 → 4.11.5 (latest v4)
- @msgpack/msgpack: 2.7.2 → 2.8.0
- react-router: 5.2.0 → 5.3.4
- react-router-dom: 5.2.0 → 5.3.4
- typescript: 4.5.0 → 4.9.5
- js-base64: 3.6.0 → 3.7.7
- markdown-to-jsx: 7.1.1 → 7.4.7
- superstruct: 0.15.2 → 0.15.5
- All @types packages updated to latest compatible versions

### Development Dependencies
- @babel/* packages: Updated to v7.24.x
- @typescript-eslint/*: 5.17.0 → 5.62.0
- eslint-plugin-*: All updated to latest compatible versions
- prettier: 2.3.2 → 2.8.8

## Future Major Version Upgrades Needed

The following major version upgrades involve breaking changes and require dedicated migration effort:

### High Priority

#### 1. React 17 → 18
**Current**: React 17.0.2
**Target**: React 18.x
**Effort**: Medium
**Breaking Changes**:
- Automatic batching changes
- Concurrent features
- New root API (`createRoot`)
- Updated TypeScript types

**Benefits**:
- Performance improvements
- Better concurrent rendering
- Improved SSR support
- Active security support

**Migration Guide**: https://react.dev/blog/2022/03/08/react-18-upgrade-guide

---

#### 2. Material-UI v4 → MUI v5/v6
**Current**: @material-ui/* 4.12.4
**Target**: @mui/material 5.x or 6.x
**Effort**: High
**Breaking Changes**:
- Package names changed (@material-ui → @mui)
- New styling engine (JSS → Emotion)
- Theme structure changes
- Component API changes
- Different default props

**Benefits**:
- Better TypeScript support
- Improved performance
- Active development and security updates
- New components and features

**Migration Guide**: https://mui.com/material-ui/migration/migration-v4/

---

#### 3. react-scripts 4 → 5
**Current**: react-scripts 4.0.3
**Target**: react-scripts 5.x
**Effort**: Low-Medium
**Breaking Changes**:
- Webpack 5 (from Webpack 4)
- Jest 27 (from Jest 26)
- ESLint 8 (from ESLint 7)
- Tailwind CSS support removed

**Benefits**:
- Better build performance
- Modern tooling
- Security updates

**Note**: Requires Node.js 14+ (currently using 16 in CI)

---

#### 4. YAML 1.x → 2.x
**Current**: yaml 1.10.2
**Target**: yaml 2.x
**Effort**: Low
**Breaking Changes**:
- API changes in parser options
- Different handling of some edge cases

**Benefits**:
- Better YAML 1.2 compliance
- Performance improvements
- Security fixes

---

### Medium Priority

#### 5. TypeScript 4.9 → 5.x
**Current**: TypeScript 4.9.5
**Target**: TypeScript 5.x
**Effort**: Low
**Breaking Changes**:
- Some type inference changes
- Stricter checks

**Benefits**:
- Better performance
- New language features
- Improved type checking

---

#### 6. React Router 5 → 6
**Current**: react-router 5.3.4
**Target**: react-router 6.x
**Effort**: Medium
**Breaking Changes**:
- Component API completely redesigned
- Route configuration changes
- No more `<Switch>`, use `<Routes>`
- useHistory → useNavigate
- Match object structure changes

**Benefits**:
- Better TypeScript support
- Smaller bundle size
- Improved nested routing

**Migration Guide**: https://reactrouter.com/en/main/upgrading/v5

---

## Recommended Upgrade Path

1. **Phase 1** (Completed): Patch updates within current major versions
2. **Phase 2**: react-scripts 4 → 5, TypeScript 4 → 5
3. **Phase 3**: React 17 → 18 (test thoroughly)
4. **Phase 4**: Material-UI v4 → MUI v5 (largest effort, consider v6 directly)
5. **Phase 5**: React Router 5 → 6, YAML 1 → 2

## Testing Strategy

Before each major upgrade:
1. Review migration guides thoroughly
2. Update tests to match new APIs
3. Test in development environment
4. Run full test suite
5. Manual testing of all features
6. Check for console warnings/errors
7. Verify build output size
8. Test in production-like environment

## Security Monitoring

- Set up Dependabot or Renovate for automated dependency updates
- Run `yarn audit` regularly
- Subscribe to security advisories for key dependencies
- Review GitHub Security Advisories tab

## Current Vulnerabilities Status

To check current vulnerabilities:
```bash
yarn audit
```

Note: Some vulnerabilities may be in transitive dependencies and require major version upgrades to resolve.
