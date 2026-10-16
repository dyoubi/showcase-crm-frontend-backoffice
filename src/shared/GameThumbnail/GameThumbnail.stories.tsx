import type { Meta, StoryFn as Story } from '@storybook/react';

import { Card } from '../Card';
import { GameThumbnail } from '.';

export default {
  title: 'components/GameThumbnail',
} as Meta;

const Template: Story = () => (
  <Card>
    <div>
      <GameThumbnail
        provider="yggdrasil"
        title="VALLEY OF GODS"
        image="/assets/images/games/valley-of-god.png"
      />
      <GameThumbnail
        provider="yggdrasil"
        title="WINTER BERRIES"
        image="/assets/images/games/winter-berries.png"
      />
      <GameThumbnail
        provider="yggdrasil"
        title="VICKING GO BERZEK"
        image="/assets/images/games/viking-go-berzek.png"
      />
    </div>

    <div>
      <GameThumbnail
        provider="no-limit"
        title="BOOK OF SHADOWS"
        image="/assets/images/games/book-of-shadows.png"
      />
      <GameThumbnail
        provider="no-limit"
        title="FIRE IN THE HOLE"
        image="/assets/images/games/fire-in-the-hole.png"
      />
      <GameThumbnail
        provider="no-limit"
        title="INFECTIOUS 5 XWAYS"
        image="/assets/images/games/infectious-5-xways.png"
      />
    </div>

    <div>
      <GameThumbnail
        provider="pragmatic-play"
        title="SPIRIT OF ADVENTURE"
        image="/assets/images/games/spirit-of-adventure.png"
      />
      <GameThumbnail
        provider="pragmatic-play"
        title="THE GREAT STICK UP"
        image="/assets/images/games/the-great-stick-up.png"
      />
      <GameThumbnail
        provider="pragmatic-play"
        title="SPACEMAN"
        image="/assets/images/games/spaceman.png"
      />
    </div>
  </Card>
);

export const Default = Template.bind({});
