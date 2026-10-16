import * as t from './types';
import * as S from './styles';

export const Stack = (props: t.StackPropsType) => {
    const { children, ...rest } = props;

    return (
        <S.StyledStack {...rest}>
            <tbody>
                {children}
            </tbody>
        </S.StyledStack>
    );
};

export const StackItem = (props: t.StackItemPropsType) => {
    const {
        label,
        value,
        ...rest
    } = props;

    return (
        <S.StyledStackItem {...rest}>
            <th>{label}</th>
            <td>{value}</td>
        </S.StyledStackItem>
    )
}
