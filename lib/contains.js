export default function contains(container, node) {
  if (container.contains) return container.contains(node)
  /* istanbul ignore if */
  if (container.compareDocumentPosition)
    return container === node || (container.compareDocumentPosition(node) === 16)
}
