"use client"

import {Anton} from "@next/font/google"
import {OrthographicCamera} from "@react-three/drei"
import clsx from "clsx"

import type {NextPage} from "next"

import StaticName from "./StaticName"
import {Canvas} from "~/components/clientWrapped/reactThreeFiber"

// eslint-disable-next-line @typescript-eslint/quotes
const anton = Anton({weight: "400"})

const Index: NextPage = () => {
	return (
		<div className="h-full border-8 border-white grid grid-rows-[1fr_auto]">
			<div className="grid grid-cols-[2fr_1fr]">
				<div className="relative">
					<div className="absolute inset-0">
						<Canvas id="name-canvas">
							<OrthographicCamera
								makeDefault
								zoom={1}
								left={-1}
								right={1}
								top={1}
								bottom={-1}
								near={0}
								far={10}
								position={[0, 0, 5]}
							/>
							<StaticName />
						</Canvas>
					</div>
					<div className="absolute inset-0 grid items-center text-transparent">
						<p className={clsx(anton.className, `text-[12rem] font-bold text-right leading-none`)}>BRANDON TSANG</p>
					</div>
				</div>
				<div>
					<p>GitHub</p>
					<p>Twitter</p>
					<p>LinkedIn</p>
				</div>
			</div>

			<div className="m-16 flex gap-16">
				<p>1</p>
				<p>2</p>
				<p>3</p>
			</div>
		</div>
	)
}

export default Index
