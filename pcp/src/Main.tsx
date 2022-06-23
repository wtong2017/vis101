import {spring} from 'remotion';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import { Background } from './Background';
import { Description } from './Description';
import { HelloWorld } from './HelloWorld';
import { Tutorial } from './Tutorial';

export const Main: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	// Fade out the animation at the end
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 15],
		[1, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
			<AbsoluteFill style={{opacity}}>
				<Sequence from={0} durationInFrames={150}>
					<HelloWorld titleText={titleText} titleColor={titleColor} />
				</Sequence>

                <Sequence from={150} durationInFrames={300}>
					<Background />
				</Sequence>

                <Sequence from={450} durationInFrames={300}>
					<Description />
				</Sequence>

                <Sequence from={750} durationInFrames={300}>
					<Tutorial />
				</Sequence>


                {/* <Sequence from={270} durationInFrames={120}>
					<HelloWorld titleText={titleText} titleColor={titleColor} />
				</Sequence> */}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
