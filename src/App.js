import React, { useCallback, useMemo, useState } from 'react';
import { observer } from 'mobx-react';
import { root } from './Stores';

export default observer(() => {
  const [treeId, setTreeId] = useState('oak');

  const tree = useMemo(() => root.trees.get(treeId), [treeId]);

  const handleDestroy = useCallback(() => {
    root.destroyBravo();
  }, []);

  const handleClone = useCallback(() => {
    if (treeId !== 'maple') {
      root.cloneOak();
      setTreeId('maple');
    }
  }, [treeId, setTreeId]);

  const handleSwitch = useCallback(() => {
    if (treeId === 'maple') {
      setTreeId('oak');
    } else {
      setTreeId('maple');
    }
  }, [treeId, setTreeId]);

  return (
    <div style={{ padding: '3em' }}>
      <button onClick={handleDestroy}>Destroy Bravo</button>
      <button onClick={handleClone}>Clone Tree</button>
      <button onClick={handleSwitch}>Switch Tree</button>
      <hr />
      {tree ? (
        <>
          <p>{tree.id}</p>
          <pre>APPLES: {tree.apples.map(({ name }) => name).join(', ')}</pre>
        </>
      ) : (
        <p>tree doesn't exist</p>
      )}
    </div>
  );
});
