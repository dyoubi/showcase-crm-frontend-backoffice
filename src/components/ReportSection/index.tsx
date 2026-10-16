import { routes } from '@/libs/router/constants';

import { Report } from '@/domains/finance/withdrawals';

import { IconDocument } from '@/shared/Icons';
import { Link } from '@/shared/Link';

import { replaceUrlParameters } from '@/utils';

import * as S from './styles';

interface ReportSectionProps {
  reports?: Report[]
  fullHeight?: boolean,
}

export const ReportSection = (props: ReportSectionProps) => {
  const {
    fullHeight = false,
    reports,
  } = props;

  const parseReportType = (reportType: string) => reportType.split('-').join(' ');
  const parseContent = (content: string) => (content?.length > 100) ? `${content.slice(0, 100)}...` : content;

  if (!reports?.length) {
    return <span>No reports available.</span>;
  }

  return (
    <S.StyledRoot fullHeight={fullHeight}>
      {reports.map(report => (
        <S.StyledContainer key={report.id}>
          <Link href={replaceUrlParameters(routes.REPORT, { reportId: report.id })}>
              <IconDocument size={30} />

              <div>
                <h3>{parseReportType(report.reportType)}</h3>
                <p>{parseContent(report.data.content)}...</p>
                <span>{report.data.createdAt}</span>
              </div>
          </Link>
        </S.StyledContainer>
      ))}
    </S.StyledRoot>
  );
};
