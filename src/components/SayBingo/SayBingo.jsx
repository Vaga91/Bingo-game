import { useEffect } from 'react';

import cx from 'classnames';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import styles from './say-bingo.module.scss';

export const SayBingo = ({ winningCallback }) => {
    const handleCommandBingo = () => {
        SpeechRecognition.stopListening();
        winningCallback();
    };

    const commands = [{
        command: 'bingo',
        callback: handleCommandBingo,
    }];

    const {
        transcript,
        listening,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        winningCallback();
    }

    useEffect(() => {
        SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
    }, []);

    return (
        <>
            <div className={cx(styles.content, listening && styles.visible)}>
                Say 'BINGO'
                <div className={styles.animation} />
            </div>
            <p className={styles.transcript}>{transcript}</p>
        </>
    );
};
