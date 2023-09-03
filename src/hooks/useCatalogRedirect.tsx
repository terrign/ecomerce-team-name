import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useCategoryTree from './useCategoryTree';

const useCatalogRedirect = () => {
  const { category, subCategory } = useParams();
  const tree = useCategoryTree();
  const nav = useNavigate();
  useEffect(() => {
    if (!category) {
      return;
    }
    const rootCategory = tree.find((a) => a.name.toLowerCase() === category);
    if (!rootCategory) {
      nav('/*');
    } else {
      if (!subCategory) {
        return;
      }
      if (rootCategory.children.some((a) => a.name.toLowerCase() === subCategory)) {
        return;
      }
      nav('/*');
    }
  }, [category, subCategory]);
};

export default useCatalogRedirect;
