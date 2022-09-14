import {
  createContext,
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ILayer } from '@/types/layer';
import { ITrait } from '@/types/trait';
import { useLayer } from '@/hooks/useLayer';
import { useDrawEngine } from '@/hooks/useDrawEngine';
import { useTrait } from '@/hooks/useTrait';
import { UseMutationResult } from 'react-query';
import { useCollectionQuery } from '@/hooks/collection/useCollectionQuery';
import { useGroup } from '@/hooks/useGroup';
import { IGroup } from '@/types/group';
import { useInit } from '@/hooks/util/useInit';

const AssetContext = createContext<{
  selectedGroup?: IGroup;
  setSelectedGroup: Dispatch<SetStateAction<IGroup | undefined>>;
  filteredGroupLayersData: ILayer[];
  drawSize: number;
  drawInnerSize: {
    width: number;
    height: number;
  };
  lastSelectedTrait: ITrait | undefined;
  setLastSelectedTrait: Dispatch<SetStateAction<ITrait | undefined>>;
  collapseMap: {
    [layerId: string]: boolean;
  };
  setCollapseMap: Dispatch<SetStateAction<{ [p: string]: boolean }>>;
  selectedLayerTraitMap: {
    [layerId: string]: ITrait | undefined;
  };
  setSelectedLayerTraitMap: Dispatch<
    SetStateAction<{ [p: string]: ITrait | undefined }>
  >;
  selectedTraits: (ITrait | undefined)[];
  selectTraitToShow: (layerId: string, trait?: ITrait) => void;
  updateTraitProbMutation: UseMutationResult<
    void,
    unknown,
    {
      traitsWeight: { [traitId: string]: number };
      layersWeight: { [layerId: string]: number };
      groupId: string;
    }
  >;
  notAlwaysShowLayer: { [layerId: string]: boolean };
  showLayerWeight: { [layerId: string]: number };
  traitWeight: { [traitId: string]: number };
  traitProb: { [traitId: string]: number };
  saveProb: () => void;
  selectedLayer: ILayer | undefined;
  setSelectedLayer: Dispatch<SetStateAction<ILayer | undefined>>;
} | null>(null);

