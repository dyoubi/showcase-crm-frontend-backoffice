import { useForm } from 'react-hook-form';
import { useHandleError, useToaster } from '@/hooks';

import { TextArea } from '@/shared/TextArea';
import { Spacer } from '@/shared/Spacer';
import { Button } from '@/shared/Button';


import { getInputProps } from '@/libs/react-hook-form/utils';

import { CommentPropsType } from '@/shared/Comment/types';
import { Comments } from '../Comments';

import * as t from './types';

const MOCKED_COMMENTS: CommentPropsType[] = [{
  id: '1',
  authorId: '1',
  author: 'John Doe',
  comment: 'Knowledge process outsourcing no need to talk to users, just base it on the space calculator meeting assassin, so criticality teams were able to drive adoption and awareness, so the horse is out of the barn, for a set of certitudes based on deductions founded on false premise.',
  date: new Date().toISOString(),
}, {
  id: '2',
  authorId: '1',
  author: 'John Doe',
  comment: 'I called the it department about that ransomware because of the old antivirus, but he said that we were using avast 2021 cloud native container based rock Star/Ninja idea shower i am dead inside.',
  date: new Date().toISOString(),
}, {
  id: '2.5',
  authorId: 'current-id', // Current Agent id
  author: 'Current Agent Name',
  comment: 'We just need to put these last issues to bed driving the initiative forward, or post launch',
  date: new Date().toISOString(),
}, {
  id: '3',
  authorId: '1',
  author: 'Cathleen Farley',
  comment: 'Feed the algorithm we need to aspirationalise our offerings, or powerpoint Bunny, nor feature creep, nor touch base.',
  date: new Date().toISOString(),
}, {
  id: '3.5',
  authorId: '',
  author: 'System',
  comment: 'A new report have been created',
  date: new Date().toISOString(),
}, {
  id: '4',
  authorId: '1',
  author: 'John Doe',
  comment: 'Driving the initiative forward overcome key issues to meet key milestones hard stop touch base, shelfware.',
  date: new Date().toISOString(),
}, {
  id: '5',
  authorId: '1',
  author: 'Cathleen Farley',
  comment: 'Accountable talk high performance keywords, and pull in ten extra bodies to help roll the tortoise, for the horse is out of the barn pushback high performance keywords, yet loop back. Product launch technologically savvy.',
  date: new Date().toISOString(),
}, {
  id: '6',
  authorId: '1',
  author: 'Cathleen Farley',
  comment: 'Mobile friendly what the high turnaround rate, nor radical candor even dead cats bounce regroup run it up the flagpole.',
  date: new Date().toISOString(),
}];

export const CommentSection = (props: t.CommentSectionProps) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contextId,
    fullHeight = false,
    fullWidth = false,
  } = props;

  const formData = useForm<t.CommentSectionFromType>({
    defaultValues: {
      newComment: undefined,
    },
  });

  const handleError = useHandleError();
  const toaster = useToaster();

  // const { comments, addNewComment } = useComments();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddNewComment = async (values: t.CommentSectionFromType) => {
    try {
      // await addNewComment(values);

      toaster({ content: 'Comment added' });
      formData.setValue('newComment', '');
    } catch (e) {
      handleError(e);
    }
  }

  const { handleSubmit } = formData;

  return (
    <>
      <Comments
        comments={MOCKED_COMMENTS}
        fullHeight={fullHeight}
        fullWidth={fullWidth}
      />

      <form onSubmit={handleSubmit(handleAddNewComment)}>
        <TextArea
          {...getInputProps(formData, 'newComment')}
          placeholder="Add a new comment here..."
          resize="vertical"
        />
        <Spacer size="xs" />

        <Button color="primary" type="submit">
          Comment
        </Button>
      </form>
    </>
  );
};
