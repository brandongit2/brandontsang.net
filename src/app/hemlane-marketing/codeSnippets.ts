export const columnAnimHtml =
	// prettier-ignore
	`<div id="page">
	<div id="column-1"></div>
	<div id="column-2"></div>
	<div id="column-3"></div>
</div>`

export const columnAnimCss =
	// prettier-ignore
	`#page {
	display: flex;
	flex-direction: row;

	& > div {
		flex-basis: 0px;
		flex-shrink: 1;
		transition: flex-grow 500ms ease-in-out;
	}
}

#column-1 {
	flex-grow: 2;
	&.rightPanelOpen { flex-grow: 0; }
}

#column-2 {
	flex-grow: 1;
	&.rightPanelOpen { flex-grow: 2; }
}

#column-3 {
	flex-grow: 0;
	&.rightPanelOpen { flex-grow: 3; }
}`
