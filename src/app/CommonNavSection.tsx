import NavLink from "./NavLink"

export default function CommonNavSection() {
	return (
		<div className="mx-auto w-full max-w-4xl">
			<div className="relative grid grid-cols-[2fr_max-content_2fr_max-content_2fr_max-content_2fr] full:grid-cols-[1fr_max-content_2fr_max-content_2fr_max-content_1fr]">
				<div className="absolute right-[-50vw] top-1/2 h-px w-[200vw] -translate-y-1/2 border-2 border-dashed border-text opacity-40 full:right-4" />
				<div className="absolute right-0 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded bg-text opacity-40 full:block" />

				<div />
				<NavLink href="/">main page</NavLink>
				<div />
				<NavLink href="/sprintzero" subtext="PROJECT">
					sprintzero
				</NavLink>
				<div />
				<NavLink href="/" subtext="PROJECT">
					hemlane marketing site
				</NavLink>
				<div />
			</div>
		</div>
	)
}
