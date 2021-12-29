import React, { useRef } from 'react';

import { useDispatch } from 'react-redux';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import styles from './TranslationView.module.scss';
import TranslationViewCell from './TranslationViewCell';

import { setLastReadVerse } from 'src/redux/slices/QuranReader/readingTracker';
import QuranReaderStyles from 'src/redux/types/QuranReaderStyles';
import Verse from 'types/Verse';

type TranslationViewProps = {
  verses: Verse[];
  quranReaderStyles: QuranReaderStyles;
};

const TranslationView = ({ verses, quranReaderStyles }: TranslationViewProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        overscan={30}
        rangeChanged={(range) => {
          const firstVisibleVerse = verses[range.startIndex];
          dispatch({
            type: setLastReadVerse.type,
            payload: {
              verseKey: firstVisibleVerse.verseKey,
              chapterId: firstVisibleVerse.chapterId,
              page: firstVisibleVerse.pageNumber,
              hizb: firstVisibleVerse.hizbNumber,
            },
          });
        }}
        initialItemCount={10} // needed for SSR
        // atBottomStateChange={() => console.log('reached the bottom')}
        totalCount={verses.length}
        // components={{
        //   ScrollSeekPlaceholder: ({ height, index }) => <>loading...</>,
        // }}
        itemContent={(index) => (
          <TranslationViewCell
            verseIndex={index}
            verse={verses[index]}
            key={verses[index].id}
            quranReaderStyles={quranReaderStyles}
          />
        )}
        // footer={() => <>Hello world</>}
        // scrollSeekConfiguration={{
        //   enter: (velocity) => Math.abs(velocity) > 50,
        //   exit: (velocity) => {
        //     const shouldExit = Math.abs(velocity) < 10;
        //     return shouldExit;
        //   },
        // }}
      />
      {/* {verses.map((verse, index) => (
        <TranslationViewCell
          verseIndex={index}
          verse={verse}
          key={verse.id}
          quranReaderStyles={quranReaderStyles}
        />
      ))} */}
    </div>
  );
};

export default TranslationView;
