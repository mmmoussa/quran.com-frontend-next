import { useSelector } from 'react-redux';

import PlayPauseButton from './Buttons/PlayPauseButton';
import OverflowAudioPlayerActionsMenu from './OverflowAudioPlayerActionsMenu';
import styles from './PlaybackControls.module.scss';
import RepeatAudioButton from './RepeatButton';
import SeekButton, { SeekButtonType } from './SeekButton';

import { selectAudioDataStatus } from 'src/redux/slices/AudioPlayer/state';
import AudioDataStatus from 'src/redux/types/AudioDataStatus';

type PlaybackControlsProps = {
  isInRadioMode: boolean;
};
const PlaybackControls = ({ isInRadioMode }: PlaybackControlsProps) => {
  const audioDataStatus = useSelector(selectAudioDataStatus);
  const isLoading = audioDataStatus === AudioDataStatus.Loading;

  return (
    <div className={styles.container}>
      {!isInRadioMode && (
        <>
          <div className={styles.actionItem}>
            <RepeatAudioButton />
          </div>
          <div className={styles.actionItem}>
            <SeekButton type={SeekButtonType.PrevAyah} isLoading={isLoading} />
          </div>
        </>
      )}
      <div className={styles.actionItem}>
        <PlayPauseButton />
      </div>

      {!isInRadioMode && (
        <>
          <div className={styles.actionItem}>
            <SeekButton type={SeekButtonType.NextAyah} isLoading={isLoading} />
          </div>
          <div className={styles.actionItem}>
            <OverflowAudioPlayerActionsMenu />
          </div>
        </>
      )}
    </div>
  );
};

export default PlaybackControls;
