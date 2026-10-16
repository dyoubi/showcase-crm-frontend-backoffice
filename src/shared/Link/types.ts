import React from 'react';

export type NativeLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export interface LinkPropsType extends NativeLinkProps {
  href: string,
}
