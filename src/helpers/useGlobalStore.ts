import {create} from "zustand"

import type {MotionValue} from "framer-motion"

export type GlobalStore = {
	transitionProg: MotionValue<number> | 0
}

export type GlobalStoreActions = {
	setTransitionProg: (transitionProg: MotionValue) => void
}

export const useGlobalStore = create<GlobalStore & GlobalStoreActions>((set) => ({
	transitionProg: 0,

	setTransitionProg: (transitionProg) => set({transitionProg}),
}))
