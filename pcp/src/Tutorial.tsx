import {
    AbsoluteFill,
    interpolate,
    interpolateColors,
    Sequence,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { COLOR_1, FONT_FAMILY } from './HelloWorld/constants';

import BasicTable, { Column } from './Common/BasicTable';
import { useEffect } from 'react';
import SequenceText from './Common/SequenceText';
import PCP from './PCP/PCP';

const columns: Column[] = [
    { field: 'x', headerName: 'x', width: 70 },
    { field: 'twox', headerName: '2x', width: 130 },
    { field: 'xsq', headerName: 'x^2', width: 130 },
    {
        field: 'nx',
        headerName: '-x',
        width: 90,
    },
    {
        field: 'halfx',
        headerName: 'x/2',
        width: 160
    },
];

const columns2 = columns.map(col => {
    let newCol = { ...col }
    switch (newCol.field) {
        case "x":
            newCol.headerName = "Age";
            break;
        case "twox":
            newCol.headerName = "Weight";
            break;
        case "xsq":
            newCol.headerName = "Height";
            break;
        case "nx":
            newCol.headerName = "IQ";
            break;
        case "halfx":
            newCol.headerName = "Width";
            break;
        default:
            break;
    }
    return newCol
})

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(createTutorialData)

function createTutorialData(index: number) {
    return {
        x: index,
        twox: 2 * index,
        xsq: index ** 2,
        nx: -index,
        halfx: index / 2
    }
}

export const Tutorial: React.FC = () => {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();

    const title: React.CSSProperties = {
        fontFamily: FONT_FAMILY,
        fontSize: 100,
        textAlign: 'center',
        position: 'absolute',
        bottom: 160,
        width: '100%',
    };

    // Animate from 0 to 1 after some frames
    const logoTranslationProgress = spring({
        frame: frame - 30 * fps,
        fps,
        config: {
            damping: 100,
        },
    });

    // Move the logo up by 150 pixels once the transition starts
    const logoTranslation = interpolate(
        logoTranslationProgress,
        [0, 1],
        [0, 500]
    );

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
            <AbsoluteFill style={{ opacity }}>
                <Sequence from={0} durationInFrames={fps * 5}>
                    <div style={{ ...title }}>Let's see how it works.</div>
                </Sequence>

                <Sequence from={fps * 5} durationInFrames={fps * 10}>
                    <SequenceText texts={[{
                        text: "Consider we have some data columns, can you observe the relationship between different data columns?",
                        duration: 5 * fps
                    }, {
                        text: "Easy, right? Their relationship can be revealed by their header title.",
                        duration: 3 * fps
                    }, {
                        text: "How about this?",
                        duration: 2 * fps
                    }]}></SequenceText>
                    <AbsoluteFill>
                        <BasicTable
                            rows={rows}
                            columns={frame > 13 * fps ? columns2 : columns}
                        />
                    </AbsoluteFill>
                </Sequence>

                <Sequence from={fps * 15}>
                    <SequenceText texts={[{
                        text: "Let's see how PCP help us here.",
                        duration: 3 * fps
                    }, {
                        text: "First, we create an axis for each of the data column.",
                        duration: 4 * fps
                    }, {
                        text: "For each axis, we have the position of the column value on the axis.",
                        duration: 5 * fps
                    }]}></SequenceText>
                    <AbsoluteFill>
                        <BasicTable
                            rows={rows}
                            columns={columns2}
                            animateColumn={frame > 17 * fps ? true : false}
                        />
                        <Sequence from={1 * fps}>
                            <AbsoluteFill style={{ alignItems: "center" }}>
                                <div style={{ position: "absolute", top: 70, height: 500, transform: `translateY(${logoTranslation}px)` }}>
                                    <PCP fileName="tutorial.csv" />
                                </div>
                            </AbsoluteFill>
                        </Sequence>
                    </AbsoluteFill>
                </Sequence>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};
