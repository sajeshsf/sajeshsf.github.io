# Assets

Static assets (images, icons, etc.) used in the portfolio website.

## Overview

This directory contains static assets like SVG images that are imported in components.

## Usage

Assets are imported in components:
```javascript
import profileSvg from '../assets/profile.svg'
<img src={profileSvg} alt="Profile" />
```

## Public Assets

For publicly accessible assets (like profile.jpg), use the `public/` directory instead. See [public/README.md](../../public/README.md) for more information.

## Detailed Documentation

For complete assets documentation including best practices, see [src/README.md](../README.md#assets).
