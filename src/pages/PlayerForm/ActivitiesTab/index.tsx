import { memo } from 'react';

import { Title } from '@/components/Title';
import { TextArea } from '@/shared/TextArea';
import { Checkbox } from '@/shared/Checkbox';
import { Button } from '@/shared/Button';
import { Spacer } from '@/shared/Spacer';

import { TimeLine } from '@/shared/TimeLine';
import * as S from './styles';

const timelineItems = [
  {
    title: 'Email contact marketing',
    content: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam necessitatibus
    `,
    date: '1 Hours Ago',
  },
  {
    title: 'Email contact marketing',
    content: `
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam necessitatibus
    `,
    date: '1 day Ago',
  },
];

export const ActivitiesTab = memo(() => {
  return (
    <S.Container>
      <Title>New activity</Title>
      <Spacer size="xs" />
      <TextArea resize="vertical" />
      <Spacer size="s" />
      <S.SelectsContainer>
        <S.Select label="Activity type" onChange={() => 0} />
        <Spacer size="xxs" />
        <S.Select label="Duration" onChange={() => 0} />
      </S.SelectsContainer>
      <br />
      <Checkbox label="Planned activity" />
      <Spacer size="xs" />
      <Button color="secondary" size="l" type="button" style={{ float: 'right' }}>
        Create new activity
      </Button>
      <Spacer size="xl" />
      <Title>Contacts list</Title>
      <Spacer size="xs" />
      <TimeLine items={timelineItems} />
    </S.Container>
  );
});
