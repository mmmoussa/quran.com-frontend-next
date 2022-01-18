/* eslint-disable i18next/no-literal-string */
import classNames from 'classnames';

import pageStyle from './index.module.scss';
import radioStyle from './radio.module.scss';

import Footer from 'src/components/dls/Footer/Footer';
import RandomPlaylist from 'src/components/Radio/CurantedStationList';
import ReciterList from 'src/components/Radio/ReciterList';

const Radio = () => {
  return (
    <div className={pageStyle.pageContainer}>
      <div className={pageStyle.flow}>
        <div className={classNames(pageStyle.flowItem, radioStyle.title)}>Listen Now</div>
        <div className={classNames(pageStyle.flowItem, pageStyle.fullWidth)}>
          <RandomPlaylist />
        </div>
        <div className={classNames(pageStyle.flowItem, radioStyle.title)}>All Reciters</div>
        <div className={classNames(pageStyle.flowItem, pageStyle.fullWidth)}>
          <ReciterList />
        </div>
      </div>

      <div className={classNames(pageStyle.flowItem, radioStyle.footerContainer)}>
        <Footer />
      </div>
    </div>
  );
};

export default Radio;
