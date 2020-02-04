export default function contains(container, node) {
  if (container.contains) return container.contains(node)
  if (container.compareDocumentPosition)
    return container === node || (container.compareDocumentPosition(node) === 16)
}
