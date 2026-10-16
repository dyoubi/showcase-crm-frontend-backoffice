import { memo, useEffect, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';

import { colors } from '@/theme/light/colors';

import { PlayerStatus, PlayerStatusEnum, useGetPlayer } from '@/domains/casino/player';

import { Button } from '@/shared/Button';
import { Checkbox } from '@/shared/Checkbox';
import { DateInputRHF } from '@/components/RHF/DateInputRHF';
import { Flex } from '@/shared/Flex';
import { IconDocument } from '@/shared/Icons';
import { useTagInputState } from '@/components/TagInput';
import { configuration } from '@/configuration';

import { useAppDateFormat, useAppTheme, useToggle } from '@/hooks';
import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';

import { AssignBonusModal } from '../AssignBonusModal';

import { useHandleFormSubmit } from './hooks';
import * as S from './styles';
import * as t from './types';
import { validationSchema } from './validationSchema';
import { FormGroup } from './FormGroup';

export interface FormProps {
  playerId?: string;
}

export const Form = memo((props: FormProps) => {
  const { playerId } = props;

  const { formatDate } = useAppDateFormat();
  const { data: player } = useGetPlayer(playerId, {
    onSuccess: (response) => {
      setTagsIds(response?.tags?.map(({ id }) => id) || []);
    },
  });
  const { isDarkMode } = useAppTheme();
  const [isEditMode, setIsEditMode] = useState(false);
  const [tagsIds, setTagsIds] = useTagInputState();

  const formData = useForm<t.PlayerFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      birth: player?.birthdate ? new Date(player?.birthdate).toString() : undefined,
      city: player?.address?.city,
      country: player?.address?.country,
      firstname: player?.firstname || '',
      // RBO-46: Default to “m”
      gender: player?.gender || 'm',
      ghostMode: player?.privacy?.ghost || false,
      lastname: player?.lastname || '',
      rainMode: player?.privacy?.rain || false,
      rank: {
        level: player?.stats?.rankLevel || 0,
        points: player?.stats?.rankPoint || 0,
      },
      showStats: player?.privacy?.statistics || false,
      marketingAcceptation: player?.marketingAcceptation || false,
      dateRegistered: player?.createdAt,
      lastLogin: player?.updatedAt,
      affiliateToken: player?.metadata?.affiliateToken,
    },
  });
  const { onSubmit, isLoading } = useHandleFormSubmit(tagsIds, player?.id);
  const [displayBonusModal, toggleBonusModal] = useToggle();

  // constants
  const { control, handleSubmit } = formData;
  const COLORS_BY_PLAYER_STATUS = {
    [PlayerStatusEnum.ACTIVATED]: colors.success.main,
    [PlayerStatusEnum.VALIDATED]: colors.validated.main,
    [PlayerStatusEnum.PENDING]: colors.danger.main,
    [PlayerStatusEnum.BANNED]: colors.warning.main,
    [PlayerStatusEnum.FROZEN]: colors.primary.main,
    [PlayerStatusEnum.SELF_EXCLUDE]: colors.danger.main,
    default: undefined,
  };

  const getColorByPlayerStatus = (playerStatus: PlayerStatus | undefined) => {
    return playerStatus ? COLORS_BY_PLAYER_STATUS[playerStatus] : undefined;
  };

  const getFrozenStatus = () => {
    if (!player || !player.status) {
      return '';
    }

    if (PlayerStatusEnum.FROZEN === player.status) {
      return `${player.status.toUpperCase()} — Frozen until: ${formatDate(
        player?.frozenUntil || '',
      )}`;
    }

    return player.status.toUpperCase();
  };

  const inputBorderColor = () => {
    if (isEditMode) {
      return isDarkMode ? '#35477A' : '#c5d4ff';
    }
    return isDarkMode ? '#444A5B' : '#DEDEDE';
  };

  const watchedSettings = useWatch({
    control,
    name: ['ghostMode', 'rainMode', 'showStats', 'marketingAcceptation'],
  });

  const prevValuesRef = useRef({
    settings: watchedSettings,
    tags: tagsIds,
  });

  useEffect(() => {
    if (!isEditMode && player?.id) {
      const prev = prevValuesRef.current;
      const settingsChanged = watchedSettings.some((val, idx) => val !== prev.settings[idx]);
      const tagsChanged =
        tagsIds.length !== prev.tags.length || tagsIds.some((id, idx) => id !== prev.tags[idx]);

      if (settingsChanged || tagsChanged) {
        handleSubmit(onSubmit)();
      }

      prevValuesRef.current = {
        settings: watchedSettings,
        tags: tagsIds,
      };
    }
  }, [watchedSettings, tagsIds, isEditMode, player?.id, handleSubmit, onSubmit]);

  return (
    <S.FormContainer
      loadingOverlay={!player?.id || isLoading}
      icon={IconDocument}
      title="Player Info"
      topContent={
        <S.EditButton
          onClick={() => {
            setIsEditMode(true);
          }}
          color="primary"
        >
          Edit
        </S.EditButton>
      }
    >
      {!/^(https:\/\/)+\w+.egamingchain.io/g.test(configuration.CASINO_API_URL) ? (
        <DevTool control={control} />
      ) : null}

      {(displayBonusModal && player) ? (
        <AssignBonusModal
          onHide={toggleBonusModal}
          player={player}
        />
      ) : null}

      <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup title="Player Details" gridArea="player-details">
          <Flex gap={10} flexWrap="wrap" width="100%">
            <S.StatusContainer color={getColorByPlayerStatus(player?.status)}>
              <S.PlayerInfoInput
                label="Player status"
                disabled
                readOnly
                value={getFrozenStatus()}
              />
            </S.StatusContainer>
            <S.PlayerInfoInput label="Username" disabled value={player?.nickname} customFlex={1} />
            <S.PlayerInfoInput label="Player ID" disabled value={player?.id} customFlex={1} />
          </Flex>
          <S.FormRow flexWrap="wrap">
            <S.PlayerInfoInput
              label="VIP Level"
              disabled={!isEditMode}
              {...getInputProps(formData, 'rank.level')}
            />
            <S.PlayerInfoInput
              label="VIP Points"
              disabled={!isEditMode}
              {...getInputProps(formData, 'rank.points')}
            />
            <S.PlayerInfoInput label="Language code" disabled />
          </S.FormRow>
          <S.FormRow gap={10} flexWrap="wrap" width="100%">
            <S.PlayerInfoInput
              label="Affiliate ID"
              value={player?.metadata?.affiliateToken}
              disabled
              customFlex={1}
            />
          </S.FormRow>
        </FormGroup>
        <FormGroup title="Personal Information" gridArea="player-information">
          <S.FormRow flexWrap="wrap">
            <S.PlayerInfoInput
              label="First Name"
              disabled={!isEditMode}
              {...getInputProps(formData, 'firstname')}
            />
            <S.PlayerInfoInput
              label="Last Name"
              disabled={!isEditMode}
              {...getInputProps(formData, 'lastname')}
            />
          </S.FormRow>

          <DateInputRHF
            label="Date of Birth"
            disabled={!isEditMode}
            inputstyle={{
              borderColor: inputBorderColor(),
              height: 30,
              width: '100%',
            }}
            style={{ fontWeight: 'bold', width: '100%' }}
            {...getControlledInputProps(formData, 'birth')}
          />
        </FormGroup>
        <FormGroup title="Contact Information" gridArea="contact-information">
          <S.PlayerInfoInput label="Email" value={player?.email} disabled customFlex={1} />
          <S.FormRow gap={10} flexWrap="wrap" width="100%">
            <S.PlayerInfoInput
              label="City"
              disabled={!isEditMode}
              {...getInputProps(formData, 'city')}
            />
            <S.PlayerInfoInput
              label="Country"
              disabled={!isEditMode}
              {...getInputProps(formData, 'country')}
            />
          </S.FormRow>
        </FormGroup>
        <FormGroup title="Settings" gridArea="settings">
          <S.PlayerInfoTagInput
            color={isDarkMode ? '#35477A' : '#c5d4ff'}
            height={30}
            label="Player tags"
            padding="0"
            setTagsIds={setTagsIds}
            tagsIds={tagsIds}
            tagType="player"
          />
          <Checkbox {...getInputProps(formData, 'ghostMode')} label="Ghost mode" />
          <Checkbox {...getInputProps(formData, 'rainMode')} label="Rain mode" />
          <Checkbox {...getInputProps(formData, 'showStats')} label="Show stats" />
          <Checkbox
            {...getInputProps(formData, 'marketingAcceptation')}
            label="Marketing Acceptation"
          />
        </FormGroup>
        <FormGroup title="Account Information" gridArea="account-information">
          <S.PlayerInfoInput label="IP" value="" disabled />
          <S.FormRow gap={10} flexWrap="wrap" width="100%">
            <DateInputRHF
              label="Last Login"
              disabled
              inputstyle={{
                borderColor: isDarkMode ? '#444A5B' : '#DEDEDE',
                height: 30,
                width: '100%',
              }}
              style={{ fontWeight: 'bold', width: '100%' }}
              customFormat="dd/MM/yyyy HH:mm"
              pattern="d{/}`m{/}`Y H{:}`M"
              {...getControlledInputProps(formData, 'lastLogin')}
            />
            <DateInputRHF
              label="Date Registered"
              disabled
              inputstyle={{
                borderColor: isDarkMode ? '#444A5B' : '#DEDEDE',
                height: 30,
                width: '100%',
              }}
              style={{ fontWeight: 'bold', width: '100%' }}
              customFormat="dd/MM/yyyy HH:mm"
              pattern="d{/}`m{/}`Y H{:}`M"
              {...getControlledInputProps(formData, 'dateRegistered')}
            />
          </S.FormRow>
        </FormGroup>

        {isEditMode && (
          <S.ActionContainer justifyContent="space-between" gap={10}>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button
              onClick={() => {
                setIsEditMode(false);
              }}
              color="primary"
            >
              Cancel
            </Button>
          </S.ActionContainer>
        )}
      </S.StyledForm>
    </S.FormContainer>
  );
});
