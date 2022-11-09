import { Composition } from 'remotion';
import { Description } from './Description';
import { Openning } from './Openning';
import { Logo } from './HelloWorld/Logo';
import { Main } from './Main';
import PCP from './PCP/PCP';
import { Tutorial } from './Tutorial';

// Each <Composition> is an entry in the sidebar!

export const RemotionVideo: React.FC = () => {
	let seconds = 101;
	let fps = 30;
	return (
		<>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.tsx <id> out/video.mp4
				id="Main"
				component={Main}
				durationInFrames={seconds * fps}
				fps={fps}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				defaultProps={{
					titleText: 'Welcome to VIS 101',
					titleColor: 'black',
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="Openning"
				component={Openning}
				durationInFrames={150}
				fps={fps}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to VIS 101',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Description"
				component={Description}
				durationInFrames={300}
				fps={fps}
				width={1920}
				height={1080}
			/>
			<Composition
				id="PCP"
				component={PCP}
				durationInFrames={150}
				fps={fps}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Tutorial"
				component={Tutorial}
				durationInFrames={300}
				fps={fps}
				width={1920}
				height={1080}
			/>
		</>
	);
};
