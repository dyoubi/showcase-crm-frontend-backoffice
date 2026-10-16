import * as t from './types';

export const getOffsetAndLimit = (props: t.GetOffsetAndLimitProps): t.GetOffsetAndLimitReturn => {
    const { currentPage, resultsPerPage } = props

    if (!resultsPerPage.value) {
        return {};
    }

    return {
        limit: resultsPerPage.value,
        offset: (currentPage * resultsPerPage.value) ? (currentPage * resultsPerPage.value) : 0,
    };
}
