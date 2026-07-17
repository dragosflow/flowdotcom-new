/**
 * Remounts on every navigation (unique key from the App Router).
 * Pass-through — enter animation removed (felt laggy stacked on the route veil).
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
