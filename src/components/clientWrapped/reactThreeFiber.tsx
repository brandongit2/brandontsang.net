// Makes the <Canvas> component a client component.

"use client"

import {Canvas as _Canvas} from "@react-three/fiber"

import type {ComponentProps, ReactElement} from "react"

type Props = ComponentProps<typeof _Canvas>

export const Canvas = (props: Props): ReactElement | null => <_Canvas {...props} />
