# Stashdex

> **Save anything. Organize nothing. Find everything.**

Stashdex is an open-source, local-first desktop inbox for everything worth remembering.

The goal is to provide one place where you can quickly save useful links, text, images, screenshots, and other information, then easily find them again later without remembering where you originally saved them.

## Why Stashdex?

Useful information often ends up scattered across:

* Browser bookmarks
* Discord
* Instagram
* Messages
* Screenshots
* Notes
* Other applications

Over time, finding something again becomes harder than saving it in the first place.

Stashdex is designed around a simpler workflow:

```text
Discover something useful
        ↓
Save it to Stashdex
        ↓
Find it again later
```

The long-term goal is to make saving require as little effort as possible while avoiding the need to manually organize everything into folders, categories, or tags.

## Core Principles

### Easy to Save

Saving something should require as few actions as possible.

The planned desktop experience will allow Stashdex to stay unobtrusively at the edge of the screen and expose a quick-capture panel when needed.

### Organize Nothing

Users should not have to maintain complicated folder structures, nested categories, or large collections of manual tags.

Stashdex will gradually provide automatic organization as the project develops.

### Find Everything

Finding previously saved information is a core part of Stashdex.

The project will first support traditional keyword search and later explore semantic and natural-language search.

### Local-First

Stashdex is designed to work locally without requiring an account or cloud service.

User data will initially be stored on the user's own computer.

Optional synchronization may be added in the future without making cloud usage mandatory.

## Planned Desktop Experience

The intended quick-capture workflow is:

```text
Move mouse to screen edge
        ↓
Open Stashdex capture panel
        ↓
Paste or drop content
        ↓
Save
```

The full Stashdex Library will provide a larger interface for browsing, searching, opening, editing, and deleting saved content.

## Project Status

Stashdex is currently in early development.

Current development stage:

```text
Stage 01 — Project Foundation
```

The current project includes:

* Electron Forge
* Electron
* TypeScript
* Webpack
* ESLint
* Git-based version control

React integration and the first Stashdex user interface are still being implemented.

Stashdex is **not yet ready for normal end-user installation or production use**.

## Technology

The initial architecture is planned around:

```text
Electron Main Process
        ↓
Electron Preload
        ↓
React Renderer
        ↓
IPC
        ↓
SQLite
```

Initial technologies:

* Electron
* React
* TypeScript
* Webpack
* SQLite
* Git
* GitHub

The renderer will remain isolated from unrestricted Node.js and filesystem access. Native functionality will be exposed through controlled preload APIs and validated IPC.

## Development

### Requirements

Before running Stashdex locally, install:

* Node.js
* npm
* Git

### Install Dependencies

```bash
npm install
```

### Start Development Mode

```bash
npm start
```

Electron should open the Stashdex development window.

### Create a Package

```bash
npm run package
```

### Create Distributables

```bash
npm run make
```

Packaging and installer support are still under development and should not yet be treated as production releases.

## Project Structure

The current project structure is approximately:

```text
stashdex/
├── src/
│   ├── index.ts
│   ├── preload.ts
│   ├── renderer.ts
│   ├── index.html
│   └── index.css
├── forge.config.ts
├── webpack.main.config.ts
├── webpack.renderer.config.ts
├── webpack.rules.ts
├── package.json
├── tsconfig.json
├── CHANGELOG.md
├── LICENSE
└── README.md
```

As development continues, this structure will evolve.

## Roadmap

Development is being approached incrementally.

Major planned areas include:

* Desktop edge capture
* URL and text capture
* Local SQLite storage
* Main Library interface
* CRUD operations
* Keyword search
* Automatic URL metadata
* Images, clipboard, and drag-and-drop
* Desktop integration
* Semantic search
* Automatic organization
* Browser extension support
* Optional cloud synchronization
* Mobile sharing
* Rediscovery features
* Testing, packaging, CI, and stable releases

The project intentionally starts with the smallest useful implementation before adding more advanced features.

## Versioning

Stashdex follows Semantic Versioning.

The project is currently in the `0.x` development phase, where APIs, architecture, and behavior may change significantly.

See [CHANGELOG.md](CHANGELOG.md) for notable changes.

## License

Stashdex is licensed under the MIT License.

See [LICENSE](LICENSE) for details.
