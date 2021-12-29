import React from 'react';

import useTranslation from 'next-translate/useTranslation';

import InfoIcon from '../../../../public/icons/info.svg';

import styles from './ChapterHeader.module.scss';

import ChapterIconContainer, {
  ChapterIconsSize,
} from 'src/components/chapters/ChapterIcon/ChapterIconContainer';
import Bismillah, { BismillahSize } from 'src/components/dls/Bismillah/Bismillah';
import Button, { ButtonSize, ButtonVariant } from 'src/components/dls/Button/Button';
import PlayChapterAudioButton from 'src/components/QuranReader/PlayChapterAudioButton';
import { getChapterData } from 'src/utils/chapter';
import { logButtonClick } from 'src/utils/eventLogger';
import { shouldUseMinimalLayout, toLocalizedNumber } from 'src/utils/locale';
import { getSurahInfoNavigationUrl } from 'src/utils/navigation';

interface Props {
  chapterId: string;
}

const CHAPTERS_WITHOUT_BISMILLAH = ['1', '9'];

const ChapterHeader: React.FC<Props> = ({ chapterId }) => {
  const { t, lang } = useTranslation('common');
  const isMinimalLayout = shouldUseMinimalLayout(lang);

  const chapterData = getChapterData(chapterId, lang);

  const { translatedName } = chapterData;
  const { transliteratedName } = chapterData;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.left}>
          {!isMinimalLayout && <div className={styles.translatedName}>{translatedName}</div>}
          <div className={styles.transliteratedName}>
            {t('surah')} <br /> {transliteratedName}
          </div>
          <div className={styles.infoContainer}>
            <Button
              size={ButtonSize.Small}
              variant={ButtonVariant.Ghost}
              prefix={<InfoIcon />}
              href={getSurahInfoNavigationUrl(chapterId)}
              hasSidePadding={false}
              onClick={() => {
                logButtonClick('chapter_header_info');
              }}
            >
              {t('quran-reader:surah-info')}
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.chapterId}>{toLocalizedNumber(Number(chapterId), lang, true)}</div>
          <div className={styles.arabicSurahNameContainer}>
            <ChapterIconContainer
              chapterId={chapterId}
              size={ChapterIconsSize.Large}
              hasSurahPrefix={false}
            />
          </div>
          <div className={styles.actionContainer}>
            <PlayChapterAudioButton chapterId={Number(chapterId)} />
          </div>
        </div>
      </div>
      <div className={styles.bismillahContainer}>
        {!CHAPTERS_WITHOUT_BISMILLAH.includes(chapterId) && (
          <Bismillah size={BismillahSize.Large} />
        )}
      </div>
    </div>
  );
};

export default ChapterHeader;
