import { applySnapshot, destroy, getSnapshot, types } from 'mobx-state-tree';

const AppleModel = types.model({
  id: types.identifier,
  name: '',
});

const TreeModel = types.model({
  id: types.identifier,
  apples: types.array(types.safeReference(AppleModel)),
});

const RootModel = types
  .model({
    apples: types.map(AppleModel),
    trees: types.map(TreeModel),
  })
  .actions((self) => ({
    destroyBravo() {
      if (self.apples.has('bravo')) {
        destroy(self.apples.get('bravo'));
      }
    },

    cloneOak() {
      const cloneNode = TreeModel.create({ id: 'maple' });
      self.trees.set(cloneNode.id, cloneNode);

      const clone = getSnapshot(self.trees.get('oak'));
      const reidentify = { ...clone, id: cloneNode.id };
      applySnapshot(cloneNode, reidentify);
    },
  }));

export const root = RootModel.create({
  apples: {
    alpha: { id: 'alpha', name: 'a' },
    bravo: { id: 'bravo', name: 'b' },
    charlie: { id: 'charlie', name: 'c' },
  },
  trees: {
    oak: {
      id: 'oak',
      apples: ['alpha', 'bravo', 'charlie'],
    },
  },
});

