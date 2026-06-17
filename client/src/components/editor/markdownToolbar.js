// client/src/components/editor/markdownToolbar.js

export function wrapSelection(value, start, end, before, after = before) {
  const selected = value.slice(start, end);
  const newValue =
    value.slice(0, start) + before + selected + after + value.slice(end);
  const cursorStart = start + before.length;
  const cursorEnd = cursorStart + selected.length;

  return { value: newValue, selectionStart: cursorStart, selectionEnd: cursorEnd };
}

export function prefixLines(value, start, end, prefixFn) {
  const before = value.slice(0, start);
  const block = value.slice(start, end);
  const after = value.slice(end);

  const lines = block.split("\n");
  const prefixed = lines
    .map((line, index) => {
      if (!line.trim()) {
        return line;
      }
      return `${prefixFn(line, index)}${line}`;
    })
    .join("\n");

  const newValue = before + prefixed + after;
  return {
    value: newValue,
    selectionStart: start,
    selectionEnd: start + prefixed.length,
  };
}

export function applyToolbarAction(action, value, start, end) {
  switch (action) {
    case "bold":
      return wrapSelection(value, start, end, "**");
    case "italic":
      return wrapSelection(value, start, end, "*");
    case "heading":
      return prefixLines(value, start, end, () => "## ");
    case "bullet":
      return prefixLines(value, start, end, () => "- ");
    case "numbered":
      return prefixLines(value, start, end, (_line, index) => `${index + 1}. `);
    case "code":
      if (start === end) {
        return wrapSelection(value, start, end, "`");
      }
      return wrapSelection(value, start, end, "```\n", "\n```");
    default:
      return { value, selectionStart: start, selectionEnd: end };
  }
}
