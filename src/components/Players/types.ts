import { GetPlayersResponse, IncludeFilters, PlayersSortByType, PlayersSortDirectionType } from '@/domains/casino/player';
import { Tag } from '@/domains/casino/tag';

import { OptionType } from '@/shared/Select';
import { Dispatch, SetStateAction } from 'react';

export interface PlayersFilters {
    searchTerm: string;
    tags: readonly Tag['id'][];

    sortBy: FirstPart<Exclude<SortSelectType, null>>;
    sortDirection: SecondPart<Exclude<SortSelectType, null>>;

    limit?: number;
    offset?: number;
};

export interface PlayersSortConfig {
    sortBy: FirstPart<Exclude<SortSelectType, null>>;
    sortDirection: SecondPart<Exclude<SortSelectType, null>>;
};

export interface PlayersTableProps {
    data?: GetPlayersResponse;
    filters: PlayersFilters,
    includeFilters?: IncludeFilters,
    isError?: boolean;
    isLoading?: boolean;
    setFilters: Dispatch<SetStateAction<PlayersFilters>> | ((newValue: PlayersFilters) => void);
    setSortConfig: Dispatch<SetStateAction<PlayersSortConfig>> | ((newValue: PlayersSortConfig) => void);
};

export type SortSelectType = OptionType<`${PlayersSortByType}:${PlayersSortDirectionType}`>;

// Helpers
type FirstPart<T extends SortSelectType> = T extends `${infer First}:${string}` ? First : PlayersSortByType;
type SecondPart<T extends SortSelectType> = T extends `${string}:${infer Second}` ? Second : PlayersSortDirectionType;
