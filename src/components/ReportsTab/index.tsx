import { LinkButton } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { Title } from '@/components/Title';
import { Report } from '@/domains/finance/withdrawals';
import { ReportSection } from '@/components/ReportSection';

interface ReportsTabsProps {
  isReportEnable?: boolean,
  reports?: Report[],
}

export const ReportsTab = (props: ReportsTabsProps) => {
  const {
    isReportEnable = false,
    reports,
  } = props;

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Title>Reports</Title>

        <LinkButton
          disabled
          color="secondary"
        >
          Add Report
        </LinkButton>
      </Flex>

      <Spacer size="s" />

      {(isReportEnable) ? (
        <ReportSection reports={reports} />
      ) : (
        <span>Coming soon...</span>
      )}
    </>
  );
};
