import { cssObj } from '@fuel-ui/css';
import { Button, Icon, Tabs } from '@fuel-ui/react';
import { AnimatePresence } from 'framer-motion';

import { AssetList } from '../../components';
import { useAssets } from '../../hooks';

import { Layout } from '~/systems/Core';

export function Assets() {
  const state = useAssets();

  const { handlers } = state;

  return (
    <Layout title="Assets">
      <Layout.TopBar />
      <Layout.Content css={styles.content}>
        <AnimatePresence initial={false} mode="wait">
          <Tabs defaultValue="custom">
            <Tabs.List>
              <Tabs.Trigger value="custom" aria-label="Custom Assets">
                Custom
              </Tabs.Trigger>
              <Tabs.Trigger value="listed" aria-label="Listed Assets">
                Listed
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="custom">
              <AssetList
                assets={state.assetsCustom}
                showActions
                onRemove={(assetId: string) =>
                  handlers.removeAsset({ assetId })
                }
                onEdit={(assetId: string) => handlers.goToEdit(assetId)}
                emptyProps={{
                  text: 'No custom assets',
                  supportText: 'Start by adding a new custom asset',
                }}
              />
            </Tabs.Content>
            <Tabs.Content value="listed">
              <AssetList assets={state.assetsListed} />
            </Tabs.Content>
          </Tabs>
        </AnimatePresence>
      </Layout.Content>
      <Layout.BottomBar>
        <Button
          aria-label="Add Asset"
          onPress={handlers.goToAdd}
          leftIcon={Icon.is('Plus')}
          variant="ghost"
        >
          Add Asset
        </Button>
      </Layout.BottomBar>
    </Layout>
  );
}

const styles = {
  content: cssObj({
    p: '$0',
    '.fuel_tabs': {
      backgroundColor: 'transparent',
    },
    '.fuel_tabs--content': {
      p: '$4',
    },
  }),
};
