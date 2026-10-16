import { memo } from 'react';

import { Flex } from '@/shared/Flex';
import { Card } from '@/shared/Card';

export const SubComponent = memo(() => {
  return (
    <Card>
      <Flex flexDirection="row" width="100%">
        My subcomponent
      </Flex>
    </Card>
  );
});

SubComponent.displayName = 'SubComponent';
