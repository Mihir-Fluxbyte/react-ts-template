import { RootStates, useAppSelector } from "../store/hook";

function useCombineSelector(mainSliceName: RootStates, subSliceName: RootStates, mappingOn: string) {
  const data = useAppSelector((state) => {
    const mainState = state[mainSliceName];
    const subState = state[subSliceName];
    return Object.entries(mainState.entities).map(([mainSliceId, value]) => {
      return {
        ...value,
        [subSliceName]: {
          ...Object.values(subState.entities).filter((x) => x[mappingOn] == mainSliceId).reduce((o, v)=>{
            o[v.id] = v              
            return o
          }, {}),
        },
      };
    });
  });
  return data;
}

export default useCombineSelector;
