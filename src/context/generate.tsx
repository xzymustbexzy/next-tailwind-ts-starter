import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLayer } from '@/hooks/useLayer';
import { useGenerateQuery } from '@/hooks/useGenerateQuery';
import { useStatistic } from '@/hooks/useStatistic';
import { useGenerate } from '@/hooks/useGenerate';
import { UseMutationResult, UseQueryResult } from 'react-query';
import { IGenRes, ILayerDesc, IStatistic } from '@/types/gen';
import { useInit } from '@/hooks/util/useInit';
import { IGroup } from '@/types/group';
import { useGroup } from '@/hooks/useGroup';
import { ILayer } from '@/types/layer';

const GenerateContext = createContext<{
  draftDataQuery: UseQueryResult<IGenRes>;
  draftPageConfig: {
    page: number;
    size: number;
    filter: { [layerId: string]: string[] };
  };
  setDraftPageConfig: Dispatch<
    SetStateAction<{
      page: number;
      size: number;
      filter: { [layerId: string]: string[] };
    }>
  >;
  pickedDataQuery: UseQueryResult<IGenRes>;
  pickedPageConfig: {
    page: number;
    size: number;
    filter: { [layerId: string]: string[] };
  };
  setPickedPageConfig: Dispatch<
    SetStateAction<{
      page: number;
      size: number;
      filter: { [layerId: string]: string[] };
    }>
  >;
  transferMut: UseMutationResult<
    void,
    unknown,
    {
      imgIdList: string[];
      imgDescList?: ILayerDesc[];
    }
  >;
  genMut: UseMutationResult<void, unknown, string>;
  clearGenImgMutation: UseMutationResult<void, unknown, void>;
  genStatisticQuery: UseQueryResult<IStatistic>;
  getGenStatisticMutation: UseMutationResult<void, unknown, void>;
  selectedDraftFilter: {
    [layerId: string]: string[];
  };
  setSelectedDraftFilter: Dispatch<
    SetStateAction<{
      [layerId: string]: string[];
    }>
  >;
  selectedPickedFilter: {
    [layerId: string]: string[];
  };
  setSelectedPickedFilter: Dispatch<
    SetStateAction<{
      [layerId: string]: string[];
    }>
  >;
  filteredDraftLayersData: ILayer[];
  filteredPickedLayersData: ILayer[];
  draftGroup: IGroup | undefined;
  setDraftGroup: Dispatch<SetStateAction<IGroup | undefined>>;
  pickedGroup: IGroup | undefined;
  setPickedGroup: Dispatch<SetStateAction<IGroup | undefined>>;
} | null>(null);
export const GenerateProvider = ({ children }: { children: ReactNode }) => {
  const { layersDataQuery } = useLayer();
  const { data: layersData } = layersDataQuery;
  const {
    genDataQuery: draftDataQuery,
    pageConfig: draftPageConfig,
    setPageConfig: setDraftPageConfig,
  } = useGenerateQuery('draft');
  const {
    genDataQuery: pickedDataQuery,
    pageConfig: pickedPageConfig,
    setPageConfig: setPickedPageConfig,
  } = useGenerateQuery('picked');
  const { genStatisticQuery, getGenStatisticMutation } = useStatistic();
  const {
    generateImgMutation,
    transferImgToPickedMutation,
    clearGenImgMutation,
  } = useGenerate();

  const [selectedDraftFilter, setSelectedDraftFilter] = useState<{
    [layerId: string]: string[];
  }>({});

  const [selectedPickedFilter, setSelectedPickedFilter] = useState<{
    [layerId: string]: string[];
  }>({});

  const { groupQuery } = useGroup();
  const [draftGroup, setDraftGroup] = useState<IGroup>();
  const [pickedGroup, setPickedGroup] = useState<IGroup>();

  const setFilterDepGroup = useCallback(() => {
    // [''] means filter the empty state of one layer.
    // only show weight is not -1 has this option
    const tempDraftFilter: { [layerId: string]: string[] } = (layersData ?? [])
      .filter((layer) => layer.group_id === draftGroup?.id)
      ?.map((layer) => ({
        [layer.id]: layer.traits
          .map((trait) => trait.id)
          .concat(layer.show_weight === -1 ? [] : ['']),
      }))
      ?.reduce((p, c) => ({ ...p, ...c }), {});

    const tempPickedFilter: { [layerId: string]: string[] } = (layersData ?? [])
      .filter(
        (layer) =>
          pickedGroup?.id === 'all' || layer.group_id === pickedGroup?.id,
      )
      ?.map((layer) => ({
        [layer.id]: layer.traits
          .map((trait) => trait.id)
          .concat(layer.show_weight === -1 ? [] : ['']),
      }))
      ?.reduce((p, c) => ({ ...p, ...c }), {});

    setSelectedDraftFilter(tempDraftFilter);
    setSelectedPickedFilter(tempPickedFilter);
    setDraftPageConfig((prev) => ({
      ...prev,
      filter: tempDraftFilter,
      page: 1,
    }));
    setPickedPageConfig((prev) => ({
      ...prev,
      filter: tempPickedFilter,
      page: 1,
    }));
  }, [
    draftGroup,
    layersData,
    pickedGroup,
    setDraftPageConfig,
    setPickedPageConfig,
  ]);

  useEffect(() => {
    setFilterDepGroup();
  }, [draftGroup, pickedGroup, setFilterDepGroup]);

  useEffect(() => {
    setDraftGroup(groupQuery.data?.[0]);
    setPickedGroup({ name: 'all', id: 'all' });
  }, [groupQuery.data]);

  const filteredDraftLayersData = useMemo(() => {
    return (
      layersData?.filter((layer) => layer.group_id === draftGroup?.id) ?? []
    );
  }, [draftGroup, layersData]);
  const filteredPickedLayersData = useMemo(() => {
    return (
      layersData?.filter(
        (layer) =>
          pickedGroup?.id === 'all' || layer.group_id === pickedGroup?.id,
      ) ?? []
    );
  }, [pickedGroup, layersData]);

  return (
    <GenerateContext.Provider
      value={{
        transferMut: transferImgToPickedMutation,
        genMut: generateImgMutation,
        clearGenImgMutation,
        genStatisticQuery,
        getGenStatisticMutation,
        draftDataQuery,
        draftPageConfig,
        setDraftPageConfig,
        pickedDataQuery,
        pickedPageConfig,
        setPickedPageConfig,
        selectedDraftFilter,
        setSelectedDraftFilter,
        selectedPickedFilter,
        setSelectedPickedFilter,
        filteredDraftLayersData,
        filteredPickedLayersData,
        draftGroup,
        setDraftGroup,
        pickedGroup,
        setPickedGroup,
      }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export const useGenerateContext = () => {
  const context = useContext(GenerateContext);
  if (!context) {
    console.error('use generate context in generate page!');
  }
  return context;
};
