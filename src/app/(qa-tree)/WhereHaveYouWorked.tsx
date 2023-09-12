import Image from "next/image"
import Link from "next/link"

import Bg from "@/components/QaTree/Bg"
import NoBr from "@/components/QaTree/NoBr"
import hemlaneLogo from "@public/logos/hemlane.png"
import mintbeanLogo from "@public/logos/mintbean.png"
import sprintZeroLogo from "@public/logos/sprintzero.png"

export default function WhereHaveYouWorked() {
	return (
		<>
			<p>
				My first web development job was at{` `}
				<NoBr>
					<Image src={mintbeanLogo} alt="" className="mr-1 inline-block aspect-square h-[1em] w-auto align-[-2px]" />
					<span className="font-semibold">Mintbean</span>
				</NoBr>
				, which was part <Bg>consulting</Bg> company, part
				{` `}
				<Bg>developer-mentoring</Bg> company. My React familiarity paid off there as I was part of the company&apos;s
				Discord server where I answered tons of questions from entry-level developers, and I helped organize community
				coding events. In fact, I got the job in the first place participating in one of these events, where the founder
				noticed my work and reached out to me. He has since served as a helpful mentor and a friend.
			</p>
			<p>
				I then worked at{` `}
				<NoBr>
					<span className="mr-1 inline-block rounded bg-white/90 p-px align-[-3px]">
						<Image src={hemlaneLogo} alt="" className="aspect-square h-[1em] w-auto" />
					</span>
					<span className="font-semibold">Hemlane</span>
				</NoBr>
				, a <Bg>property management SaaS</Bg> company. There, I worked as part of the marketing team as opposed to the
				primary development team. I gave the very small marketing team representation in the site they hadn&apos;t had
				before, and I contributed some of my design experience as well. In addition to these, I helped integrate the
				company&apos;s existing marketing site with{` `}
				<a href="https://www.builder.io/" target="_blank" rel="noreferrer" className="underline">
					Builder.io
				</a>
				, and I began work on a marketing platform to reduce dependence on Zapier and CMSes. It was built on top of the
				extensive data the company had collected since its existence, and would be a major upgrade in the marketing
				workflow, which was up to then very bootstrapped. I had some great experiences at this company, and they have a
				great culture, but it was my first &ldquo;corporate&rdquo; experience. From then on I learned that I wasn&apos;t
				the corporate type; I much prefer to work at smaller, indie-feeling companies.
			</p>
			<p>
				My most recent work experience was at{` `}
				<NoBr>
					<Image
						src={sprintZeroLogo}
						alt=""
						className="mr-1 inline-block h-auto w-[1.1em] translate-y-0.5 align-baseline"
						style={{filter: `drop-shadow(rgb(0 0 0 / 0.4) 0px 0px 4px)`}}
					/>
					<span className="font-semibold">SprintZero</span>
				</NoBr>
				, which you can learn all about from my retrospective on the project.{` `}
				<Link
					href="/sprintzero"
					className="align-center mx-1 my-0.5 inline-block rounded-full bg-text px-4 py-1 indent-0 align-[1px] text-xs font-semibold tracking-wider text-black"
					style={{
						backgroundImage: `linear-gradient(2deg, #1e2e00e6, #0d21007a 40%, #00000021 90%, #ffffff61)`,
						boxShadow: `inset -3px -2px 9px rgb(255 255 255 / 0.3), -4px 2px 14px rgb(0 0 0 / 0.3)`,
						textShadow: `oklch(0.99 0.1 114 / 0.3) -1px 1px 1px`,
					}}
				>
					See here →
				</Link>
			</p>
		</>
	)
}
