import { useGetOperatorMachine } from '@/domains/casino/machine';
import { Flex, FlexProps } from '@/shared/Flex';
import { Tooltip } from '@/shared/Tooltip';

export type ToolTipMachineNameProps = {
  justifyContent?: FlexProps['justifyContent'];
  children: string;
};

export const ToolTipMachineName = ({ justifyContent, children }: ToolTipMachineNameProps) => {
  const { data } = useGetOperatorMachine(children);

  return (
    <Tooltip message={children}>
      <Flex
        display="inline-flex"
        flexDirection="row"
        alignItems="center"
        justifyContent={justifyContent}
      >
        <strong>{data?.info.title}</strong>
      </Flex>
    </Tooltip>
  );
};
