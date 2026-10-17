import { RoadcorpMark } from "@/components/roadcorp-mark";

export function Footer() {
  return (
    <footer className="site-footer">
      <RoadcorpMark className="site-footer-mark" />
      <p>© {new Date().getFullYear()} RoadCorp</p>
    </footer>
  );
}
