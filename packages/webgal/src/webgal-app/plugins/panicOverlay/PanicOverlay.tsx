import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

import { PanicYoozle } from './PanicYoozle/PanicYoozle';

import styles from './panicOverlay.module.scss';

export const PanicOverlay = () => {
  const GUIStore = useSelector((state: RootState) => state.GUI);
  const [showOverlay, setShowOverlay] = useState(false);
  const globalVars = useSelector((state: RootState) => state.userData.globalGameVar);
  const panic = globalVars['Show_panic'];
  const hidePanic = panic === false;
  useEffect(() => {
    const isShowOverlay = (GUIStore.showPanicOverlay && !hidePanic) || false;
    setShowOverlay(isShowOverlay);
  }, [GUIStore.showPanicOverlay, hidePanic]);
  return <div className={showOverlay ? styles.panic_overlay_main : ''}>{showOverlay && <PanicYoozle />}</div>;
};
