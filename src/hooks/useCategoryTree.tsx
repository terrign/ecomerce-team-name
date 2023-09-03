import { useAppSelector } from '../store/hooks';

interface CategoryTreeItem {
  id: string;
  name: string;
  children: CategoryTreeItem[];
  parent: CategoryTreeItem | null;
}

const useCategoryTree = () => {
  const categories = useAppSelector((state) => state.categories.items);

  const treeRoot: CategoryTreeItem[] = categories
    .filter((a) => a.ancestors.length === 0)
    .map((a) => ({ id: a.id, name: a.name.en, children: [], parent: null }));

  categories
    .filter((a) => a.ancestors.length !== 0)
    .forEach((child) => {
      const parentId = child.ancestors[0].id;
      treeRoot
        .find((a) => a.id === parentId)
        .children.push({
          id: child.id,
          name: child.name.en,
          parent: treeRoot.find((a) => a.id === parentId),
          children: null,
        });
    });

  return treeRoot;
};

export default useCategoryTree;
