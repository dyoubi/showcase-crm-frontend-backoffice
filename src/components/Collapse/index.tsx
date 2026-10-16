import { memo, ReactNode } from 'react';

import { useToggle } from '@/hooks';

import { IconChevronRight, IconChevronDown } from '@/shared/Icons';
import { Flex } from '@/shared/Flex';

import { Title } from '../Title';

import * as S from './styles';

interface CollapseProps {
  title?: string;
  children?: ReactNode;
  collapsed?: boolean;
}

export const Collapse = memo((props: CollapseProps) => {
  const {
    children,
    collapsed = true,
    title,
  } = props;

    const [isCollapsed, toggle] = useToggle(collapsed);

    const Icon = isCollapsed ? IconChevronRight : IconChevronDown;

    return (
      <S.Container>
        <S.CollapseHeader
          onClick={toggle}
          type="button"
        >
          <Flex
            alignItems="center"
            flexDirection="row"
            gap={8}
          >
            {(title) ? (
              <Title>
                {title}
              </Title>
            ) : null}

            <Icon size="m" color="currentColor" />
          </Flex>
        </S.CollapseHeader>

        {(!isCollapsed) ? (
            children
        ) : null}
      </S.Container>
    );
  },
);
