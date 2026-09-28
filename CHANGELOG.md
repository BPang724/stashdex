# Changelog

All notable changes to Stashdex will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Added separate Capture and Library windows.
- Added secure preload and IPC communication for opening the Library.# Changelog

All notable changes to Stashdex will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project follows [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- Added separate Capture and Library windows.
- Added secure preload and IPC communication for opening the Library.
- Added a frameless, always-on-top Capture window.
- Added collapsed icon and expanded Capture panel states.
- Added hover-based Capture panel expansion and collapse.
- Added draggable Capture icon behavior.
- Added automatic snapping to the left or right screen edge.
- Added side-aware Capture panel layout.

### Changed

- Split the original single renderer into dedicated Capture and Library renderers.
- Updated the renderer Webpack configuration to support multiple window entry points.
- Updated renderer source maps to work with the application's Content Security Policy.
- Reworked the Capture window interaction around an edge-mounted draggable icon.

## [0.0.1] - 2026-09-27

### Added

- Initialized the Stashdex desktop application with Electron Forge.
- Added Webpack and TypeScript support.
- Added React and React DOM to the renderer.
- Added the initial Stashdex React application interface.
- Added the initial Electron main process, preload script, and renderer.
- Added development, packaging, and build scripts through Electron Forge.
- Added ESLint configuration.
- Added Git repository configuration and `.gitignore`.
- Added consistent line-ending rules through `.gitattributes`.
- Added project documentation with `README.md`.
- Added the Stashdex product definition with `PRODUCT.md`.
- Added the project changelog.
- Added the MIT License.
- Established the initial Stashdex project structure.

### Changed

- Updated the TypeScript toolchain for compatibility with current type definitions.
- Updated TypeScript ESLint tooling for the newer TypeScript version.
- Modernized Electron and Webpack imports to use ES module syntax.

### Verified

- Verified the project can be cloned from GitHub into a clean environment.
- Verified dependencies can be installed from `package-lock.json`.
- Verified TypeScript type checking passes successfully.
- Verified ESLint passes successfully.
- Verified Electron development mode starts successfully.
- Verified the React renderer loads successfully inside the Electron window.
- Added a frameless, always-on-top Capture window.
- Added collapsed icon and expanded Capture panel states.
- Added hover-based Capture panel expansion and collapse.
- Added draggable Capture icon behavior.
- Added automatic snapping to the left or right screen edge.
- Added side-aware Capture panel layout.

### Changed

- Split the original single renderer into dedicated Capture and Library renderers.
- Updated the renderer Webpack configuration to support multiple window entry points.
- Updated renderer source maps to work with the application's Content Security Policy.
- Reworked the Capture window interaction around an edge-mounted draggable icon.

## [0.0.1] - 2026-09-27

### Added

- Initialized the Stashdex desktop application with Electron Forge.
- Added Webpack and TypeScript support.
- Added React and React DOM to the renderer.
- Added the initial Stashdex React application interface.
- Added the initial Electron main process, preload script, and renderer.
- Added development, packaging, and build scripts through Electron Forge.
- Added ESLint configuration.
- Added Git repository configuration and `.gitignore`.
- Added consistent line-ending rules through `.gitattributes`.
- Added project documentation with `README.md`.
- Added the Stashdex product definition with `PRODUCT.md`.
- Added the project changelog.
- Added the MIT License.
- Established the initial Stashdex project structure.

### Changed

- Updated the TypeScript toolchain for compatibility with current type definitions.
- Updated TypeScript ESLint tooling for the newer TypeScript version.
- Modernized Electron and Webpack imports to use ES module syntax.

### Verified

- Verified the project can be cloned from GitHub into a clean environment.
- Verified dependencies can be installed from `package-lock.json`.
- Verified TypeScript type checking passes successfully.
- Verified ESLint passes successfully.
- Verified Electron development mode starts successfully.
- Verified the React renderer loads successfully inside the Electron window.