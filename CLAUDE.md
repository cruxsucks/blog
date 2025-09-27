# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CruxSux is a simple static blog hosted on GitHub Pages. The blog uses plain HTML, CSS, and is designed to be lightweight and easy to maintain.

## Architecture

- **Static Site**: Pure HTML/CSS blog without build tools or frameworks
- **GitHub Pages**: Hosted directly from the repository root
- **Structure**:
  - `index.html` - Main blog homepage
  - `style.css` - Global styles for the blog
  - `posts/` - Directory containing individual blog post HTML files
  - Blog posts are standalone HTML files linking back to the main site

## Development Commands

Since this is a static site, no build commands are required. For local development:

```bash
# Serve locally (if you have Python installed)
python -m http.server 8000

# Or with Node.js
npx serve .

# Or open index.html directly in a browser
```

## Adding New Blog Posts

1. Create a new HTML file in the `posts/` directory
2. Use the existing `posts/first-post.html` as a template
3. Update the `index.html` file to add the new post to the "Latest Posts" section
4. Commit and push to update the live site

## GitHub Pages Setup

To enable GitHub Pages hosting:
1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select "main" branch and "/ (root)" folder
4. The site will be available at `https://[username].github.io/CruxSux`

## File Structure

```
/
├── index.html          # Homepage
├── style.css           # Global styles
├── posts/              # Blog posts directory
│   └── first-post.html # Example blog post
└── CLAUDE.md           # This file
```