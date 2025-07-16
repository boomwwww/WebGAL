import { useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import styles from './panicOverlay.module.scss';
import { PanicYoozle } from './PanicYoozle/PanicYoozle';

export const PanicOverlay = () => {
  const GUIStore = useSelector((state: RootState) => state.GUI);
  const [showOverlay, setShowOverlay] = useState(false);
  const globalVars = useSelector((state: RootState) => state.userData.globalGameVar);
  const panic = globalVars['Show_panic'];
  const hidePanic = panic === false;
  useEffect(() => {
    const isShowOverlay = GUIStore.showPanicOverlay && !hidePanic;
    setShowOverlay(isShowOverlay);
  }, [GUIStore.showPanicOverlay, hidePanic]);
  // return ReactDOM.createPortal(
  //   <div className={showOverlay ? styles.panic_overlay_main : ''}>{showOverlay && <PanicYoozle />}</div>,
  //   document.querySelector('div#panic-overlay')!,
  // );
  return <div className={showOverlay ? styles.panic_overlay_main : ''}>{showOverlay && <PanicYoozle />}</div>;
};
