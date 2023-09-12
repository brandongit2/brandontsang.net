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

export const fixedWidthCols =
	// prettier-ignore
	`import {useWindowSize} from "react-use"

export default function ColumnLayout() {
	const {width} = useWindowSize()
	const [rightPanelOpen, setRightPanelOpen] = useState(false)

	return (
		<div id="page>
			<div id="column-1">
				<div style={{width: width * 2 / 3}} />
			</div>
			<div id="column-2">
				<div style={{width: rightPanelOpen ? width * 2 / 5 : width / 3}} />
			</div>
			<div id="column-3">
				<div style={{width: width * 3 / 5}} />
			</div>
		</div>
	)
}`

export const blobsSvg =
	// prettier-ignore
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
	<defs>
		<filter id="goo">
			<feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
			<feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
			<feComposite in="SourceGraphic" in2="goo" operator="atop"/>
		</filter>
	</defs>
	<circle cx="200" cy="200" r="500" fill="red" filter="url(#goo)" />
	<circle cx="800" cy="800" r="500" fill="blue" filter="url(#goo)" />
</svg>`

export const circleSdf =
	// prettier-ignore
	`float dist(vec2 a, vec2 b) {
	float dx = a.x - b.x;
	float dy = a.y - b.y;
	return abs(sqrt(dx * dx + dy * dy));
}`

export const circleGen =
	// prettier-ignore
	`vec2 ballPositions[8];
ballPositions[0] = path(time * 0.17 + 1.43);
ballPositions[1] = path(time * 0.14 + 5.35);
ballPositions[2] = path(time * 0.08 + 3.52);
ballPositions[3] = path(time * 0.15 + 0.05);
ballPositions[4] = path(time * 0.07 + 5.91);
ballPositions[5] = path(time * 0.06 + 6.82);
ballPositions[6] = path(time * 0.1 + 3.65);
ballPositions[7] = path(time * 0.12 + 1.33);
float ballRadii[8];
ballRadii[0] = 0.6;
ballRadii[1] = 0.5;
ballRadii[2] = 0.4;
ballRadii[3] = 0.5;
ballRadii[4] = 0.6;
ballRadii[5] = 0.5;
ballRadii[6] = 0.4;
ballRadii[7] = 0.4;

// Generate the distance function. <0 means inside (shaded), >0 means outside (unshaded)
float dist1 = dist(vertexPos.xy, ballPositions[0]) - ballRadii[0];
float dist2 = dist(vertexPos.xy, ballPositions[1]) - ballRadii[1];
float dist3 = dist(vertexPos.xy, ballPositions[2]) - ballRadii[2];
float dist4 = dist(vertexPos.xy, ballPositions[3]) - ballRadii[3];
float dist5 = dist(vertexPos.xy, ballPositions[4]) - ballRadii[4];
float dist6 = dist(vertexPos.xy, ballPositions[5]) - ballRadii[5];`

export const circleSmin =
	// prettier-ignore
	`// Smooth min() function. Pulled from https://www.iquilezles.org/www/articles/smin/smin.htm
float smin(float a, float b, float k) {
	float h = max(k - abs(a - b), 0.0) / k;
	return min(a, b) - h * h * k * (1.0 / 4.0);
}

void main() {
	// ...circle code

	float smoothingFactor = 0.3;
	// Take the smooth min of everything (GLSL doesn't support variadic functions, so it's nested hell)
	float finalDist = smin(smin(smin(smin(smin(dist1, dist2, smoothingFactor), dist3, smoothingFactor), dist4, smoothingFactor), dist5, smoothingFactor), dist6, smoothingFactor);
}`

export const circleEffects =
	// prettier-ignore
	`// Initial color (HSV format)
vec3 color = vec3(0.11, 0.15, 1.0);

// Darken the edges of the blobs
float falloff = 20.0; // 0 - no gradient; greater means steeper gradient
float intensity = 0.8; // 0 - no darkening; greater means more darkening
vec3 blob = vec3(color.x, color.y * (intensity * pow(2.0, falloff * finalDist) + 1.0), color.z);

float shadowIntensity = 1.8; // 0.0 - Most intense; greater means softer
vec3 shadow = vec3(
	color.x,
	color.y * pow(2.0, -20.0 * finalDist - shadowIntensity), // Exponential to 0.0
	(color.z - 1.0) * pow(2.0, -20.0 * finalDist - shadowIntensity) + 1.0 // Exponential to 1.0
);

// Apply color only to blobs, shadow only outside of blobs
color = finalDist < 0.0 ? blob : shadow;

gl_FragColor = vec4(hsv2rgb(color), 1.0);`
