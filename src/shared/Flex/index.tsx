import React, { CSSProperties } from 'react';

import styled from '@emotion/styled';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface FlexProps extends DivProps {
  display?: 'flex' | 'inline-flex';
  flexDirection?: 'row' | 'column';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flexGrow?: number;
  flexShrink?: number;
  alignItems?:
    | 'stretch'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'baseline'
    | 'initial'
    | 'inherit';
  justifyContent?:
    | 'left'
    | 'right'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
  gap?: string | number;
  height?: string | number;
  width?: string | number;
  flex?: CSSProperties['flex'];
}

export const Flex = styled.div<FlexProps>(({ style = {}, ...props }) => ({
  display: props.display || 'flex',
  flex: props.flex,
  flexDirection: props.flexDirection,
  flexGrow: props.flexGrow,
  flexShrink: props.flexShrink,
  flexWrap: props.flexWrap,
  alignItems: props.alignItems,
  justifyContent: props.justifyContent,
  gap: props.gap,
  height: props.height,
  width: props.width,
  ...style,
}));
