import { Img, spring } from 'remotion';
import { Gif } from "@remotion/gif";
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { COLOR_1, FONT_FAMILY } from './HelloWorld/constants';
import { Logo } from './HelloWorld/Logo';
import { Subtitle } from './HelloWorld/Subtitle';
import { Title } from './HelloWorld/Title';
import { PCP } from './PCP/PCP';
import excel from './excel.png'
import { useEffect, useState } from 'react';
import { Transition } from './Transition';

export const Background: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();
    const titles = ["Have you ever deal with high-dimentional data in Excel?", "Can you find any pattern in this HUGH amount of numbers?"]
    let [titleIndex, setTitleIndex] = useState(0);

    const title: React.CSSProperties = {
        fontFamily: FONT_FAMILY,
        fontSize: 100,
        textAlign: 'center',
        position: 'absolute',
        bottom: 160,
        width: '100%',
    };

    useEffect(() => {
        if (frame > fps * 5) {
            setTitleIndex(1);
        } else {
            setTitleIndex(0);
        }
    })

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
                <div>{titles[titleIndex]}</div>

                <Sequence from={fps}>
                    <Transition type='in'>
                        <Img src={excel} style={{ height: 800, bottom: 40, left: 300, position: "absolute" }} />
                    </Transition>
                </Sequence>

                <Sequence from={fps * 5}>
                    <Gif
                        src="https://media.giphy.com/media/3o72F7YT6s0EMFI0Za/giphy.gif"
                        fit="fill"
                        style={{ height: 600, bottom: 40, right: 40, position: "absolute" }}
                    />
                </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
