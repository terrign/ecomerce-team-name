interface IsUniqueFunction<T> {
  (arr: Array<T>, item: T): boolean;
}

const isUniqueItem: IsUniqueFunction<unknown> = (arr, item) => {
  return arr.indexOf(item) === arr.lastIndexOf(item);
};

export default isUniqueItem;
