# ePathshala Frontend

This is the frontend application for the ePathshala platform. It is built using modern JavaScript technologies (likely React with Vite as the build tool). The frontend provides the user interface and communicates with the backend via APIs.

## Project Structure

```
epathshala-Web/
├── .gitignore, .idea/
├── package.json, package-lock.json     # Node.js dependencies and scripts
├── vite.config.js, eslint.config.js    # Build and lint configuration
├── index.html                         # Main HTML entry point
├── README.md (original)
├── src/
│   ├── App.jsx, App.css               # Main React app component and styles
│   ├── main.jsx                       # Entry point for React app
│   ├── api/                           # API utility functions
│   ├── assets/                        # Static assets (images, icons, etc.)
│   ├── components/                    # Reusable UI components
│   ├── hooks/                         # Custom React hooks
│   ├── pages/                         # Page-level React components
│   ├── routes/                        # App routing configuration
│   ├── theme/                         # Theme and styling utilities
│   └── utils/                         # Utility/helper functions
├── public/                            # Static files served as-is
├── dist/                              # Production build output (generated)
├── node_modules/                      # Installed dependencies (generated)
├── test_exam_api.html                 # Standalone HTML for API testing
├── Various .md files (frontend summaries, etc.)
```

## Key Files & Directories
- **package.json**: Lists dependencies, scripts, project metadata.
- **vite.config.js**: Vite build tool configuration.
- **eslint.config.js**: Linting rules and settings.
- **index.html**: Main HTML file loaded in the browser.
- **src/**: Main source code directory.
  - **App.jsx**: Root React component.
  - **main.jsx**: App entry point, renders `App.jsx`.
  - **api/**: Contains code for API calls to backend services.
  - **components/**: Contains reusable React components (buttons, forms, etc.).
  - **pages/**: Each file/component represents a full page/view.
  - **routes/**: App routing (navigation between pages).
  - **hooks/**: Custom React hooks for stateful logic.
  - **theme/**: Styling, color schemes, and theme utilities.
  - **utils/**: Helper functions used across the app.
  - **assets/**: Images, icons, and other static resources.
- **public/**: Public static assets (favicon, etc.), copied as-is to build.
- **dist/**: Production build output (auto-generated, not tracked in VCS).
- **test_exam_api.html**: Standalone HTML file for API testing.
- **README.md, *_SUMMARY.md**: Documentation and change/fix summaries.

## Getting Started
1. Ensure Node.js and npm are installed.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

---

For more details, see the original `README.md` and documentation in each source directory.
