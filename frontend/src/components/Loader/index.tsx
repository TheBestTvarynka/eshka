import React from 'react';
import styles from './styles.module.sass';

export interface ILoaderProps {
  isLoading: boolean;
  component: any;
  color?: string;
}

// const Loader: React.FC<ILoaderProps> = ({ isLoading, component: Component }) => {
//   return (
//     <div className={styles.loader_wrapper}>
//       {isLoading
//       ? <div className={styles.loader} />
//       : <Component />}
//     </div>
//   );
// };

const Loader = () => {
  return (
    <div className={styles.loader_wrapper}>
      <div className={styles.loader} />
    </div>
  );
};

export default Loader;