
# @paintface/alpine-match-heights

**Alpine.js plugin to match heights of grouped elements.**

This plugin ensures elements in the same group have matching heights, useful for creating visually consistent layouts. It leverages Alpine.js and works seamlessly with dynamic content and responsive designs.

Based on the vanilla JavaScript solution from [@joshdonnell](https://github.com/joshdonnell/vanilla-js-match-height).

---

## Installation

### Via npm
Install the package:

```bash
npm install @paintface/alpine-match-heights
```

Then, import and register the plugin in your JavaScript:

```javascript
import matchHeight from '@paintface/alpine-match-heights';

document.addEventListener('alpine:init', () => {
    Alpine.plugin(matchHeight);
});
```

---

## Usage

1. Add the `x-match-height` directive to the elements you want to group by height.
2. Optionally, provide a group name as the directive's argument for grouping.
3. You can also use the modifier `x-match-height.row` to match heights within a row, ensuring heights are matched only for elements in the same row.

### Example: Basic Usage

```html
<div x-data>
    <div x-match-height style="background: #f0f0f0; padding: 10px;">Short content</div>
    <div x-match-height style="background: #d0d0d0; padding: 10px;">Longer content with more text</div>
    <div x-match-height style="background: #b0b0b0; padding: 10px;">Medium content</div>
</div>
```

### Example: Multiple Groups

```html
<div x-data>
    <div x-match-height="'group1'" style="background: #f0f0f0; padding: 10px;">Group 1 - Short</div>
    <div x-match-height="'group1'" style="background: #d0d0d0; padding: 10px;">Group 1 - Long</div>
    
    <div x-match-height="'group2'" style="background: #b0b0b0; padding: 10px;">Group 2 - Short</div>
    <div x-match-height="'group2'" style="background: #a0a0a0; padding: 10px;">Group 2 - Medium</div>
</div>
```

---

## Features

- **Automatic Height Adjustment:** Dynamically adjusts heights whenever the content changes.
- **Responsive:** Adapts to screen size changes using a debounced resize listener.
- **Group Support:** Easily organise elements into groups for independent height matching.
- **Efficient Observers:** Uses `MutationObserver` and `IntersectionObserver` for performance.

---

## API

### `x-match-height`
The main directive. It accepts an optional string argument to group elements.

#### Syntax:
```html
x-match-height="'groupName'"
```

#### Arguments:
- **`groupName` (string)**: Optional. A name to group related elements. If omitted, defaults to `"default"`.

---

## Development

### Build Locally
Clone the repository and install dependencies:

```bash
git clone https://github.com/paintface/alpine-match-heights.git
cd alpine-match-heights
npm install
```

Build the plugin:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## Issues

If you encounter any issues, please report them [here](https://github.com/paintface/alpine-match-heights/issues).

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

Developed by **Danny Painter**.
[GitHub](https://github.com/paintface) | [LinkedIn](https://www.linkedin.com/in/danny-painter-0b8a1a47/)

---

## Acknowledgements

- Built using [Alpine.js](https://alpinejs.dev/).
