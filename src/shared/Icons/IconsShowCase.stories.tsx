import { FC, useMemo, useState } from 'react';
import type { Meta, StoryFn as Story } from '@storybook/react';

import { Page } from '@/components/Page';

import { Card } from '@/shared/Card';
import { Flex } from '@/shared/Flex';
import { Link } from '@/shared/Link';
import { Tabs } from '@/shared/Tabs';

import * as Icons from '.';
import { iconStorySettings } from './constants';
import { IconProps } from './types';

export const IconsShowCase = (props: IconProps) => {
  const [selectedTabId, setSelectedTabId] = useState('notes');

  const tabs = useMemo(() => [{
    tabId: 'notes',
    title: 'Notes',
    icon: Icons.IconArticle,
    content: (
      <>
        <h2>Notes</h2>

        <p>
          The <Link href="https://tabler.io/icons">Tabler Icons</Link> library has been implemented in order to standardize the usage of icons across the app.
          Some icons has different name when they have been implemented in order to keep previous implementations.
          To find the desired icon, based on your operative system press the following keys to use your browser’s native search mechanism.
        </p>

        <ul>
          <li>Press <kbd>Cmd</kbd> + <kbd>F</kbd> in MacOS.</li>
          <li>Press <kbd>Ctrl</kbd> + <kbd>F</kbd> in Windows.</li>
        </ul>
      </>
    ),
  }, {
    tabId: 'add-new-icon',
    title: 'Add New Icon',
    icon: Icons.IconAddPlus,
    content: (
      <>
        <h2>Add New Icon</h2>

        <p>
          If the <Link href="https://tabler.io/icons">Tabler Icons</Link> library does not contain the desired icon, please take in mind the following considerations when designing a new icon.
        </p>

        <ul>
          <li>Icons <strong>should</strong> be outlined.</li>
          <li>Icons <strong>should not</strong> contain any fill. Their color <strong>should</strong> be giving by it’s <code>stroke</code> icon definition.</li>
          <li>Icons <strong>should</strong> have their styling defined in their <code>{`<svg>`}</code> tag.</li>
          <li>Icons <strong>should</strong> consume their respective hooks to adjust their <em>color</em>, <em>size</em>, and/or <em>stroke width</em>.</li>
          <li>Icons might have a view port of 24x24.</li>
        </ul>

      <h3>Resources</h3>
        <ul>
          <li>Official <Link href="https://tabler.io/icons">Tabler Icons</Link> page.</li>
          <li><Link href="https://www.figma.com/community/plugin/1169807996149376642/tabler-icons">Tabler Icons</Link> Figma plugin.</li>
        </ul>
      </>
    ),
  }], []);

  const keys = Object.keys(Icons);
  const keysPerColumn = Math.ceil(keys.length / 3); // 3 column layout

  const columns = [
    keys.slice(0, keysPerColumn),
    keys.slice(keysPerColumn, keysPerColumn * 2),
    keys.slice(keysPerColumn * 2)
  ];

  return (
    <Page
      breadcrumbs={[{ content: 'Icons' }]}
      headTitle="Icons"
    >
      <h1>
        Icons
      </h1>

      <Card>
        <Tabs
          tabs={tabs}
          selectedTabId={selectedTabId}
          onSelect={setSelectedTabId}
        />
      </Card>

      <h2>
        List
      </h2>

      <Flex flexDirection="row" gap={18}>
        {columns.map((column, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={index} style={{ flex: 1 }}>
            <Flex flexDirection="row" flexWrap="wrap">
              <ul style={{ listStyle: 'none' }}>
                {column.map((key) => {
                  // @ts-ignore
                  // eslint-disable-next-line import/namespace
                  const Icon = Icons[key] as FC<IconProps>;

                  return (
                    <li key={key} style={{ marginBottom: 12 }}>
                      <Flex flexDirection="row" alignItems="center" gap={8}>
                        <Icon {...props} id={key} />

                        <span>
                          {key}
                        </span>
                      </Flex >
                    </li>
                  );
                })}
              </ul>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Page>
  );
};

export default {
  title: 'IconsShowCase',
  component: IconsShowCase,
  ...iconStorySettings,
} as Meta;

const Template: Story<IconProps> = (args) => (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <IconsShowCase {...args} />
);

export const Default = Template.bind({});
