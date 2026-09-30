import { profile } from '../../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-text-subtle">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-subtle hover:text-text transition-colors duration-200"
              aria-label="GitHub profile (opens in a new tab)"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-subtle hover:text-text transition-colors duration-200"
              aria-label="LinkedIn profile (opens in a new tab)"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={profile.viber}
              className="text-text-subtle hover:text-text transition-colors duration-200"
              aria-label={`Chat on Viber: ${profile.viberDisplay}`}
            >
              Viber
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
