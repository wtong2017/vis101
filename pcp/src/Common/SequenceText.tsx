import { spring } from 'remotion';
import {
    AbsoluteFill,
    interpolate,
    Sequence,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import { FONT_FAMILY } from '../HelloWorld/constants';

type SequenceTextDef = {
    text: string,
    duration: number
}

const title: React.CSSProperties = {
    fontFamily: FONT_FAMILY,
    // fontWeight: 'bold',
    fontSize: 100,
    textAlign: 'center',
    position: 'absolute',
    bottom: 160,
    width: '100%',
};

function extractTime(texts: SequenceTextDef[]) {
    let froms: number[] = []
    return texts.map((text, i) => {
        let newDef: SequenceTextDef & { from: number } = { ...text, from: 0 }
        newDef.from = i == 0 ? 0 : texts[i - 1].duration + froms[i - 1];
        froms.push(newDef.from)
        return newDef
    })
}

export default function SequenceText(props: { texts: SequenceTextDef[] }) {
    const frame = useCurrentFrame();
    const { durationInFrames, fps } = useVideoConfig();
    let curr = 0;

    // A <AbsoluteFill> is just a absolutely positioned <div>!
    return (
        <AbsoluteFill>
            {
                extractTime(props.texts).map((text, i, texts) => (
                    <Sequence from={text.from} durationInFrames={text.duration}>
                        <div style={{ ...title }}>{text.text}</div>
                    </Sequence>
                ))
            }
        </AbsoluteFill >
    );
};
