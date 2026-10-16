import { useState } from 'react';

import { useAppDateFormat, useHandleError, useToaster } from '@/hooks';
import { Bonus, useAssignBonus } from '@/domains/casino/bonus';
import { useGetPlayersList } from '@/domains/casino/player';

import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { Modal } from '@/shared/Modal';
import { Flex } from '@/shared/Flex';
import { Stack, StackItem } from '@/shared/Stack';

import { PlayersTable, t as PlayersTypes, C as PlayersConstants } from '@/components/Players';
import { TagInput, useTagInputState, t as TagsTypes  } from '@/components/TagInput';
import { IconLoader } from '@/shared/Icons';

interface BulkAssignBonusModalProps {
  bonus: Bonus;
  onHide: () => void;
}

const BulkAssignBonusModal = ({ bonus, onHide }: BulkAssignBonusModalProps) => {
  const [filters,    setFilters]    = useState<PlayersTypes.PlayersFilters>(PlayersConstants.FILTERS_DEFAULT);
  const [sortConfig, setSortConfig] = useState<PlayersTypes.PlayersSortConfig>(PlayersConstants.SORT_CONFIG_DEFAULT);
  const [tagIds,     setTagIds]     = useTagInputState(filters.tags);

  const { formatDate } = useAppDateFormat();
  const { isLoading: isAssignBonusLoading, mutateAsync } = useAssignBonus();
  const handleError = useHandleError();
  const toaster = useToaster();

  const {
    data,
    isError,
    isLoading,
  } = useGetPlayersList({
    searchTerm: filters.searchTerm,
    tags: tagIds,

    sortBy: sortConfig.sortBy,
    sortDirection: sortConfig.sortDirection,

    limit: filters.limit,
    offset: filters.offset,
  });

  const handleTagChange = (newValue: TagsTypes.TagInputState) => {
    if (!newValue) {
      return;
    }

    setTagIds(newValue);
  };

  const assignBonuses = async () => {
    try {
      if (!bonus.id || !tagIds.length || !data?.count) {
        return;
      }

      await mutateAsync({
        bonusId: bonus.id,
        tagIds,
      });

      toaster({
        content: 'Bonus assigned successfully.',
        color: 'success',
      });

      onHide();
    } catch (error) {
      handleError(error);
    }
  };

  const noPlayersSelected = !tagIds.length || isLoading || isError || !Number(data?.count) || isAssignBonusLoading;

  return (
    <Modal
      background="dimmed"
      height="80%"
      maxWidth={1200}
      onHide={onHide}
      show
      title="Bulk Assign"
      width="80%"
    >
      <Flex flexDirection="column" gap={16}>
        <Stack style={{ marginBottom: 24 }}>
          <StackItem
            label="Code"
            style={{ marginBottom: 0 }}
            value={bonus.code}
          />

          <StackItem
            label="Name"
            style={{ marginBottom: 0 }}
            value={bonus.name}
          />

          <StackItem
            label="Description"
            style={{ marginBottom: 0 }}
            value={bonus.description || '—'}
          />

          <StackItem
            label="Start At"
            style={{ marginBottom: 0 }}
            value={formatDate(bonus.startAt)}
          />

          <StackItem
            label="Ends At"
            style={{ marginBottom: 0 }}
            value={formatDate(bonus.endAt)}
          />
        </Stack>

        <Card>
          <Flex flexDirection="column" gap={16}>
            <Flex flexDirection="column" gap={12}>
              <h3 style={{ margin: 0 }}>
                Assignment Condition
              </h3>

              <p style={{ margin: 0 }}>
                Select a condition to assign the selected bonus to the listed users.
              </p>
              </Flex>

            <Flex alignItems="flex-start" gap={28}>
              <TagInput
                isDisabled={isAssignBonusLoading}
                placeholder="Select a tag..."
                setTagsIds={handleTagChange}
                style={{ minWidth: '200px' }}
                tagsIds={tagIds}
                tagType="player"
              />

              <Flex
                alignItems="center"
                gap={18}
              >
                <Button
                  color="success"
                  disabled={noPlayersSelected || isAssignBonusLoading}
                  size="l"
                  onClick={assignBonuses}
                >
                  Assign Bonus

                  {(isAssignBonusLoading) ? (
                    <IconLoader color="primary" />
                  ) : null}
                </Button>

                {(!noPlayersSelected) ? `to ${data?.count} player${Number(data?.count) > 1 ? 's' : ''} selected` : 'No players selected.'}
              </Flex>
            </Flex>
          </Flex>
        </Card>

        <Card>
          <Flex flexDirection="column" gap={16}>
            <h3 style={{ margin: 0 }}>
              Affected Users
            </h3>

            <PlayersTable
              data={data}
              filters={filters}
              isError={isError}
              isLoading={isLoading}
              setFilters={setFilters}
              setSortConfig={setSortConfig}
            />
          </Flex>
        </Card>
      </Flex>
    </Modal>
  );
};

export default BulkAssignBonusModal;
