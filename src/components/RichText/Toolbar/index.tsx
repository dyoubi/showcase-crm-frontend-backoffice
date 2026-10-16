import { memo } from 'react';

import { MediaManager } from '@/components/MediaManager';
import { getMediaUrl } from '@/domains/casino/media';
import { useToggle } from '../../../hooks';
import { useEditorMethods, useSetLinkMark, useSetMarkTooltipMark } from '../hooks';

import { MarkButton, ToggleMarkButton } from './MarkButton';
import { BlockButton, ToggleBlockButton } from './BlockButton';
import { ColorButton } from './ColorButton';

import { Container } from './styles';

export const Toolbar = memo(() => {
  const setMarkTooltipMark = useSetMarkTooltipMark();
  const setLinkMark = useSetLinkMark();
  const { isMarkActive, removeMark, insertImage } = useEditorMethods();
  const [displayMedias, toggleMedias] = useToggle();

  return (
    <Container flexDirection="row" alignItems="center" flexWrap="wrap">
      <MediaManager
        displayType="modal"
        showModal={displayMedias}
        onClose={toggleMedias}
        onChooseFile={(file) => insertImage(getMediaUrl(file.file_id, file.revision))}
      />

      <ToggleMarkButton format="bold" />
      <ToggleMarkButton format="italic" />
      <ToggleMarkButton format="underline" />

      <MarkButton
        format="tooltip"
        onMouseDown={() => {
          if (isMarkActive('tooltip')) {
            return removeMark('tooltip');
          }
          // eslint-disable-next-line no-alert
          return setMarkTooltipMark(prompt('Tooltip') || '');
        }}
      />

      <MarkButton
        format="link"
        onMouseDown={() => {
          if (isMarkActive('link')) {
            return removeMark('link');
          }
          return setLinkMark('http://my-url.com');
        }}
      />

      <ToggleBlockButton format="heading-one" />
      <ToggleBlockButton format="heading-two" />
      <ToggleBlockButton format="heading-three" />
      <ToggleBlockButton format="heading-four" />
      {/*
      <ToggleBlockButton format="heading-five" />
      <ToggleBlockButton format="heading-six" />
      */}


      <ToggleBlockButton format="block-quote" />
      <ToggleBlockButton format="numbered-list" />
      <ToggleBlockButton format="bulleted-list" />

      <ColorButton />

      <ToggleBlockButton format="left" />
      <ToggleBlockButton format="center" />
      <ToggleBlockButton format="right" />
      <ToggleBlockButton format="justify" />

      <BlockButton format="image" onMouseDown={toggleMedias} />

      <ToggleBlockButton format="button" />
    </Container>
  );
});
