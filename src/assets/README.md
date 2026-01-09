# Assets

Static assets (images, icons, etc.) used in the portfolio website.

## SVG Images

- **profile.svg** - Profile picture SVG (fallback)
- **react.svg** - React logo (if needed)

## Usage

Assets are imported in components:

```javascript
import profileSvg from '../assets/profile.svg'

<img src={profileSvg} alt="Profile" />
```

## Best Practices

1. **Optimization**: Use SVG for scalable graphics
2. **Alt Text**: Always include alt text for images
3. **Naming**: Use descriptive filenames
4. **Size**: Optimize file sizes for web

## Public Assets

For publicly accessible assets (like profile.jpg), use the `public/` directory instead. See [public/README.md](../../public/README.md) for more information.
