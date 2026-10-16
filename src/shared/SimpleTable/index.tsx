import * as t from './types';
import * as S from './styles';

export const SimpleTable = (props: t.SimpleTablePropsType) => {
    const { children, ...rest } = props;

    return (
        <S.StyledSimpleTable {...rest}>
            <tbody>
                {children}
            </tbody>
        </S.StyledSimpleTable>
    );
};
