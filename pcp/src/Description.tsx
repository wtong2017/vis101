import { Img, spring } from 'remotion';
import { Gif } from "@remotion/gif";
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import PCP from './PCP/PCP';

export const Description: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    const title: React.CSSProperties = {
        // fontFamily: FONT_FAMILY,
        fontSize: 100,
        textAlign: 'center',
        position: 'absolute',
        bottom: 160,
        width: '100%',
    };

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
        <AbsoluteFill style={{ backgroundColor: 'white' }}>
            <AbsoluteFill style={{ opacity, ...title }}>
                <div>Parallel coordinates plot, aka PCP,</div>
                <div>is here to <b>reveal patterns</b> from <i>many (more than 2) columns</i>.</div>

                    <Sequence from={120}>
                <div style={{height: 680, width: "100%", position: "absolute", bottom: 20}}>
                        <PCP />
                </div>
                    </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
