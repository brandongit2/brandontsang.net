export type QABlock = {
	question: string
	answer: string
	furtherQuestions?: QABlock[]
}

export const QADescription: QABlock = {
	question: `What is SprintZero?`,
	answer: `SprintZero is a project management app I was contracted as an engineer to build late last year.`,
	furtherQuestions: [
		{
			question: `Tell me more about the product.`,
			answer: `The key feature of the project was a unique tool known as the Story Map. The Story Map organized all user stories of the project into groups called "features", and those into groups called "epics". The result was a three-tier tree structure, as you can see in the gallery to the left. Users were able to freely rearrange the tree, changing the order of stories, features, and epics, as well as moving them up and down between different tiers. Moreover, updates to the tree would propagate in real-time to other team members. The idea was to enable the team to rapidly adjust to changing product needs, embracing the dynamic and agile management of tickets.`,
			furtherQuestions: [
				{
					question: `How did you implement that?`,
					answer: `Implementing the Story Map required significant knowledge of DOM measurement and manipulation. To move items around the tree meant I had to handle the drag-and-drop all while the DOM element itself was constantly being destroyed and recreated by React. Thankfully, there's a library called Framer Motion which does a lot of the heavy lifting when moving React components around the DOM. I was able to use it to create a seamless drag-and-drop experience.`,
					furtherQuestions: [
						{
							question: `Wow, that sounds complicated. How did you store the state of the tree?`,
							answer: `Managing the state of the tree was a big challenge. After a lot of trial-and-error, I settled on having a flat data structure, where every item simply keeps a record of its parent. This technique, which I later learned is called "normalization", was remarkably simple to traverse and manipulate. When combined with a big list of utility functions for operating on the tree, it became practically impossible to corrupt the story map's structure.`,
						},
						{
							question: `You said changes would update in real-time? How did you do that?`,
							answer: `The real-time updates were possible using the Firebase's Firestore database. Firestore is a NoSQL database that's well-known for its real-time capabilities, meaning it can push updates to all users of a document instantly, resolving conflicts, and even handling offline changes. I did still have to manage conflicts from reconciling Firestore's state with the user's local state, but my big utility function list made that a breeze. We used Firestore's real-time updates to enable collaborative editing throughout almost the entire app. It's one of my favourite things about SprintZero.`,
						},
					],
				},
				{
					question: `What technologies did you use?`,
					answer: `To build SprintZero, I used TypeScript, React, Next.js, Firestore, and Framer Motion.`,
				},
			],
		},
		{
			question: `Who did you work with on the project?`,
			answer: `My involvement with the project began when the founder, whom I knew from a previous company I had worked at, contacted me one day to see if I could help build out the story map feature. I ended up working very closely with him; he played the role of product designer, and I was the primary engineer on the project. Besides the founder, he had a co-founder who was also a senior developer. However his background was mainly in Java/enterprise, so his contribution was primarily technical/backend guidance. There was also a junior developer, but worked part-time and his contribution was largely tangential to mine. I did collaborate with both on several occasions, but a bulk of the project was engineered by me.`,
		},
	],
}
