export const removeItemFromId = <C extends { id: string }>(array: Array<C> = [], idToRemove = '') =>
  array.filter((item) => item.id !== idToRemove);

export const getTagAddOrRemovePayload = (
  oldTagsIds: readonly string[],
  newTagsIds: readonly string[],
) => {
  const tagsIdsToAdd: string[] = [];
  const tagsIdsToRemove: string[] = [];

  // if the new tag isn't in the oldTags we must add it
  newTagsIds.forEach((tagId) => {
    const idIsAlreadyIn = oldTagsIds.includes(tagId);
    if (idIsAlreadyIn) {
      return;
    }
    tagsIdsToAdd.push(tagId);
  });

  // if the old tag isn't in the newTags we must remove it
  oldTagsIds.forEach((tagId) => {
    const idIsAlreadyIn = newTagsIds.includes(tagId);
    if (idIsAlreadyIn) {
      return;
    }
    tagsIdsToRemove.push(tagId);
  });

  return { tagsIdsToAdd, tagsIdsToRemove };
};

export const moveItemInArray = <C>(array: Array<C>, from: number, to: number) => {
  const newArray = [...array];
  // remove `from` item and store it
  const f = newArray.splice(from, 1)[0];
  // insert stored item into position `to`
  newArray.splice(to, 0, f);

  return newArray;
};

export const replaceItemFromId = <C extends { id: string }>(
  array: Array<C>,
  idToReplace: string,
  payload: C,
) => array.map((item) => (item.id === idToReplace ? payload : item));

export const findItemFromId = <C extends { id: string }>(id: string, array: Array<C>) =>
  array.find((item) => item.id === id);
