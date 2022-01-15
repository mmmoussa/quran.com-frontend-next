/* eslint-disable react/no-multi-comp */
import React, { useRef } from 'react';

import dynamic from 'next/dynamic';
import { ListRange, Virtuoso, VirtuosoHandle } from 'react-virtuoso';

import useScrollToTranslationViewVirtualizedVerse from './hooks/useScrollToVirtualizedVerse';
import styles from './TranslationView.module.scss';
import TranslationViewCell from './TranslationViewCell';
import TranslationViewCellSkeleton from './TranslatioViewCellSkeleton';

import ChapterHeader from 'src/components/chapters/ChapterHeader';
import Spinner from 'src/components/dls/Spinner/Spinner';
import useQcfFont from 'src/hooks/useQcfFont';
import QuranReaderStyles from 'src/redux/types/QuranReaderStyles';
import { VersesResponse } from 'types/ApiResponses';
import { QuranReaderDataType } from 'types/QuranReader';
import Verse from 'types/Verse';

type TranslationViewProps = {
  verses: Verse[];
  quranReaderStyles: QuranReaderStyles;
  quranReaderDataType: QuranReaderDataType;
  initialData: VersesResponse;
  setSize: (size: number | ((_size: number) => number)) => Promise<Verse[]>;
};

const EndOfScrollingControls = dynamic(() => import('../EndOfScrollingControls'), {
  ssr: false,
  loading: () => <Spinner />,
});

const getTotalCount = (
  quranReaderDataType: QuranReaderDataType,
  initialData: VersesResponse,
): number => {
  if (quranReaderDataType === QuranReaderDataType.Verse) {
    return 1;
  }
  return initialData.pagination.totalRecords;
};

const FETCHING_THRESHOLD = 5;
const ITEMS_PER_PAGE = 10;

const TranslationView = ({
  quranReaderStyles,
  quranReaderDataType,
  initialData,
  verses,
  setSize,
}: TranslationViewProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  useQcfFont(quranReaderStyles.quranFont, verses);
  useScrollToTranslationViewVirtualizedVerse(quranReaderDataType, virtuosoRef);

  const onRangeChange = (renderedRange: ListRange) => {
    setSize((prevSize) => {
      if (prevSize * ITEMS_PER_PAGE - renderedRange.endIndex + 1 <= FETCHING_THRESHOLD) {
        const pageNumberOfRange = Math.floor(renderedRange.endIndex / ITEMS_PER_PAGE) + 1;
        return pageNumberOfRange;
      }
      return prevSize;
    });
  };

  const itemContentRenderer = (currentVerseIndex: number) => {
    const currentVerse = verses[currentVerseIndex];
    return currentVerse ? (
      <>
        {currentVerse.verseNumber === 1 && (
          <ChapterHeader
            chapterId={String(currentVerse.chapterId)}
            pageNumber={currentVerse.pageNumber}
            hizbNumber={currentVerse.hizbNumber}
          />
        )}
        <TranslationViewCell
          verseIndex={currentVerseIndex}
          verse={verses[currentVerseIndex]}
          key={verses[currentVerseIndex].id}
          quranReaderStyles={quranReaderStyles}
        />
      </>
    ) : (
      <TranslationViewCellSkeleton />
    );
  };

  return (
    <div className={styles.container}>
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        totalCount={getTotalCount(quranReaderDataType, initialData)}
        overscan={800}
        rangeChanged={onRangeChange}
        initialItemCount={initialData.verses.length} // needed for SSR.
        itemContent={itemContentRenderer}
        components={{
          Footer: () => (
            <EndOfScrollingControls
              quranReaderDataType={quranReaderDataType}
              lastVerse={verses[verses.length - 1]}
            />
          ),
        }}
      />
    </div>
  );
};

export default TranslationView;
