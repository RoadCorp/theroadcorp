import { RoadcorpMark } from "@/components/roadcorp-mark";

const CONTACT_EMAIL = "contact@theroadcorp.com";

export function Footer() {
  return (
    <footer className="site-footer">
      <RoadcorpMark className="site-footer-mark" />
      <p>© {new Date().getFullYear()} RoadCorp</p>
      <a className="site-footer-contact" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL}
      </a>
    </footer>
  );
}
