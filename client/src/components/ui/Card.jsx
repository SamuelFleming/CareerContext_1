// client/src/components/ui/Card.jsx
export default function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}