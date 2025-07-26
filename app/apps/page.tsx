import { AppCardType, AppCardMenu } from "@/components/app-card"

const apps: AppCardType[] = [
	{
		title: "Overlord-Character-Sheet-Generator",
		img: "/overlord/card-bg.png",
		url: "/overlord/sheet-generator",
		width: 256,
		height: 256,
	},
	{
		title: "Overlord-Character-Sheet-Generator2",
		img: "/overlord/card-bg.png",
		url: "/overlord/sheet-generator",
		width: 256,
		height: 256,
	},
	{
		title: "Overlord-Character-Sheet-Generator3",
		img: "/overlord/card-bg.png",
		url: "/overlord/sheet-generator",
		width: 256,
		height: 256,
	},
	{
		title: "Overlord-Character-Sheet-Generator4",
		img: "/overlord/card-bg.png",
		url: "/overlord/sheet-generator",
		width: 256,
		height: 256,
	},
	{
		title: "Overlord-Character-Sheet-Generator5",
		img: "/overlord/card-bg.png",
		url: "/overlord/sheet-generator",
		width: 256,
		height: 256,
	},
]

export default function Dashboard() {
	return (
		<div>
			<AppCardMenu apps={apps} />
		</div>
	)
}