export const AssetProvider = ({ children }: { children: ReactNode }) => {
  const { layersDataQuery, orderTraitList } = useLayer();
  const { data: layersData } = layersDataQuery;
  const { collectionQuery } = useCollectionQuery();
  const { groupQuery } = useGroup();

  const [selectedGroup, setSelectedGroup] = useState<IGroup | undefined>();
  useInit(
    (startFn) => {
      if (groupQuery.isSuccess) {
        setSelectedGroup(groupQuery.data?.[0]);
        startFn();
      }
    },
    [groupQuery],
  );

  const filteredGroupLayersData = useMemo(() => {
    const data =
      layersData?.filter((layer) => layer.group_id === selectedGroup?.id) ??
      layersData ??
      [];
    return data;
    // only update when layers length change, means internal change will not change filteredGroup
  }, [selectedGroup, layersData]);

  const [selectedLayerTraitMap, setSelectedLayerTraitMap] = useState<{
    [layerId: string]: ITrait | undefined;
  }>({});

  const [drawSize, setDrawSize] = useState(150);
  const drawInnerSize = useMemo(() => {
    const { width, height } = collectionQuery?.data || {
      width: 150,
      height: 150,
    };
    const ratio = width / height;
    return {
      width: ratio > 1 ? drawSize : drawSize * ratio,
      height: ratio > 1 ? drawSize / ratio : drawSize,
    };
  }, [collectionQuery, drawSize]);

  useEffect(() => {
    setDrawSize(Math.min(window?.innerWidth, window?.innerHeight, 600) * 0.25);
  }, []);

  // to store the layer when modal (add traits)
  const [addTraitsModal, setAddTraitsModal] = useState<ILayer>();

  // to set trait list collapse (in asset panel)
  const [collapseMap, setCollapseMap] = useState<{
    [layerId: string]: boolean;
  }>({});

  useEffect(() => {
    if (layersData)
      setCollapseMap((p) =>
        layersData
          ?.map((item) => ({ [item.id]: p?.[item.id] ?? true }))
          ?.reduce((p, c) => ({ ...p, ...c }), {}),
      );
  }, [layersData]);

  const [selectedLayer, setSelectedLayer] = useState<ILayer | undefined>();
  const selectedLayerIndex = useMemo(
    () =>
      filteredGroupLayersData
        ?.map((layer) => layer.id)
        ?.indexOf(selectedLayer?.id ?? '') ?? 0,
    [filteredGroupLayersData, selectedLayer],
  );

  // select first layer when not selected layer
  useInit(() => {
    if (!selectedLayer) setSelectedLayer(filteredGroupLayersData?.[0]);
  }, [filteredGroupLayersData, selectedLayer]);
  // change selectedLayer when changing group
  useEffect(() => {
    if (selectedLayer?.group_id !== selectedGroup?.id)
      setSelectedLayer(filteredGroupLayersData?.[0]);
  }, [filteredGroupLayersData, selectedGroup, selectedLayer?.group_id]);
  // change selectedLayer when update layer itself
  useEffect(() => {
    setSelectedLayer(filteredGroupLayersData?.[selectedLayerIndex]);
  }, [filteredGroupLayersData, selectedLayerIndex]);

  // show selected traits in combine trait canvas
  // to combine traits for showing
  const selectedTraits = useMemo(() => {
    const traits: (ITrait | undefined)[] = [];
    filteredGroupLayersData?.forEach((item) => {
      if (selectedLayerTraitMap[item.id]) {
        traits.push(selectedLayerTraitMap[item.id]);
      }
    });
    return traits;
  }, [filteredGroupLayersData, selectedLayerTraitMap]);

  const selectTraitToShow = useCallback(
    (layerId: string, trait?: ITrait) => {
      setSelectedLayerTraitMap((p) => ({
        ...p,
        [`${layerId}`]: trait,
      }));
    },
    [setSelectedLayerTraitMap],
  );

  // show last interact trait in the current traits canvas
  const [lastSelectedTrait, setLastSelectedTrait] = useState<ITrait>();
  useEffect(() => {
    setLastSelectedTrait(undefined);
  }, [selectedGroup]);

  const { updateTraitProbMutation, updateTraitState } = useTrait();
  const { mutate: updateTrait, isLoading: isLoadingUpdateTrait } =
    updateTraitProbMutation;

  const notAlwaysShowLayer = useMemo(
    () =>
      filteredGroupLayersData
        ?.map((layer) => ({ [layer.id]: layer.show_weight !== -1 }))
        ?.reduce((prev, curr) => ({ ...prev, ...curr }), {}) || {},
    [filteredGroupLayersData],
  );

  const showLayerWeight = useMemo(
    () =>
      filteredGroupLayersData
        ?.map((layer) => ({ [layer.id]: layer.show_weight || 1 }))
        ?.reduce((prev, curr) => ({ ...prev, ...curr }), {}) || {},
    [filteredGroupLayersData],
  );

  const traitWeight = useMemo(() => {
    const initTraitWeight: {
      [traitId: string]: number;
    } = {};
    filteredGroupLayersData?.forEach((layer) => {
      layer?.traits?.forEach((trait) => {
        initTraitWeight[trait.id] = trait.weight || 1;
      });
    });
    return initTraitWeight;
  }, [filteredGroupLayersData]);

  const traitProb = useMemo<{ [traitId: string]: number }>(() => {
    const traitProbTemp: { [traitId: string]: number } = {};
    filteredGroupLayersData?.forEach((layer) => {
      const { traits } = layer;
      let totalWeight = traits
        ?.map((trait) => traitWeight[trait.id] || 1)
        ?.reduce((prev, curr) => prev + curr, 0);

      totalWeight += notAlwaysShowLayer?.[layer.id]
        ? showLayerWeight?.[layer.id] ?? 0
        : 0;
      if (totalWeight > 0)
        traits.forEach((trait) => {
          traitProbTemp[trait.id] = (traitWeight[trait.id] ?? 1) / totalWeight;
        });
      traitProbTemp[`empty-${layer.id}`] =
        showLayerWeight?.[layer.id] / totalWeight;
    });
    return traitProbTemp;
  }, [
    filteredGroupLayersData,
    notAlwaysShowLayer,
    showLayerWeight,
    traitWeight,
  ]);

  const layersWeight = useMemo(() => {
    return (
      filteredGroupLayersData
        ?.map((item) => ({
          [item.id]: item.show_weight,
        }))
        ?.reduce((p, c) => ({ ...p, ...c }), {}) || {}
    );
  }, [filteredGroupLayersData]);

  const saveProb = useCallback(() => {
    if (
      Object.keys(traitWeight).length === 0 ||
      Object.keys(layersWeight).length === 0
    )
      return;
    updateTrait({
      traitsWeight: traitWeight,
      layersWeight: layersWeight,
      groupId: selectedGroup?.id ?? '',
    });
  }, [layersWeight, selectedGroup?.id, traitWeight, updateTrait]);

  // auto save trait prob
  const saveInTime = useRef<any>();
  useEffect(() => {
    if (!selectedGroup?.id) return;
    clearTimeout(saveInTime.current);
    saveInTime.current = setTimeout(() => saveProb(), 1000);
  }, [saveProb, selectedGroup?.id]);

  return (
    <AssetContext.Provider
      value={{
        selectedGroup,
        setSelectedGroup,
        filteredGroupLayersData,
        drawSize,
        drawInnerSize,
        lastSelectedTrait,
        setLastSelectedTrait,
        collapseMap,
        setCollapseMap,
        selectedLayerTraitMap,
        setSelectedLayerTraitMap,
        selectedTraits,
        selectTraitToShow,
        updateTraitProbMutation,
        notAlwaysShowLayer,
        traitProb,
        showLayerWeight,
        traitWeight,
        saveProb,
        selectedLayer,
        setSelectedLayer,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssetShowContext = () => {
  const context = useContext(AssetContext);
  if (!context) {
    console.error('use asset show context in asset page!');
  }
  return context;
};
