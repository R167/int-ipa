# Int-IPA Project Guide

## Development Commands
- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run all tests
- `yarn test src/path/to/file.test.ts` - Run specific test file
- `yarn lint` - Run ESLint on source files
- `yarn fix` - Run Prettier and ESLint with auto-fix
- `yarn analyze` - Analyze JS bundle size
- `yarn release` - Run release script (creates new version)

## Code Style Guidelines
- Use TypeScript with proper typing for all components and functions
- Components should be functional with React hooks (no class components)
- Use Material-UI for UI components with consistent styling
- Imports should be sorted alphabetically (enforced by ESLint)
- Maximum line length is 100 characters
- Use 2 spaces for indentation
- Files end with LF line endings and a single trailing newline
- Use semi-colons at the end of statements
- Use memo() for performance optimization where appropriate
- Use proper hook dependency arrays (exhaustiveDepsFix enforced)

## Project Structure
- React components in src/components/
- Parser logic in src/utils/parsers/
- Test files co-located with implementation (*.test.ts)
- Configuration files in public/config/

## Versioning and Release Process
- Project uses Semantic Versioning (currently pre-1.0.0)
- Changelog follows the Keep a Changelog format
- Breaking changes must be documented in CHANGELOG.md
- Run `./scripts/changelog.rb` to generate changelog links

## Key Features
- Interactive IPA keyboard for phonetic transcription
- Support for customizable task configurations in YAML
- Audio playback functionality with waveform display
- Client-side verification with submission codes
- Multiple assignment support with incremental progress saving