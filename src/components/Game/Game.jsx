import {
  useState, useMemo, useCallback, useEffect, useRef,
} from 'react';

import cx from 'classnames';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import {
  phrasesList, centerCell, shuffleArray, checkWin, insertElementToMiddleOfArray, tableDataValidation,
} from 'utils';

import { Card } from '../Card/Card';
import { SayBingo } from '../SayBingo/SayBingo';

import styles from './game.module.scss';

const dimension = 5;

export const Game = () => {
  const { width, height } = useWindowSize();

  const [checked, setChecked] = useState([phrasesList.length / 2]);
  const [sayBingo, setSayBingo] = useState(false);
  const [winning, setWinning] = useState(false);

  const bingoRef = useRef(null);

  const data = useMemo(() => {
    tableDataValidation(phrasesList.length, dimension);

    const shuffledArray = shuffleArray(phrasesList);
    const withMiddleFree = insertElementToMiddleOfArray(shuffledArray, centerCell, phrasesList.length);

    return withMiddleFree.map((el, index) => ({ id: index, title: el }));
  }, []);

  const handleCardClick = useCallback((id) => {
    const checkedCards = checked.includes(id) ? checked.filter((el) => el !== id) : [...checked, id];
    setChecked(checkedCards);

    if (checkedCards.length >= dimension) {
      handleCheckWin(checkedCards);
    }
  }, [checked]);

  const handleCheckWin = (checkedArr) => {
    if (checkWin(checkedArr, dimension)) {
      setSayBingo(true);
    }
  };

  const handleSayBingo = useCallback(() => {
    setWinning(true);
  }, []);

  useEffect(() => {
    bingoRef?.current?.style.setProperty(
      '--dimension',
      dimension,
    );
  }, []);

  return (
    <div className={styles.container}>
      <h2>Say BINGO to win</h2>
      {winning && <span className={styles.winningTime}>{`Winning time: ${new Date().toLocaleTimeString()}`}</span>}
      <div ref={bingoRef} className={cx(styles.wrapper, (winning || sayBingo) && styles.win)}>
        {data.map((el) => <Card key={el.id} data={el} isChecked={checked.includes(el.id)} onCardSelect={handleCardClick} />)}
      </div>
      {sayBingo && !winning && <SayBingo winningCallback={handleSayBingo} />}
      {winning
        && (
          <>
            <Confetti height={height} width={width} />
            <div className={styles.winningMessage}><h1>You Won!</h1></div>
          </>
        )}
    </div>
  );
};
