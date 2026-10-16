import { useAppTheme } from '@/hooks';

import * as t from './types';
import * as S from './styles';

export const Table = (props: Omit<t.TablePropsType, 'isDarkMode'>) => {
    const {
        children,
        overflow,
        ...rest
    } = props;

    const { isDarkMode } = useAppTheme();

    const render = () => (
        <S.StyledTable isDarkMode={isDarkMode} {...rest}>
            {children}
        </S.StyledTable>
    );

    // Conditional render to avoid additional DOM nodes when not required
    if (overflow) {
        return (
            <S.Container>
                {render()}
            </S.Container>
        );
    }

    return render();
};
