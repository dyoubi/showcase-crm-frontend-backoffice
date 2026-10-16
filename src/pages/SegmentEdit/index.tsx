import { memo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '@/components/Page';
import { SegmentBuilder } from '@/components/SegmentBuilder';
import { Conditions, useGetSegment, usePostSegment } from '@/domains/casino/segmentation';
import { Spacer } from '@/shared/Spacer';

import { EditableTitle } from '@/shared/EditableTitle';
import { Card } from '@/shared/Card';

import { routes } from '@/libs/router/constants';

import { useHandleError, useToaster } from '../../hooks';

export const SegmentEdit = memo(() => {
  // hooks
  const [value, setValue] = useState('');
  const { segmentId = '' } = useParams();
  const { data: segment, refetch } = useGetSegment(segmentId, {
    onSuccess: (res) => setValue(res?.name || ''),
  });
  const { mutateAsync: postSegment } = usePostSegment();
  const toast = useToaster();
  const handleError = useHandleError();

  // callbacks
  const onBuildFinished = async (conditions: Conditions) => {
    try {
      await postSegment({ ...segment, query: { data: conditions } });
      toast({ color: 'success', content: 'Segment updated' });
    } catch (ex) {
      handleError(ex);
    }
  };

  // callback
  const editName = (name: string) =>
    postSegment({ id: segment?.id, name, query: segment?.query }).then(() => refetch());

  return (
    <Page
      breadcrumbs={[
        { content: 'Segments list', link: routes.SEGMENTS },
        { content: segment?.name },
      ]}
    >
      <EditableTitle value={value} onSave={editName} />
      <Spacer size="xs" />
      <Card loadingOverlay={!segment}>
        {segment && (
          <SegmentBuilder
            onEntity="Player"
            initialsConditions={segment?.query?.data || []}
            onBuildFinished={onBuildFinished}
          />
        )}
      </Card>
    </Page>
  );
});
