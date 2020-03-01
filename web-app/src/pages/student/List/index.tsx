import React from 'react'; // import { router } from 'umi';

import StudentTable from './Table';
import styles from './style.less';

function List() {
  return (
    <div className={styles.list}>
      <StudentTable />
    </div>
  );
}

export default List;
